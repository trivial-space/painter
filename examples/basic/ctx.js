import * as renderer from '../../dist/tvs-renderer'


let canvas = document.getElementById('canvas')

export let ctx = renderer.create(canvas)
