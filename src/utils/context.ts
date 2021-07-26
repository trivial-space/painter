import { GL } from '../painter-types'

export function makeClear(gl: GL, ...clearArray: string[]): number {
	return clearArray.reduce(
		(res, item) => res | (gl as any)[item.toUpperCase() + '_BUFFER_BIT'],
		0,
	)
}

export function setBlendFunc(gl: GL, blendOpts: [string, string]) {
	gl.blendFunc.apply(
		gl,
		blendOpts.map(opt => (gl as any)[opt.toUpperCase()]) as [number, number],
	)
}

/**
 * @param {HTMLCanvasElement} canvas The canvas to resize.
 * @param {number} [multiplier] optional `window.devicePixelRatio`.
 * @return {boolean} true if the canvas was resized.
 */
export function resizeCanvas(
	canvas: HTMLCanvasElement | OffscreenCanvas,
	multiplier = 1,
) {
	let width = canvas.width
	let height = canvas.height

	if ('clientWidth' in canvas) {
		const rect = canvas.getBoundingClientRect()
		width = (rect.width * multiplier) | 0
		height = (rect.height * multiplier) | 0
	}

	if (canvas.width !== width || canvas.height !== height) {
		canvas.width = width
		canvas.height = height
		return true
	}

	return false
}
