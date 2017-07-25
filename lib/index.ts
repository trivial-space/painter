import * as consts from './contants'
import * as plane from './utils/geometry/plane'
import * as stackgl from './utils/stackgl'
import * as context from './utils/context'
import * as aLib from './asset-lib'
import * as Painter from './painter'
export * from './painter-types'


export const utils = {
  geometry: {
    plane
  },
  stackgl,
	context
}

export const lib = aLib

export const constants = consts

export const painter = Painter

export default painter
