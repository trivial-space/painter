import { getGLTypeForTypedArray } from './render-utils';
export function create(gl) {
    var form = {};
    form.update = function (data) {
        if (data.drawType) {
            form.drawType = gl[data.drawType];
        }
        if (data.itemCount) {
            form.itemCount = data.itemCount;
        }
        var attribs = form.attribs || {};
        for (var id in data.attribs) {
            var attribData = data.attribs[id];
            if (attribs[id] == null) {
                attribs[id] = {
                    buffer: gl.createBuffer()
                };
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, attribs[id].buffer);
            gl.bufferData(gl.ARRAY_BUFFER, attribData.buffer, gl[(attribData.storeType || 'STATIC') + '_DRAW']);
        }
        form.attribs = attribs;
        if (data.elements) {
            var buffer = data.elements.buffer;
            if (form.elements == null) {
                form.elements = {
                    buffer: gl.createBuffer(),
                    glType: null
                };
            }
            form.elements.glType = getGLTypeForTypedArray(buffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, form.elements.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, buffer, gl[(data.elements.storeType || 'STATIC') + '_DRAW']);
        }
        return form;
    };
    form.delete = function () {
        for (var id in form.attribs) {
            gl.deleteBuffer(form.attribs[id].buffer);
        }
        if (form.elements) {
            gl.deleteBuffer(form.elements.buffer);
        }
        return form;
    };
    return form;
}
//# sourceMappingURL=form.js.map