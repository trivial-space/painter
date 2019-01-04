import { Painter } from '../lib/painter'

export const canvas = document.getElementById('canvas') as HTMLCanvasElement

export const painter = new Painter(canvas)
