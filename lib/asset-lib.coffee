consts = require './constants'


module.exports =


  geometries:

    _renderQuad:
      attribs:
        "position":
          buffer: new Float32Array [
            -1, 1,
            -1, -1,
            1, 1,
            1, -1,
          ]
          storeType: "STATIC"
        "uv":
          buffer: new Float32Array [
            0, 1,
            0, 0,
            1, 1,
            1, 0
          ]
          storeType: "STATIC"
      drawType: "TRIANGLE_STRIP"
      itemCount: 4


  shaders:

    _renderResult:
      vert:
        """
          attribute vec2 position;
          attribute vec2 uv;
          varying vec2 vUv;
          void main() {
              vUv = uv;
              gl_Position = vec4(position, 0.0, 1.0);
          }
        """
      frag:
        """
          uniform sampler2D source;
          varying vec2 vUv;
          void main() {
              gl_FragColor = texture2D(source, vUv);
          }
        """
      attribs:
        "position": "f 2"
        "uv": "f 2"
      uniforms:
        "source": "t"


  objects:

    _resultObject:
      shader: '_renderResult'
      geometry: '_renderQuad'
      uniforms:
        'source': consts.SOURCE_LAYER
