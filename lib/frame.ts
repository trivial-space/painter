import { equalArray } from 'tvs-libs/dist/lib/utils/predicates'
import { times } from 'tvs-libs/dist/lib/utils/sequence'
import { defaultTextureSettings } from './asset-lib'
import { DrawingLayer } from './layer'
import { Painter } from './painter'
import { FrameData, GL, RenderTarget } from './painter-types'
import { destroyRenderTarget, updateRenderTarget } from './render-utils'

let frameCount = 1

export class Frame {
	data: FrameData = {
		layers: []
	}
	targets?: RenderTarget[] = []

	constructor(private gl: GL, public id = 'Frame' + frameCount++) {}

	texture(i = 0) {
		if (process.env.NODE_ENV !== 'production' && Painter.debug) {
			if (this.targets) {
				console.log(`PAINTER: Using buffer texture ${this.targets[0].id}`)
			}
		}
		return (this.targets && this.targets[0].textures[i]) || null
	}

	update(data: FrameData) {
		const layers = data.layers || this.data.layers
		const selfReferencing = data.selfReferencing || this.data.selfReferencing
		const drawingLayerCount = layers!.filter(l => l instanceof DrawingLayer)
			.length
		const targetCount =
			selfReferencing || drawingLayerCount > 1 ? 2 : drawingLayerCount

		if (
			targetCount !== this.data._targetCount ||
			!equalArray(this.data.bufferStructure, data.bufferStructure)
		) {
			this.destroyTargets()
		}

		if (!this.targets && targetCount) {
			this.targets = times<RenderTarget>(
				i => ({
					id: this.id + '_target' + (i + 1),
					width: data.width || this.gl.canvas.width,
					height: data.height || this.gl.canvas.height,
					frameBuffer: null,
					textures: [],
					depthBuffer: null,
					bufferStructure: data.bufferStructure || ['UNSIGNED_BYTE']
				}),
				targetCount
			) as [RenderTarget, RenderTarget]

			if (!(data.wrap || data.wrapS || data.wrapT)) {
				data.wrap = defaultTextureSettings.wrap
			}
			if (!data.minFilter) {
				data.minFilter = defaultTextureSettings.minFilter
			}
			if (!data.magFilter) {
				data.magFilter = defaultTextureSettings.magFilter
			}

			this.targets.forEach(t => updateRenderTarget(this.gl, t, data, this.data))
		} else if (
			this.targets &&
			data.width &&
			data.height &&
			(data.width !== this.data.width || data.height !== this.data.height)
		) {
			this.targets.forEach(t => {
				t.width = data.width as number
				t.height = data.height as number
				updateRenderTarget(this.gl, t, data, this.data)
			})
		}

		Object.assign(this.data, data)

		return this
	}

	destroyTargets() {
		if (this.targets) {
			this.targets.forEach(t => destroyRenderTarget(this.gl, t))
			this.targets = undefined
		}
	}

	destroy() {
		this.destroyTargets()
	}
}
