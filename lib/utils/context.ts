import { GL } from '../painter-types'


export function getContext (canvas: HTMLCanvasElement) {
	const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
	if (gl == null) {
		throw Error('Webgl context cannot be initialized')
	}
	return gl
}


export function makeClear (gl: GL, ...clearArray: string[]): number {
	return clearArray.reduce(
		(res, item) => res | (gl as any)[item.toUpperCase() + '_BUFFER_BIT'], 0
	)
}


export function setBlendFunc (gl: GL, blendOpts: string[]) {
	gl.blendFunc.apply(gl, blendOpts.map(
		opt => (gl as any)[opt.toUpperCase()]
	))
}


/**
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] optional `window.devicePixelRatio`.
 * @return {boolean} true if the canvas was resized.
 */
export function resizeCanvas (canvas: HTMLCanvasElement, multiplier = 1) {

	const width = (canvas.clientWidth * multiplier) | 0
	const height = (canvas.clientHeight * multiplier) | 0

	if (canvas.width !== width
		|| canvas.height !== height) {
		canvas.width = width
		canvas.height = height
		return true
	}

	return false
}
