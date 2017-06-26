import * as consts from './contants'
import * as plane from './utils/geometry/plane'
import * as stackgl from './utils/stackgl'
import * as aLib from './asset-lib'
import * as Painter from './painter'
export * from './render-types'


export const utils = {
  geometry: {
    plane
  },
  stackgl
}

export const lib = aLib

export const constants = consts

export const painter = Painter

export default painter
