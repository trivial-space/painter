import * as renderer from '../lib/renderer'


let canvas = document.getElementById('canvas') as HTMLCanvasElement

export let ctx = renderer.create(canvas)
