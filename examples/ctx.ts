import { getContext } from '../lib/utils/context'


export const canvas = document.getElementById('canvas') as HTMLCanvasElement

export const gl = getContext(canvas)
