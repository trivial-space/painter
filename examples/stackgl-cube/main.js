import 'systemjs-hot-reloader/default-listener.js'
import {renderer, renderUtils} from '../../dist/tvs-renderer.js'
import {ctx} from '../ctx.js'
import {mat4} from 'gl-matrix'
import createCube from 'primitive-cube'

const cubeStackgl = createCube(1)
console.log(cubeStackgl)


let cubeMat = mat4.fromTranslation(mat4.create(), [0, 0, -3]),
    rotationX = 0.01,
    rotationZ = 0.009101,
    projection = mat4.perspective(mat4.create(), 45, 1, 0.01, 10)

const scene = {
  geometries: {
    cubeGeometry: renderUtils.stackgl.fromGLStackGeometry(cubeStackgl)
  },

  shaders: {
    cubeMaterial: {
      vert:
        `
          attribute vec3 position;
          attribute vec3 normal;
          uniform mat4 camera;
          uniform mat4 transform;

          varying vec3 vNormal;

          void main() {
              vNormal = normal;
              gl_Position = camera * transform * vec4(position, 1.0);
          }
        `,
      frag:
        `
          varying vec3 vNormal;
          void main() {
              gl_FragColor = vec4(abs(vNormal), 1.0);
          }
        `,
      attribs: {
        position: "f 3",
        normal: "f 3"
      },
      uniforms: {
        camera: "m 4",
        transform: "m 4"
      }
    }
  },

  objects: {
    cube: {
      shader: "cubeMaterial",
      geometry: "cubeGeometry",
      uniforms: {
        camera: projection,
        transform: cubeMat
      }
    },
  },

  layers: {
    layer: {
      objects: ["cube"],
      clearColor: [1.0, 0.5, 0.8, 1.0]
    }
  }
}

console.log(scene)

renderer.init(ctx, scene)

function animate () {
  mat4.rotateY(cubeMat, cubeMat, rotationX)
  mat4.rotateZ(cubeMat, cubeMat, rotationZ)
  mat4.rotateX(cubeMat, cubeMat, 1.78 * rotationZ)
  renderer.renderLayers(ctx, ['layer'])
  requestAnimationFrame(animate)
}

animate()
