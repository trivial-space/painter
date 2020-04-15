!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.tvsPainter=e():t.tvsPainter=e()}(window,(function(){return function(t){var e={};function r(i){if(e[i])return e[i].exports;var n=e[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";r.r(e),r.d(e,"Painter",(function(){return ut})),r.d(e,"utils",(function(){return Et})),r.d(e,"lib",(function(){return Tt})),r.d(e,"constants",(function(){return Rt}));var i={};r.r(i),r.d(i,"GEOMETRY_PROP_POSITION",(function(){return f})),r.d(i,"GEOMETRY_PROP_NORMAL",(function(){return o})),r.d(i,"GEOMETRY_PROP_UV",(function(){return _})),r.d(i,"UNIFORM_SOURCE_TEXTURE",(function(){return h})),r.d(i,"VARYING_UV_COORDS",(function(){return l})),r.d(i,"GL_TYPE",(function(){return E})),r.d(i,"TEXTURE_FORMAT",(function(){return T})),r.d(i,"TEXTURE_FORMAT_INTERNAL",(function(){return R})),r.d(i,"TEXTURE_FORMAT_DEFAULTS",(function(){return c}));var n={};r.r(n),r.d(n,"defaultTextureSettings",(function(){return d})),r.d(n,"getDefaultLayerSettings",(function(){return A})),r.d(n,"defaultForms",(function(){return S})),r.d(n,"defaultShaders",(function(){return F}));var s={};r.r(s),r.d(s,"makeClear",(function(){return m})),r.d(s,"setBlendFunc",(function(){return N})),r.d(s,"resizeCanvas",(function(){return p}));var a={};r.r(a),r.d(a,"plane",(function(){return y}));var u={};r.r(u),r.d(u,"STACK_GL_GEOMETRY_PROP_POSITION",(function(){return g})),r.d(u,"STACK_GL_GEOMETRY_PROP_NORMAL",(function(){return U})),r.d(u,"STACK_GL_GEOMETRY_PROP_UV",(function(){return I})),r.d(u,"STACK_GL_GEOMETRY_PROP_ELEMENTS",(function(){return B})),r.d(u,"convertStackGLGeometry",(function(){return O}));const f="position",o="normal",_="uv",h="source",l="coords",E={FLOAT:5126,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,INT:5124,INT_VEC2:35667,INT_VEC3:35668,INT_VEC4:35669,BOOL:35670,BOOL_VEC2:35671,BOOL_VEC3:35672,BOOL_VEC4:35673,FLOAT_MAT2:35674,FLOAT_MAT3:35675,FLOAT_MAT4:35676,SAMPLER_2D:35678,SAMPLER_CUBE:35680,SAMPLER_3D:35679,SAMPLER_2D_SHADOW:35682,FLOAT_MAT2X3:35685,FLOAT_MAT2X4:35686,FLOAT_MAT3X2:35687,FLOAT_MAT3X4:35688,FLOAT_MAT4X2:35689,FLOAT_MAT4X3:35690,SAMPLER_2D_ARRAY:36289,SAMPLER_2D_ARRAY_SHADOW:36292,SAMPLER_CUBE_SHADOW:36293,UNSIGNED_INT:5125,UNSIGNED_INT_VEC2:36294,UNSIGNED_INT_VEC3:36295,UNSIGNED_INT_VEC4:36296,INT_SAMPLER_2D:36298,INT_SAMPLER_3D:36299,INT_SAMPLER_CUBE:36300,INT_SAMPLER_2D_ARRAY:36303,UNSIGNED_INT_SAMPLER_2D:36306,UNSIGNED_INT_SAMPLER_3D:36307,UNSIGNED_INT_SAMPLER_CUBE:36308,UNSIGNED_INT_SAMPLER_2D_ARRAY:36311,TEXTURE_2D:3553,TEXTURE_CUBE_MAP:34067,TEXTURE_3D:32879,TEXTURE_2D_ARRAY:35866,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,UNSIGNED_SHORT_4_4_4_4:32819,UNSIGNED_SHORT_5_5_5_1:32820,UNSIGNED_SHORT_5_6_5:33635,HALF_FLOAT:5131,UNSIGNED_INT_2_10_10_10_REV:33640,UNSIGNED_INT_10F_11F_11F_REV:35899,UNSIGNED_INT_5_9_9_9_REV:35902,FLOAT_32_UNSIGNED_INT_24_8_REV:36269,UNSIGNED_INT_24_8:34042},T={RED:6403,RG:33319,RGB:6407,RGBA:6408,RED_INTEGER:36244,RG_INTEGER:33320,RGB_INTEGER:36248,RGBA_INTEGER:36249,DEPTH_COMPONENT:6402},R={R8:33321,RG8:33323,RGB8:32849,RGBA8:32856,R16F:33325,RG16F:33327,RGB16F:34843,RGBA16F:34842,R32F:33326,RG32F:33328,RGB32F:34837,RGBA32F:34836,R8I:33329,RG8I:33335,RGB8I:36239,RGBA8I:36238,R8UI:33330,RG8UI:33336,RGB8UI:36221,RGBA8UI:36220,R16I:33331,RG16I:33337,RGB16I:36233,RGBA16I:36232,R16UI:33332,RG16UI:33338,RGB16UI:36215,RGBA16UI:36214,R32I:33333,RG32I:33339,RGB32I:36227,RGBA32I:36226,R32UI:33334,RG32UI:33340,RGB32UI:36209,RGBA32UI:36208,RGB10_A2:32857,RGB10_A2UI:36975,SRGB:35904,SRGB8:35905,SRGB8_ALPHA8:35907,R8_SNORM:36756,RG8_SNORM:36757,RGB8_SNORM:36758,RGBA8_SNORM:36759,DEPTH_COMPONENT16:33189,DEPTH_COMPONENT24:33190,DEPTH_COMPONENT32F:36012},c={[E.UNSIGNED_BYTE]:{[T.RED]:R.R8,[T.RG]:R.RG8,[T.RGB]:R.RGB8,[T.RGBA]:R.RGBA8},[E.UNSIGNED_SHORT]:{[T.DEPTH_COMPONENT]:R.DEPTH_COMPONENT16,[T.RED]:R.R16UI,[T.RG]:R.RG16UI,[T.RGB]:R.RGB16UI,[T.RGBA]:R.RGBA16UI},[E.UNSIGNED_INT]:{[T.DEPTH_COMPONENT]:R.DEPTH_COMPONENT24,[T.RED]:R.R32UI,[T.RG]:R.RG32UI,[T.RGB]:R.RGB32UI,[T.RGBA]:R.RGBA32UI},[E.FLOAT]:{[T.RED]:R.R16F,[T.RG]:R.RG16F,[T.RGB]:R.RGB16F,[T.RGBA]:R.RGBA16F,[T.DEPTH_COMPONENT]:R.DEPTH_COMPONENT32F},COMPRESSED_TYPES:{}},d={wrap:"CLAMP_TO_EDGE",minFilter:"LINEAR",magFilter:"NEAREST"};function A(t){return{clearColor:[0,0,0,1],blendFunc:[t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA]}}const S={renderQuad:{attribs:{[f]:{buffer:new Float32Array([-1,1,-1,-1,1,1,1,-1]),storeType:"STATIC"},[_]:{buffer:new Float32Array([0,1,0,0,1,1,1,0]),storeType:"STATIC"}},drawType:"TRIANGLE_STRIP",itemCount:4}},F={basicEffect:{vert:`\nattribute vec2 ${f};\nattribute vec2 ${_};\nvarying vec2 ${l};\nvoid main() {\n\t${l} = ${_};\n\tgl_Position = vec4(${f}, 0.0, 1.0);\n}`,frag:`precision mediump float;\nuniform sampler2D ${h};\nvarying vec2 ${l};\nvoid main() {\n\tgl_FragColor = texture2D(${h}, ${l});\n}`}};function m(t,...e){return e.reduce((e,r)=>e|t[r.toUpperCase()+"_BUFFER_BIT"],0)}function N(t,e){t.blendFunc.apply(t,e.map(e=>t[e.toUpperCase()]))}function p(t,e=1){let r=t.width,i=t.height;return"clientWidth"in t&&"clientHeight"in t&&(r=t.clientWidth*e|0,i=t.clientHeight*e|0),(t.width!==r||t.height!==i)&&(t.width=r,t.height=i,!0)}function y(t,e,r,i){const n=t/2,s=e/2,a=r||1,u=i||1,f=a+1,o=u+1,_=t/a,h=e/u,l=new Float32Array(f*o*3),E=new Float32Array(f*o*3),T=new Float32Array(f*o*2);let R,c,d=0,A=0;for(R=0;R<o;R++){const t=R*h-s;for(c=0;c<f;c++){const e=c*_-n;l[d]=e,l[d+1]=-t,E[d+2]=1,T[A]=c/a,T[A+1]=1-R/u,d+=3,A+=2}}d=0;const S=new(l.length/3>65535?Uint32Array:Uint16Array)(a*u*6);for(R=0;R<u;R++)for(c=0;c<a;c++){const t=c+f*R,e=c+f*(R+1),r=c+1+f*(R+1),i=c+1+f*R;S[d]=t,S[d+1]=e,S[d+2]=i,S[d+3]=e,S[d+4]=r,S[d+5]=i,d+=6}return{attribs:{position:{buffer:l},normal:{buffer:E},uv:{buffer:T}},elements:{buffer:S},drawType:"TRIANGLES",itemCount:S.length}}function b(t,e=[]){for(const r of t){const t=e.length;for(let i=0;i<r.length;i++)e[i+t]=r[i]}return e}const g="positions",U="normals",I="uvs",B="cells";function O(t){const e={drawType:"TRIANGLES",attribs:{},itemCount:0};for(const r in t){const i=t[r];if(r===B){const t=new(i.length>65535?Uint32Array:Uint16Array)(b(i));Object.assign(e,{elements:{buffer:t},itemCount:t.length})}else r===g?e.attribs[f]={buffer:new Float32Array(b(i))}:r===U?e.attribs[o]={buffer:new Float32Array(b(i))}:r===I?e.attribs[_]={buffer:new Float32Array(b(i))}:e.attribs[r]={buffer:new Float32Array(b(i))}}return e}function G(t){return v[t].bindPoint}function M(t,e){return r=>{t.uniform1i(e,r)}}function D(t,e){return r=>{t.uniform1iv(e,r)}}function L(t,e){return r=>{t.uniform2iv(e,r)}}function P(t,e){return r=>{t.uniform3iv(e,r)}}function w(t,e){return r=>{t.uniform4iv(e,r)}}function C(t,e,r,i){const n=G(e);return e=>{t.uniform1i(i,r),t.activeTexture(t.TEXTURE0+r),t.bindTexture(n,e._texture)}}function x(t,e,r,i,n){const s=G(e),a=new Int32Array(n);for(let t=0;t<n;++t)a[t]=r+t;return e=>{t.uniform1iv(i,a);for(const r in e)t.activeTexture(t.TEXTURE0+a[r]),t.bindTexture(s,e[r]._texture)}}const v={[E.FLOAT]:{Type:Float32Array,size:4,setter:function(t,e){return r=>{t.uniform1f(e,r)}},arraySetter:function(t,e){return r=>{t.uniform1fv(e,r)}}},[E.FLOAT_VEC2]:{Type:Float32Array,size:8,setter:function(t,e){return r=>{t.uniform2fv(e,r)}}},[E.FLOAT_VEC3]:{Type:Float32Array,size:12,setter:function(t,e){return r=>{t.uniform3fv(e,r)}}},[E.FLOAT_VEC4]:{Type:Float32Array,size:16,setter:function(t,e){return r=>{t.uniform4fv(e,r)}}},[E.INT]:{Type:Int32Array,size:4,setter:M,arraySetter:D},[E.INT_VEC2]:{Type:Int32Array,size:8,setter:L},[E.INT_VEC3]:{Type:Int32Array,size:12,setter:P},[E.INT_VEC4]:{Type:Int32Array,size:16,setter:w},[E.UNSIGNED_INT]:{Type:Uint32Array,size:4,setter:function(t,e){return r=>{t.uniform1ui(e,r)}},arraySetter:function(t,e){return r=>{t.uniform1uiv(e,r)}}},[E.UNSIGNED_INT_VEC2]:{Type:Uint32Array,size:8,setter:function(t,e){return r=>{t.uniform2uiv(e,r)}}},[E.UNSIGNED_INT_VEC3]:{Type:Uint32Array,size:12,setter:function(t,e){return r=>{t.uniform3uiv(e,r)}}},[E.UNSIGNED_INT_VEC4]:{Type:Uint32Array,size:16,setter:function(t,e){return r=>{t.uniform4uiv(e,r)}}},[E.BOOL]:{Type:Uint32Array,size:4,setter:M,arraySetter:D},[E.BOOL_VEC2]:{Type:Uint32Array,size:8,setter:L},[E.BOOL_VEC3]:{Type:Uint32Array,size:12,setter:P},[E.BOOL_VEC4]:{Type:Uint32Array,size:16,setter:w},[E.FLOAT_MAT2]:{Type:Float32Array,size:16,setter:function(t,e){return r=>{t.uniformMatrix2fv(e,!1,r)}}},[E.FLOAT_MAT3]:{Type:Float32Array,size:36,setter:function(t,e){return r=>{t.uniformMatrix3fv(e,!1,r)}}},[E.FLOAT_MAT4]:{Type:Float32Array,size:64,setter:function(t,e){return r=>{t.uniformMatrix4fv(e,!1,r)}}},[E.FLOAT_MAT2X3]:{Type:Float32Array,size:24,setter:function(t,e){return r=>{t.uniformMatrix2x3fv(e,!1,r)}}},[E.FLOAT_MAT2X4]:{Type:Float32Array,size:32,setter:function(t,e){return r=>{t.uniformMatrix2x4fv(e,!1,r)}}},[E.FLOAT_MAT3X2]:{Type:Float32Array,size:24,setter:function(t,e){return r=>{t.uniformMatrix3x2fv(e,!1,r)}}},[E.FLOAT_MAT3X4]:{Type:Float32Array,size:48,setter:function(t,e){return r=>{t.uniformMatrix3x4fv(e,!1,r)}}},[E.FLOAT_MAT4X2]:{Type:Float32Array,size:32,setter:function(t,e){return r=>{t.uniformMatrix4x2fv(e,!1,r)}}},[E.FLOAT_MAT4X3]:{Type:Float32Array,size:48,setter:function(t,e){return r=>{t.uniformMatrix4x3fv(e,!1,r)}}},[E.SAMPLER_2D]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_2D},[E.SAMPLER_CUBE]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_CUBE_MAP},[E.SAMPLER_3D]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_3D},[E.SAMPLER_2D_SHADOW]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_2D},[E.SAMPLER_2D_ARRAY]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_2D_ARRAY},[E.SAMPLER_2D_ARRAY_SHADOW]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_2D_ARRAY},[E.SAMPLER_CUBE_SHADOW]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_CUBE_MAP},[E.INT_SAMPLER_2D]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_2D},[E.INT_SAMPLER_3D]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_3D},[E.INT_SAMPLER_CUBE]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_CUBE_MAP},[E.INT_SAMPLER_2D_ARRAY]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_2D_ARRAY},[E.UNSIGNED_INT_SAMPLER_2D]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_2D},[E.UNSIGNED_INT_SAMPLER_3D]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_3D},[E.UNSIGNED_INT_SAMPLER_CUBE]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_CUBE_MAP},[E.UNSIGNED_INT_SAMPLER_2D_ARRAY]:{Type:null,size:0,setter:C,arraySetter:x,bindPoint:E.TEXTURE_2D_ARRAY}};function z(t,e,r){return i=>{t.bindBuffer(t.ARRAY_BUFFER,i.buffer),t.enableVertexAttribArray(e),t.vertexAttribPointer(e,r.itemSize,E.FLOAT,i.normalize||!1,i.stride||0,i.offset||0)}}function X(t,e,r){return i=>{t.bindBuffer(t.ARRAY_BUFFER,i.buffer),t.enableVertexAttribArray(e),t.vertexAttribIPointer(e,r.itemSize,E.INT,i.stride||0,i.offset||0)}}function V(t,e,r){const i=r.size,n=r.count;return r=>{t.bindBuffer(t.ARRAY_BUFFER,r.buffer);const s=i,a=s/n,u=v[E.FLOAT].size*s,f=r.normalize||!1,o=r.offset||0,_=u/n;for(let r=0;r<n;++r)t.enableVertexAttribArray(e+r),t.vertexAttribPointer(e+r,a,E.FLOAT,f,u,o+_*r)}}const H={[E.FLOAT]:{size:4,setter:z,itemSize:1},[E.FLOAT_VEC2]:{size:8,setter:z,itemSize:2},[E.FLOAT_VEC3]:{size:12,setter:z,itemSize:3},[E.FLOAT_VEC4]:{size:16,setter:z,itemSize:4},[E.INT]:{size:4,setter:X,itemSize:1},[E.INT_VEC2]:{size:8,setter:X,itemSize:2},[E.INT_VEC3]:{size:12,setter:X,itemSize:3},[E.INT_VEC4]:{size:16,setter:X,itemSize:4},[E.UNSIGNED_INT]:{size:4,setter:X,itemSize:1},[E.UNSIGNED_INT_VEC2]:{size:8,setter:X,itemSize:2},[E.UNSIGNED_INT_VEC3]:{size:12,setter:X,itemSize:3},[E.UNSIGNED_INT_VEC4]:{size:16,setter:X,itemSize:4},[E.BOOL]:{size:4,setter:X,itemSize:1},[E.BOOL_VEC2]:{size:8,setter:X,itemSize:2},[E.BOOL_VEC3]:{size:12,setter:X,itemSize:3},[E.BOOL_VEC4]:{size:16,setter:X,itemSize:4},[E.FLOAT_MAT2]:{size:4,setter:V,count:2},[E.FLOAT_MAT3]:{size:9,setter:V,count:3},[E.FLOAT_MAT4]:{size:16,setter:V,count:4}};E.BYTE,Int8Array,E.UNSIGNED_BYTE,Uint8Array,E.SHORT,Int16Array,E.UNSIGNED_SHORT,Uint16Array,E.INT,Int32Array,E.UNSIGNED_INT,Uint32Array,E.FLOAT,Float32Array,E.UNSIGNED_SHORT_4_4_4_4,Uint16Array,E.UNSIGNED_SHORT_5_5_5_1,Uint16Array,E.UNSIGNED_SHORT_5_6_5,Uint16Array,E.HALF_FLOAT,Uint16Array,E.UNSIGNED_INT_2_10_10_10_REV,Uint32Array,E.UNSIGNED_INT_10F_11F_11F_REV,Uint32Array,E.UNSIGNED_INT_5_9_9_9_REV,Uint32Array,E.FLOAT_32_UNSIGNED_INT_24_8_REV,Uint32Array,E.UNSIGNED_INT_24_8,Uint32Array;function Y(t,e){if(e.enable)for(const r of e.enable)t.enable(r);if(e.disable)for(const r of e.disable)t.disable(r);e.blendFunc&&t.blendFunc.apply(t,e.blendFunc),null!=e.depthFunc&&t.depthFunc(e.depthFunc),null!=e.cullFace&&t.cullFace(e.cullFace),null!=e.frontFace&&t.frontFace(e.frontFace),null!=e.lineWidth&&t.lineWidth(e.lineWidth),e.colorMask&&t.colorMask.apply(t,e.colorMask),null!=e.depthMask&&t.depthMask(e.depthMask),e.clearColor&&t.clearColor.apply(t,e.clearColor),null!=e.clearDepth&&t.clearDepth(e.clearDepth),null!=e.clearBits&&t.clear(e.clearBits)}function k(t,e){if(e.enable)for(const r of e.enable)t.disable(r);if(e.disable)for(const r of e.disable)t.enable(r)}let W=1;class j{constructor(t,e="Form"+W++){this._painter=t,this.id=e}update(t){const e=this._painter.gl;t.drawType&&(this._drawType=e[t.drawType]),t.itemCount&&(this._itemCount=t.itemCount),this._attribs=this._attribs||{};for(const r in t.attribs){const i=t.attribs[r];null==this._attribs[r]&&(this._attribs[r]={buffer:e.createBuffer()}),e.bindBuffer(e.ARRAY_BUFFER,this._attribs[r].buffer),e.bufferData(e.ARRAY_BUFFER,i.buffer,e[(i.storeType||"STATIC")+"_DRAW"])}if(t.elements){const r=t.elements.buffer;null==this._elements&&(this._elements={buffer:e.createBuffer(),glType:null}),this._elements.glType=function(t){if(t instanceof Int8Array)return E.BYTE;if(t instanceof Uint8Array)return E.UNSIGNED_BYTE;if(t instanceof Uint8ClampedArray)return E.UNSIGNED_BYTE;if(t instanceof Int16Array)return E.SHORT;if(t instanceof Uint16Array)return E.UNSIGNED_SHORT;if(t instanceof Int32Array)return E.INT;if(t instanceof Uint32Array)return E.UNSIGNED_INT;if(t instanceof Float32Array)return E.FLOAT;throw new Error("unsupported typed array type")}(r),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this._elements.buffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r,e[(t.elements.storeType||"STATIC")+"_DRAW"])}return this}destroy(){const t=this._painter.gl;for(const e in this._attribs)t.deleteBuffer(this._attribs[e].buffer);this._attribs={},this._elements&&(t.deleteBuffer(this._elements.buffer),this._elements=void 0)}}let $=1;class K{constructor(t,e="Texture"+$++){this._painter=t,this.id=e,this._texture=null,this._data={}}update(t){const e=this._painter.gl;if(null==this._texture&&(this._texture=e.createTexture()),e.bindTexture(e.TEXTURE_2D,this._texture),t.wrap&&t.wrap!==this._data.wrap||t.wrapS&&t.wrapS!==this._data.wrapS||t.wrapT&&t.wrapT!==this._data.wrapT){let r,i;t.wrap?r=i=t.wrap:(i=t.wrapT||d.wrap,r=t.wrapS||d.wrap),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[r]),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[i])}else this._data.wrap||this._data.wrapS||this._data.wrapT||(this._data.wrap=this._data.wrapT=this._data.wrapS=d.wrap,e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[this._data.wrap]),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[this._data.wrap]));return t.magFilter&&t.magFilter!==this._data.magFilter?e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[t.magFilter]):this._data.magFilter||(this._data.magFilter=d.magFilter,e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[this._data.magFilter])),t.minFilter&&t.minFilter!==this._data.minFilter?e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[t.minFilter]):this._data.minFilter||(this._data.minFilter=d.minFilter,e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[this._data.minFilter])),t.asset&&e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t.asset),void 0!==t.data&&e.texImage2D(e.TEXTURE_2D,0,"FLOAT"===t.type&&this._painter.isWebGL2?e.RGBA32F:e.RGBA,t.width,t.height,0,e.RGBA,e[t.type||"UNSIGNED_BYTE"],t.data),null!=t.flipY&&t.flipY!==this._data.flipY&&e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,t.flipY),t.minFilter&&t.minFilter.indexOf("MIPMAP")>0&&e.generateMipmap(e.TEXTURE_2D),e.bindTexture(e.TEXTURE_2D,null),Object.assign(this._data,t),this}destroy(){this._painter.gl.deleteTexture(this._texture),this._data={},this._texture=null}}let Q=1;class q{constructor(t,e="Form"+Q++){this._painter=t,this.id=e,this.width=0,this.height=0,this.antialias=!1,this.frameBuffer=null,this.antiAliasFrameBuffer=null,this.antiAliasRenderBuffer=null,this.textures=[],this.depthBuffer=null,this.bufferStructure=[],this._data={}}update(t){var e;const r=this._painter.gl,i=t.width||this.width,n=t.height||this.height;if(!i||!n)return this;if(i===this.width&&n===this.height){if(!t.bufferStructure)return this;if(t.bufferStructure.length===this.bufferStructure.length&&this.bufferStructure.every((e,r)=>function(t,e){if(t===e)return!0;if(!e)return!1;const r=Object.keys(t);if(!function(t,e){if(t===e)return!0;if(!e||!t)return!1;if(t.length!==e.length)return!1;for(let r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0}(r,Object.keys(e)))return!1;for(const i of r)if(t[i]!==e[i])return!1;return!0}(e,t.bufferStructure[r])))return this}null==this.frameBuffer&&(this.frameBuffer=r.createFramebuffer()),null==this.depthBuffer&&(this.depthBuffer=r.createRenderbuffer()),t.bufferStructure&&t.bufferStructure.length&&(this.bufferStructure=t.bufferStructure,this.bufferStructure.some(t=>"FLOAT"===t.type)&&(this._painter.isWebGL2?r.getExtension("EXT_color_buffer_float"):r.getExtension("OES_texture_float")));const s=this.bufferStructure.length||1,a=[r.COLOR_ATTACHMENT0];if(r.bindFramebuffer(r.FRAMEBUFFER,this.frameBuffer),s>1){let t;this._painter.isWebGL2||(t=r.getExtension("WEBGL_draw_buffers"));const e=this._painter.isWebGL2?r.COLOR_ATTACHMENT0:t.COLOR_ATTACHMENT0_WEBGL;for(let t=0;t<s;t++)a[t]=e+t;this._painter.isWebGL2?r.drawBuffers(a):t.drawBuffersWEBGL(a)}if(this.antialias=1===s&&this._painter.isWebGL2&&(t.antialias||(null===(e=this._data)||void 0===e?void 0:e.antialias)),this.antialias){const t=r;null==this.antiAliasFrameBuffer&&(this.antiAliasFrameBuffer=r.createFramebuffer()),null==this.antiAliasRenderBuffer&&(this.antiAliasRenderBuffer=r.createRenderbuffer()),r.bindFramebuffer(r.FRAMEBUFFER,this.antiAliasFrameBuffer),r.bindRenderbuffer(r.RENDERBUFFER,this.antiAliasRenderBuffer),t.renderbufferStorageMultisample(r.RENDERBUFFER,Math.min(4,r.getParameter(t.MAX_SAMPLES)),t.RGBA8,i,n),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,this.antiAliasRenderBuffer),r.bindRenderbuffer(r.RENDERBUFFER,this.depthBuffer),t.renderbufferStorageMultisample(r.RENDERBUFFER,Math.min(4,r.getParameter(t.MAX_SAMPLES)),r.DEPTH_COMPONENT16,i,n),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,this.depthBuffer),r.bindFramebuffer(r.FRAMEBUFFER,this.frameBuffer)}else r.bindRenderbuffer(r.RENDERBUFFER,this.depthBuffer),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_COMPONENT16,i,n),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,this.depthBuffer);for(let t=0;t<s;t++){this.textures[t]||(this.textures[t]=new K(this._painter,this.id+"_Texture"+t));const e=this.textures[t];e.update(Object.assign(Object.assign({minFilter:"NEAREST",magFilter:"NEAREST"},this.bufferStructure[t]),{data:null,width:i,height:n})),r.framebufferTexture2D(r.FRAMEBUFFER,a[t],r.TEXTURE_2D,e._texture,0)}if(this.antialias){r.bindFramebuffer(r.FRAMEBUFFER,this.antiAliasFrameBuffer);const e=r.checkFramebufferStatus(r.FRAMEBUFFER);e!==r.FRAMEBUFFER_COMPLETE&&console.error("antialias framebuffer error",e,t),r.bindFramebuffer(r.FRAMEBUFFER,this.frameBuffer)}const u=r.checkFramebufferStatus(r.FRAMEBUFFER);return u!==r.FRAMEBUFFER_COMPLETE&&console.error("framebuffer error",u,t),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindTexture(r.TEXTURE_2D,null),r.bindRenderbuffer(r.RENDERBUFFER,null),Object.assign(this._data,t),this.width=i,this.height=n,this}destroy(){const t=this._painter.gl;t.deleteFramebuffer(this.frameBuffer),t.deleteRenderbuffer(this.depthBuffer);for(const e of this.textures)t.deleteTexture(e);this.antiAliasFrameBuffer&&t.deleteFramebuffer(this.antiAliasFrameBuffer),this.antiAliasRenderBuffer&&t.deleteRenderbuffer(this.antiAliasRenderBuffer),this.textures=[],this.frameBuffer=null,this.depthBuffer=null,this._data={},this.bufferStructure=[],this.width=0,this.height=0}}let J=1;class Z{constructor(t,e="Frame"+J++){this._painter=t,this.id=e,this.width=0,this.height=0,this.layers=[],this._data={},this._targets=[],this._textures=[]}image(t=0){return this._targets.length&&this._targets[this._targets.length-1].textures[t]||this._textures[t]}update(t={}){var e,r,i,n;const s=this._painter.gl,a=Array.isArray(t.layers)?t.layers:t.layers?[t.layers]:this.layers,u=t.selfReferencing||this._data.selfReferencing,f=a.reduce((t,e)=>t+(e._uniforms.length||1),0),o=u||f>1?2:f,_=t.width||(null===(e=t.texture)||void 0===e?void 0:e.width)||this._data.width||(null===(r=this._data.texture)||void 0===r?void 0:r.width)||s.drawingBufferWidth,h=t.height||(null===(i=t.texture)||void 0===i?void 0:i.height)||this._data.height||(null===(n=this._data.texture)||void 0===n?void 0:n.height)||s.drawingBufferHeight,l=t.antialias||this._data.antialias||!0;o!==this._targets.length&&this._destroyTargets();const E=Object.assign(Object.assign({},t),{width:_,height:h,antialias:l});return!this._targets.length&&o>0?this._targets=function(t,e,r=[]){for(let i=0;i<e;i++)r[i]=t(i);return r}(t=>new q(this._painter,this.id+"_target"+(t+1)).update(E),o):this._targets.length&&this._targets.forEach(t=>{t.update(E)}),t.texture&&(this._textures[0]||(this._textures[0]=new K(this._painter,this.id+"_Texture0")),t.texture.width=_,t.texture.height=h,this._textures[0].update(t.texture)),Object.assign(this._data,t),this.layers=a,this.width=_,this.height=h,this}destroy(){this._destroyTargets(),this._textures.forEach(t=>t.destroy()),this._textures=[],this._data={},this.layers=[],this.width=0,this.height=0}_destroyTargets(){this._targets.forEach(t=>t.destroy()),this._targets=[]}_swapTargets(){if(this._targets.length>1){const t=this._targets[0];this._targets[0]=this._targets[1],this._targets[1]=t}}}let tt=1;class et{constructor(t="DrawingLayer"+tt++){this.id=t,this.sketches=[],this._data={},this._uniforms=[]}update(t){if(t.sketches&&(this.sketches=Array.isArray(t.sketches)?t.sketches:[t.sketches]),t.frag){const e=this.sketches&&this.sketches[0];e&&e.shade.update({frag:t.frag})}return t.uniforms&&(this._uniforms=Array.isArray(t.uniforms)?t.uniforms:[t.uniforms]),Object.assign(this._data,t),this}destroy(){for(const t of this.sketches)t.destroy();this._data.sketches=[],this._data={},this._uniforms=[]}}let rt=1;class it{constructor(t,e="Shade"+rt++){this._painter=t,this.id=e}update(t){const e=this._painter.gl,r=t.frag&&t.frag.trim()||this.fragSource,i=t.vert&&t.vert.trim()||this.vertSource;if(!r||!i||r===this.fragSource&&i===this.vertSource)return this;this.destroy(),r.indexOf("GL_EXT_draw_buffers")>=0&&e.getExtension("WEBGL_draw_buffers");const n=e.createProgram(),s=e.createShader(e.FRAGMENT_SHADER),a=e.createShader(e.VERTEX_SHADER);if(n&&a&&s){if(this._program=n,this._frag=s,this._vert=a,e.attachShader(n,a),e.attachShader(n,s),e.shaderSource(a,i),e.shaderSource(s,r),e.compileShader(a),e.compileShader(s),e.getShaderParameter(a,e.COMPILE_STATUS)||console.error("Error Compiling Vertex Shader!\n",e.getShaderInfoLog(a),nt(i)),e.getShaderParameter(s,e.COMPILE_STATUS)||console.error("Error Compiling Fragment Shader!\n",e.getShaderInfoLog(s),nt(r)),e.linkProgram(n),!e.getProgramParameter(n,e.LINK_STATUS)){const t=e.getProgramInfoLog(n);console.error("Error in program linking:",t)}return this._uniformSetters=function(t,e){let r=0;function i(e,i){const n=t.getUniformLocation(e,i.name),s=i.size>1&&"[0]"===i.name.substr(-3),a=i.type,u=v[a];if(!u)throw new Error("unknown type: 0x"+a.toString(16));if(null==n)return;let f;if(null===u.Type){const e=r;r+=i.size,f=s?u.arraySetter(t,a,e,n,i.size):u.setter(t,a,e,n)}else f=u.arraySetter&&s?u.arraySetter(t,n):u.setter(t,n);return{setter:f,location:n}}const n={},s=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<s;++r){const s=t.getActiveUniform(e,r);if(!s)continue;let a=s.name;if("[0]"===a.substr(-3)&&(a=a.substr(0,a.length-3)),e){const t=i(e,s);t&&(n[a]=t)}}return n}(e,n),this._attributeSetters=function(t,e){const r={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const i=t.getActiveAttrib(e,n);if(!i)break;const s=t.getAttribLocation(e,i.name),a=H[i.type],u=a.setter(t,s,a);r[i.name]={setter:u,location:s}}return r}(e,n),this.fragSource=r,this.vertSource=i,this}}destroy(){const t=this._painter.gl;t.deleteProgram(this._program),t.deleteShader(this._frag),t.deleteShader(this._vert),this.vertSource=void 0,this.fragSource=void 0,this._attributeSetters={},this._uniformSetters={}}}function nt(t){return t.trim().split("\n").map((t,e)=>e+1+": "+t).join("\n")}let st=1;class at{constructor(t="Sketch"+st++){this.id=t,this._uniforms=[]}update(t){return t.drawSettings&&(this._drawSettings=t.drawSettings),t.form&&(this.form=t.form),t.shade&&(this.shade=t.shade),t.uniforms&&(this._uniforms=Array.isArray(t.uniforms)?t.uniforms:[t.uniforms]),this}destroy(){this.form&&this.form.destroy(),this.shade&&this.shade.destroy(),this._drawSettings=void 0,this._uniforms=[]}}class ut{constructor(t,e={}){this.canvas=t,this.isWebGL2=!0,this.maxBufferSamples=0;let r=null;if(e.useWebGL1||(r=t.getContext("webgl2",e)||t.getContext("experimental-webgl2",e)),null==r&&(this.isWebGL2=!1,r=t.getContext("webgl",e)||t.getContext("experimental-webgl",e)),null==r)throw Error("Cannot initialize WebGL.");this.gl=r,this.sizeMultiplier=e.sizeMultiplier||1,this.isWebGL2&&(this.maxBufferSamples=r.getParameter(r.MAX_SAMPLES)),this.resize(),Y(r,A(r)),this._renderQuad=this.createForm().update(S.renderQuad),this._staticSketch=this.createFlatSketch()}resize(){return p(this.gl.canvas,this.sizeMultiplier),this}destroy(){this._staticSketch.destroy(),this._renderQuad.destroy()}updateDrawSettings(t){return Y(this.gl,Object.assign({},t)),this}createForm(t){return new j(this,t)}createShade(t){return new it(this,t)}createSketch(t){return new at(t)}createFlatSketch(t){const e=this.createSketch(t);return e.update({form:this._renderQuad,shade:this.createShade(e.id+"_defaultShade").update(F.basicEffect)})}createFrame(t){return new Z(this,t)}createLayer(t){return new et(t)}createEffect(t){const e=this.createLayer(t);return e.update({sketches:this.createFlatSketch(e.id+"_effectSketch")})}draw(t,e){const r=this.gl;return r.bindFramebuffer(r.FRAMEBUFFER,null),r.viewport(0,0,r.drawingBufferWidth,r.drawingBufferHeight),ft(r,t,e),this}compose(...t){for(const e of t)lt(this.gl,e);return this}display(t,e=0){return this.draw(this._staticSketch,{source:t.image(e)})}}function ft(t,e,r,i){const{shade:n,form:s,_drawSettings:a,_uniforms:u}=e;if(!n||!s)throw Error("cannot draw, shader or geometry are not set");t.useProgram(n._program),function(t,e){for(const r in e._attribs){const i=t._attributeSetters[r];i&&i.setter(e._attribs[r])}}(n,s),r&&_t(n,r,i),a&&Y(t,a);for(let r=0;r<(u.length||1);r++)ot(t,e,u[r],i);a&&k(t,a)}function ot(t,e,r,i){r&&_t(e.shade,r,i),e.form._elements&&null!=e.form._elements.glType?(t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.form._elements.buffer),t.drawElements(e.form._drawType,e.form._itemCount,e.form._elements.glType,0)):t.drawArrays(e.form._drawType,0,e.form._itemCount)}function _t(t,e,r){for(const i in e){const n=t._uniformSetters[i];if(n){let t=e[i];"function"==typeof t&&(t=t()),"string"==typeof t&&r?n.setter(r[t]):n.setter(t)}}}function ht(t,e,r,i,n){i?(t.bindFramebuffer(t.FRAMEBUFFER,i.antialias?i.antiAliasFrameBuffer:i.frameBuffer),t.viewport(0,0,i.width,i.height)):(t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight)),e._data.drawSettings&&Y(t,e._data.drawSettings);for(const i of e.sketches)ft(t,i,r,n);if(i&&i.antialias){const e=t;t.bindFramebuffer(e.READ_FRAMEBUFFER,i.antiAliasFrameBuffer),t.bindFramebuffer(e.DRAW_FRAMEBUFFER,i.frameBuffer),e.clearBufferfv(e.COLOR,0,[1,1,1,1]),e.blitFramebuffer(0,0,i.width,i.height,0,0,i.width,i.height,t.COLOR_BUFFER_BIT,t.LINEAR)}e._data.drawSettings&&k(t,e._data.drawSettings)}function lt(t,e){for(let r=0;r<e.layers.length;r++){const i=e.layers[r],n=i._uniforms.length||1;for(let s=0;s<n;s++){const n=e._targets[0],a=r+s===0&&e._textures.length?e._textures:e._targets[1]&&e._targets[1].textures;ht(t,i,i._uniforms[s],n,a),e._swapTargets()}}}const Et={geometry:{plane:a},stackgl:u,context:s},Tt=n,Rt=i}])}));