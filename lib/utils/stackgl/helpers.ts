import * as constants from '../../contants.ts'
import {flatten} from 'lodash.flatten'

export const STACK_GL_GEOMETRY_PROP_POSITION = "positions"
export const STACK_GL_GEOMETRY_PROP_NORMAL = "normals"
export const STACK_GL_GEOMETRY_PROP_UV = "normals"


export function fromGLStackGeometry(stackglGeometry: any) {

  for (let prop in stackglGeometry) {
    const arr = stackglGeometry[prop]
    if (prop === STACK_GL_GEOMETRY_PROP_POSITION) {

    }
  }
}
