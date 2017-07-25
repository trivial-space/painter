import { create } from '../lib/painter'
import { Painter } from '../lib/painter-types'
import { getContext } from '../lib/utils/context'


export const canvas = document.getElementById('canvas') as HTMLCanvasElement

export const gl = getContext(canvas)

export const painter: Painter = create(gl)
