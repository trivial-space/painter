# Data representation of the scene

definition =

  settings:
    enable: ["DEPTH_TEST", "CULL_FACE"] # default DEPTH_TEST
    clearBuffers: ["COLOR", "DEPTH"]
    clearColor: [ 0.0, 0.0, 0.0, 1.0 ]
    blend: ["SRC_ALPHA", "ONE_MINUS_SRC_ALPHA"]
    minFilter: 'LINEAR'
    wrap: 'CLAMP_TO_EDGE'
    width: 1000
    height: 800


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
        "source": "t" # don't specify in object to get the previous pipeline result


  layers:
    "object-layer":
      objects: ["mycube"]
    "full-layer":
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
      asset: myImage # or video or canvas...
    "effect-layer":
      shader: "effectShader"
      uniforms:
        "uniform1":
          124
        "uniform-layer":
          "canvas-layer1"


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
