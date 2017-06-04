import { GL } from './renderer-types'

export class RenderObject {

	gl: GL

	constructor(gl: GL | null) {
		if (gl == null) {
			throw TypeError('gl must be a valid WebGL context')
		}

		this.gl = gl
	}
}
