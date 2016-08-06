import * as constants from '../../contants.ts'

export const STACK_GL_GEOMETRY_PROP_POSITION = "positions"
export const STACK_GL_GEOMETRY_PROP_NORMAL = "normals"
export const STACK_GL_GEOMETRY_PROP_UV = "normals"
export const STACK_GL_GEOMETRY_PROP_ELEMENTS = "cells"


function _flatten( array: number[][] ): number[] {
	let results: number[] = []

	for( let i=0; i < array.length; i++ ) {
		var subarray = array[i]
		for( let j=0; j < subarray.length; j++ ) {
			results.push(subarray[j])
		}
	}
	return results
}


export function convertStackGLGeometry(
  stackglGeometry: {[id: string]: number[][]}
): GeometryData {

  let geometry = {
    drawType: "TRIANGLES" as GeometryDrawType,
    attribs: {},
    elements: {buffer: null as TypedArray},
    itemCount: 0
  }

  for (let prop in stackglGeometry) {
    const arr = stackglGeometry[prop]
    if (prop === STACK_GL_GEOMETRY_PROP_ELEMENTS) {
      geometry.elements.buffer = new ( arr.length > 65535 ? Uint32Array : Uint16Array )(_flatten(arr))
      geometry.itemCount = geometry.elements.buffer.length
    } else if (prop === STACK_GL_GEOMETRY_PROP_POSITION) {
      geometry.attribs[constants.GEOMETRY_PROP_POSITION] = {
        buffer: new Float32Array(_flatten(arr))
      }
    } else if (prop === STACK_GL_GEOMETRY_PROP_NORMAL) {
      geometry.attribs[constants.GEOMETRY_PROP_NORMAL] = {
        buffer: new Float32Array(_flatten(arr))
      }
    } else if (prop === STACK_GL_GEOMETRY_PROP_UV) {
      geometry.attribs[constants.GEOMETRY_PROP_UV] = {
        buffer: new Float32Array(_flatten(arr))
      }
    } else {
      geometry.attribs[prop] = {buffer: new Float32Array(_flatten(arr))}
    }
  }

  return geometry
}
