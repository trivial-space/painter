import { Painter } from '../src/painter'

export const canvas = document.getElementById('canvas') as HTMLCanvasElement

export const painter = new Painter(canvas, { antialias: true })
