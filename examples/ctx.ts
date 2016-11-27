import * as renderer from '../lib/renderer'
import {Context} from '../lib/renderer-types'


let canvas = document.getElementById('canvas') as HTMLCanvasElement

export let ctx: Context = renderer.create(canvas)
