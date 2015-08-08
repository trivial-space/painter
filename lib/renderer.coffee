consts = require './constants'
lib = require './asset-lib'


create = (canvas) ->
  canvas ?= document.createElement 'canvas'

  gl = canvas.getContext('webgl') or canvas.getContext('experimental-webgl')

  unless gl
    throw Error 'WebGL-Context could not be initialized!'

  ctx =
    settings: {}
    shaders: {}
    geometries: {}
    layers: {}
    objects: {}
    source: {}
    target: {}
    gl: gl

  updateGeometry ctx, '_renderQuad', lib.geometries._renderQuad
  updateShader ctx, '_renderResult', lib.shaders._renderResult
  updateObject ctx, '_result', lib.objects._resultObject


init = (ctx, data) ->
  initSettings ctx, data.settings
  initShaders ctx, data.shaders
  initGeometries ctx, data.geometries
  initLayers ctx, data.layers
  initObjects ctx, data.objects
  updateSize ctx


initShaders = (ctx, data) ->
  if data
    for k, v of data
      updateShader ctx, k, v
  ctx


initLayers = (ctx, data) ->
  if data
    for k, v of data
      updateLayer ctx, k, v
  ctx


initGeometries = (ctx, data) ->
  if data
    for k, v of data
      updateGeometry ctx, k, v
  ctx


initObjects = (ctx, data) ->
  if data
    for k, v of data
      updateObject ctx, k, v
  ctx


updateObject = (ctx, id, object) ->
  ctx.objects[id] = object
  ctx


initSettings = (ctx, data) ->
  data or= {}
  ctx.settings.clearColor = data.clearColor or [ 0.0, 0.0, 0.0, 1.0 ]
  ctx.settings.minFilter = data.minFilter or 'LINEAR'
  ctx.settings.wrap = data.wrap or 'CLAMP_TO_EDGE'
  ctx.settings.clearBits = makeClear ctx.gl, data.clearBuffers or [ 'DEPTH', 'COLOR' ]
  ctx.settings.enable = data.enable or ['DEPTH_TEST']
  for param in ctx.settings.enable
    ctx.gl.enable ctx.gl[param]
  ctx


updateShader = (ctx, name, data) ->
  shader = ctx.shaders[name] ?= {}
  newProgram = not shader.program?
  gl = ctx.gl
  fragSource = 'precision mediump float;\n' + data.frag

  shader.program = gl.createProgram() if newProgram
  shader.vert ?= gl.createShader gl.VERTEX_SHADER
  shader.frag ?= gl.createShader gl.FRAGMENT_SHADER

  gl.shaderSource shader.vert, data.vert
  gl.shaderSource shader.frag, fragSource
  gl.compileShader shader.vert
  gl.compileShader shader.frag

  unless gl.getShaderParameter shader.vert, gl.COMPILE_STATUS
    console.error 'Error Compiling Vertex Shader!\n', gl.getShaderInfoLog(shader.vert), data.vert
  unless gl.getShaderParameter shader.frag, gl.COMPILE_STATUS
    console.error 'Error Compiling Fragment Shader!\n', gl.getShaderInfoLog(shader.frag), data.frag

  if newProgram
    gl.attachShader shader.program, shader.vert
    gl.attachShader shader.program, shader.frag

  gl.linkProgram shader.program

  attribs = shader.attribs = {}
  for name, type of data.attribs
    attribs[name] =
      index: gl.getAttribLocation shader.program, name
      type: gl[consts.attribType[type]]
      itemSize: consts.attribItemSize[type]

  uniforms = shader.uniforms = {}
  for name, type of data.uniforms
    uniforms[name] =
      index: gl.getUniformLocation shader.program, name
      type: type

  ctx


updateGeometry = (ctx, name, data) ->
  gl = ctx.gl

  geometry = ctx.geometries[name] ?= {}
  geometry.drawType = gl[data.drawType]
  geometry.itemCount = data.itemCount
  attribs = geometry.attribs ?= {}

  for name, attribData of data.attribs
    attribs[name] ?= gl.createBuffer()
    gl.bindBuffer gl.ARRAY_BUFFER, attribs[name]
    gl.bufferData gl.ARRAY_BUFFER,
                  getBufferData(attribData),
                  gl[(attribData.storeType or 'STATIC') + '_DRAW']

  if data.elements
    geometry.elements ?= {}
    geometry.elements.buffer ?= gl.createBuffer()

    buffer = getBufferData data.elements
    geometry.elements.glType = typedArrayToGLType buffer, gl

    gl.bindBuffer gl.ELEMENT_ARRAY_BUFFER, geometry.elements.buffer
    gl.bufferData gl.ELEMENT_ARRAY_BUFFER, buffer, gl[(data.elements.storeType or 'STATIC') + '_DRAW']

  else if geometry.elements
    delete geometry.elements

  ctx


updateLayer = (ctx, name, data) ->
  layer = ctx.layers[name] ?= {}
  layer.type = data.type
  layer.noClear = data.noClear
  layer.clearColor = data.clearColor or ctx.settings.clearColor

  if data.buffered
    layer.width = data.width or ctx.settings.width
    layer.height = data.height or ctx.settings.height
    updateRenderTarget ctx.gl, layer, data

  switch data.type
    when consts.LayerType.STATIC
      updateStaticLayer layer, data
    when consts.LayerType.RENDER
      layer.objects = data.objects
    when consts.LayerType.EFFECT
      layer.object = data
      layer.object.geometry = '_renderQuad'

  ctx


updatStaticLayer = (ctx, layer, data) ->
  gl = ctx.gl
  texture = layer.texture ?= gl.createTexture()

  gl.bindTexture gl.TEXTURE_2D, texture

  setTextureParams ctx.gl, data
  gl.texImage2D gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.asset
  gl.generateMipmap gl.TEXTURE_2D

  gl.bindTexture gl.TEXTURE_2D, null
  return


updateSize = (ctx) ->
  gl = ctx.gl
  ctx.settings.width = gl.canvas.clientWidth
  ctx.settings.height = gl.canvas.clientHeight
  if gl.canvas.width isnt ctx.settings.width or gl.canvas.height isnt ctx.settings.height
    gl.canvas.height = ctx.settings.height
    gl.canvas.width = ctx.settings.width
  updateRenderTarget ctx.gl, ctx.source, ctx.settings
  updateRenderTarget ctx.gl, ctx.target, ctx.settings
  ctx


renderLayers = (ctx, layerIds) ->
  gl = ctx.gl
  last = layerIds.length - 1

  for layerId, i in layerIds
    layer = ctx.layers[layerId]
    directRender = i is last
    renderToTarget = not(directRender or layer.frameBuffer?)

    # set rendertarget

    if directRender
      gl.bindFramebuffer gl.FRAMEBUFFER, null
      gl.viewport 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight

    else if renderToTarget
      gl.bindFramebuffer gl.FRAMEBUFFER, ctx.target.frameBuffer
      gl.viewport 0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight

    # render to layers own frameBuffer
    else
      gl.bindFramebuffer gl.FRAMEBUFFER, layer.frameBuffer
      gl.viewport 0, 0, layer.width, layer.height

    # render

    unless layer.noClear
      gl.clearColor.apply gl, layer.clearColor or ctx.settings.clearColor
      gl.clear ctx.settings.clearBits

    if layer.type == consts.LayerType.RENDER
      for id in layer.objects
        renderObject ctx, ctx.objects[id]

    else if layer.type == consts.LayerType.EFFECT
      renderObject ctx, layer.object

    # swap own renderTargets if necessary
    if renderToTarget
      tmp = ctx.source
      ctx.source = ctx.target
      ctx.target = tmp

  return


renderObject = (ctx, object) ->
  gl = ctx.gl
  textureCount = 0
  shader = ctx.shaders[object.shader]
  geometry = ctx.geometries[object.geometry]

  gl.useProgram shader.program

  for name, attrib of shader.attribs
    buffIndex = geometry.attribs[name]
    gl.bindBuffer gl.ARRAY_BUFFER, buffIndex
    gl.enableVertexAttribArray attrib.index
    gl.vertexAttribPointer attrib.index, attrib.itemSize, attrib.type, false, 0, 0

  for name, uniform of shader.uniforms
    index = uniform.index
    value = object.uniforms[name]

    switch uniform.type
      when 't'
        texture =
          if value is consts.SOURCE_LAYER
            ctx.source.texture
          else
            ctx.layers[value].texture
        gl.activeTexture gl['TEXTURE' + textureCount]
        gl.bindTexture gl.TEXTURE_2D, texture
        gl.uniform1i index, textureCount
        textureCount++
      when 'f 1'
        gl.uniform1f index, value
      when 'f 2'
        gl.uniform2fv index, value
      when 'f 3'
        gl.uniform3fv index, value
      when 'f 4'
        gl.uniform4fv index, value
      when 'm 2'
        gl.uniformMatrix2fv index, false, value
      when 'm 3'
        gl.uniformMatrix3fv index, false, value
      when 'm 4'
        gl.uniformMatrix4fv index, false, value
      when 'i 1'
        gl.uniform1i index, value
      when 'i 2'
        gl.uniform2iv index, value
      when 'i 3'
        gl.uniform3iv index, value
      when 'i 4'
        gl.uniform4iv index, value
      else
        console.error 'Uniform type ' + uniform.type + ' unknown. uniform ' + name + ' not set!'

  if geometry.elements
    gl.bindBuffer gl.ELEMENT_ARRAY_BUFFER, geometry.elements.buffer
    gl.drawElements geometry.drawType, geometry.itemCount, geometry.elements.glType, 0
  else
    gl.drawArrays geometry.drawType, 0, geometry.itemCount

  return


# ===== helper function =====

makeClear = (gl, clearArray) ->
  f = (res, item) -> res | gl[item + '_BUFFER_BIT']
  clearArray.reduce f, 0


setTextureParams = (gl, data) ->
  gl.pixelStorei gl.UNPACK_FLIP_Y_WEBGL, !!data.flipY
  if data.wrap
    data.wrapS = data.wrapT = data.wrap
  if data.wrapS
    gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[data.wrapS]
  if data.wrapT
    gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[data.wrapT]
  if data.magFilter
    gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[data.magFilter]
  if data.minFilter
    gl.texParameteri gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[data.minFilter]
  return


updateRenderTarget = (gl, target, data) ->

  target.frameBuffer ?= gl.createFramebuffer()
  target.texture ?= target.texture or gl.createTexture()
  target.depthBuffer ?= gl.createRenderbuffer()

  gl.bindTexture gl.TEXTURE_2D, target.texture

  gl.texImage2D gl.TEXTURE_2D, 0, gl.RGBA, data.width, data.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null
  setTextureParams gl, data

  gl.bindRenderbuffer gl.RENDERBUFFER, target.depthBuffer
  gl.renderbufferStorage gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, data.width, data.height

  gl.bindFramebuffer gl.FRAMEBUFFER, target.frameBuffer
  gl.framebufferTexture2D gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target.texture, 0
  gl.framebufferRenderbuffer gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, target.depthBuffer

  err = gl.checkFramebufferStatus gl.FRAMEBUFFER
  unless err is gl.FRAMEBUFFER_COMPLETE
    console.error 'framebuffer error', err, data

  gl.bindFramebuffer gl.FRAMEBUFFER, null
  gl.bindTexture gl.TEXTURE_2D, null
  gl.bindRenderbuffer gl.RENDERBUFFER, null

  return


getBufferData = (data) ->
  if data.buffer
    data.buffer
  else
    new window[data.type](data.array)


typedArrayToGLType = (array, gl) ->
  if array instanceof Uint8Array
    return gl.UNSIGNED_BYTE

  if array instanceof Uint16Array
    return gl.UNSIGNED_SHORT

  if array instanceof Uint32Array
    return gl.UNSIGNED_INT

  throw new TypeError('invalid array type')



module.exports = {
  create
  init
  initSettings
  updateObject
  updateGeometry
  updateShader
  updateLayer
  updateSize
  renderLayers
}
