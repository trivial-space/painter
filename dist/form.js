import { getGLTypeForTypedArray } from './render-utils';
let formCounter = 1;
export class Form {
    constructor(_painter, id = 'Form' + formCounter++) {
        this._painter = _painter;
        this.id = id;
    }
    update(data) {
        const gl = this._painter.gl;
        if (data.drawType) {
            this._drawType = gl[data.drawType];
        }
        if (data.itemCount) {
            this._itemCount = data.itemCount;
        }
        this._attribs = this._attribs || {};
        for (const id in data.attribs) {
            const attribData = data.attribs[id];
            if (this._attribs[id] == null) {
                this._attribs[id] = {
                    buffer: gl.createBuffer(),
                };
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this._attribs[id].buffer);
            gl.bufferData(gl.ARRAY_BUFFER, attribData.buffer, gl[(attribData.storeType || 'STATIC') + '_DRAW']);
        }
        if (data.elements) {
            const buffer = data.elements.buffer;
            if (this._elements == null) {
                this._elements = {
                    buffer: gl.createBuffer(),
                    glType: null,
                };
            }
            this._elements.glType = getGLTypeForTypedArray(buffer);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._elements.buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, buffer, gl[(data.elements.storeType || 'STATIC') + '_DRAW']);
        }
        return this;
    }
    destroy() {
        const gl = this._painter.gl;
        for (const id in this._attribs) {
            gl.deleteBuffer(this._attribs[id].buffer);
        }
        this._attribs = {};
        if (this._elements) {
            gl.deleteBuffer(this._elements.buffer);
            this._elements = undefined;
        }
    }
}
//# sourceMappingURL=form.js.map