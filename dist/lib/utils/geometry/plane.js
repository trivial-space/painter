export function plane(width, height, widthSegments, heightSegments) {
    var widthHalf = width / 2;
    var heightHalf = height / 2;
    var gridX = widthSegments || 1;
    var gridY = heightSegments || 1;
    var gridX1 = gridX + 1;
    var gridY1 = gridY + 1;
    var segmentWidth = width / gridX;
    var segmentHeight = height / gridY;
    var vertices = new Float32Array(gridX1 * gridY1 * 3);
    var normals = new Float32Array(gridX1 * gridY1 * 3);
    var uvs = new Float32Array(gridX1 * gridY1 * 2);
    var iy, ix;
    var offset = 0;
    var offset2 = 0;
    for (iy = 0; iy < gridY1; iy++) {
        var y = iy * segmentHeight - heightHalf;
        for (ix = 0; ix < gridX1; ix++) {
            var x = ix * segmentWidth - widthHalf;
            vertices[offset] = x;
            vertices[offset + 1] = -y;
            normals[offset + 2] = 1;
            uvs[offset2] = ix / gridX;
            uvs[offset2 + 1] = 1 - (iy / gridY);
            offset += 3;
            offset2 += 2;
        }
    }
    offset = 0;
    var indices = new ((vertices.length / 3) > 65535 ? Uint32Array : Uint16Array)(gridX * gridY * 6);
    for (iy = 0; iy < gridY; iy++) {
        for (ix = 0; ix < gridX; ix++) {
            var a = ix + gridX1 * iy;
            var b = ix + gridX1 * (iy + 1);
            var c = (ix + 1) + gridX1 * (iy + 1);
            var d = (ix + 1) + gridX1 * iy;
            indices[offset] = a;
            indices[offset + 1] = b;
            indices[offset + 2] = d;
            indices[offset + 3] = b;
            indices[offset + 4] = c;
            indices[offset + 5] = d;
            offset += 6;
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
    };
}
//# sourceMappingURL=plane.js.map