# Data representation of the scene

definition =

  settings:
    enable: ["DEPTH_TEST", "CULL_FACE"] # default DEPTH_TEST
    clearBuffers: ["COLOR", "DEPTH"]
    clearColor: [1.0, 1.0, 1.0, 1.0]
    # set width and hight with css and call updateSize
    # after adding the canvas to the dom

  shaders:
    "space-color":
      vert: someCode
      frag: someCode
      attribs:
        "position": "f 3"
        "normal": "f 3"
      uniforms:
        "modelMatrix": "m 4"
        "projectionMatrix": "m 4"
        "texture1": "t"


  layers:
    "object-layer": # type is one of ["render", "static", "data", "effect"]
      type: consts.LayerType.RENDER # do an actual webgl rendering into a texture
      objects: ["mycube"]
    "full-layer":
      type: consts.LayerType.RENDER
      objects: ["mymesh"]
      clearColor: [1.0, 0.5, 0.0, 1.0]
      flipY: true
      wrap: 'CLAMP_TO_EDGE'
      wrapT: 'CLAMP_TO_EDGE'
      wrapS: 'MIRRORED_REPEAT'
      minFilter: 'LINEAR'
      magFilter: 'LINEAR'
      buffered: true # get its own FrameBuffer
      width: 100
      height: 100
      noClear: true
    "texture-layer":
      type: consts.LayerType.STATIC # just make a static texture
      asset: myImage # or video or canvas...
    "effect-layer":
      type: consts.LayerType.EFFECT
      uniforms:
        "uniform1":
          124
        "uniform-layer":
          consts.SOURCE_LAYER
        "uniform-layer":
          "canvas-layer1"
      shader: "effectShader"


  geometries:
    "my-geometry":
      attribs:
        "position":
          buffer: someBuffer
        "normal":
          array: [
            -0.5, 0.5,
            -0.5, -0.5,
            0.5, 0.5,
            0.5, -0.5
          ]
          type: 'Float32Array'
          storeType: "DYNAMIC"
      elements: # optional index array
        buffer: someBuffer
        #or
        array: [1, 2, 3]
        type: 'Uint8Array'
        storeType: 'STATIC' # optional 'STATIC' is default
      drawType: "TRIANGLES"
      itemCount: 123


  objects:
    "mycube":
      uniforms:
        "modelMatrix":
          someValue
        "projectionMatrix":
          someValue
        "texture1":
          "layer1"
      shader: "space-color"
      geometry: "my-geometry"


# Example Render-Context

context =

  gl: glCtx
  canvas: canvas

  source:
    texture: GLTextureIndex
    frameBuffer: GLFrameBufferIndex
    depthBuffer: GLRenderBuffer

  target:
    texture: GLTexture
    frameBuffer: GLFrameBuffer
    depthBuffer: GLRenderBuffer

  settings:
    clearBits: calculatedClearBit


  shaders:
    "space-color":
      program: someGLIndex
      vert: someGLIndex
      frag: someGLIndex
      attribs:
        "positon":
          index: someGLAttrIndex
          type: someGLType # gl.FLOAT, gl.BYTE, ...
          itemSize: 3
        "normal":
          index: someGLAttrIndex
          type: someGLType # gl.FLOAT, gl.BYTE, ...
          itemSize: 3
      uniforms:
        "modelMatrix":
          index: someGLUniformIndex
          type: 'm 3'
        "projectionMatrix":
          index: someGLUniformIndex
          type: 'm 4'


  geometries:
    "my-geometry":
      attribs:
        "position": someGLBuffIndex
        "normal": someGLBuffIndex
      elements:
        buffer: someBuffIdx
        glType: gl.UNSIGNED_SHORT
      drawType: someGLDrawType
      itemCount: 23


  # layers have merged in props from above
  layers:
    "static-layer":
      texture: GLTextureIndex
    "buffered-layer":
      texture: GLTextureIndex
      frameBuffer: GLFrameBufferIndex
      depthBuffer: someBuffIdx

