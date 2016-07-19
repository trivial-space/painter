import * as renderer from '../lib/renderer.ts'


let canvas = document.getElementById('canvas') as HTMLCanvasElement

export let ctx = renderer.create(canvas)
