import '../../renderer-types.ts'

export function plane (
  width: number,
  height: number,
  widthSegments: number,
  heightSegments: number
): GeometryData {

  const widthHalf = width / 2
  const heightHalf = height / 2

  const gridX = widthSegments || 1
  const gridY = heightSegments || 1

  const gridX1 = gridX + 1
  const gridY1 = gridY + 1

  const segmentWidth = width / gridX
  const segmentHeight = height / gridY

  const vertices = new Float32Array( gridX1 * gridY1 * 3 )
  const normals = new Float32Array( gridX1 * gridY1 * 3 )
  const uvs = new Float32Array( gridX1 * gridY1 * 2 )

  let iy: number, ix: number
  let offset = 0
  let offset2 = 0

  for ( iy = 0; iy < gridY1; iy ++ ) {

    var y = iy * segmentHeight - heightHalf

    for ( ix = 0; ix < gridX1; ix ++ ) {

      const x = ix * segmentWidth - widthHalf

      vertices[ offset     ] = x
      vertices[ offset + 1 ] = - y

      normals[ offset + 2 ] = 1

      uvs[ offset2     ] = ix / gridX
      uvs[ offset2 + 1 ] = 1 - ( iy / gridY )

      offset += 3
      offset2 += 2

    }

  }

  offset = 0

  const indices = new ( ( vertices.length / 3 ) > 65535 ? Uint32Array : Uint16Array )( gridX * gridY * 6 )

  for ( iy = 0; iy < gridY; iy ++ ) {

    for ( ix = 0; ix < gridX; ix ++ ) {

      const a = ix + gridX1 * iy
      const b = ix + gridX1 * ( iy + 1 )
      const c = ( ix + 1 ) + gridX1 * ( iy + 1 )
      const d = ( ix + 1 ) + gridX1 * iy

      indices[ offset     ] = a
      indices[ offset + 1 ] = b
      indices[ offset + 2 ] = d

      indices[ offset + 3 ] = b
      indices[ offset + 4 ] = c
      indices[ offset + 5 ] = d

      offset += 6

    }

  }

  return {
    attribs: {
      'position': {
        buffer: vertices,
        storeType: 'STATIC'
      },
      'normal': {
        buffer: normals,
        storeType: 'STATIC'
      },
      'uv': {
        buffer: uvs,
        storeType: 'STATIC'
      }
    },
    elements: {
      buffer: indices
    },
    drawType: 'TRIANGLES',
    itemCount: indices.length
  }

}
