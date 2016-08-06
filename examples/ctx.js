import renderer from '../dist/tvs-renderer.js'

let canvas = document.getElementById('canvas')

export let ctx = renderer.create(canvas)
