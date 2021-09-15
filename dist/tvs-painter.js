!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.tvsPainter=e():t.tvsPainter=e()}(self,(function(){return(()=>{"use strict";var t={d:(e,r)=>{for(var i in r)t.o(r,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:r[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{Painter:()=>at,constants:()=>Tt,lib:()=>Et,utils:()=>lt});var r={};t.r(r),t.d(r,{GEOMETRY_PROP_NORMAL:()=>_,GEOMETRY_PROP_POSITION:()=>f,GEOMETRY_PROP_UV:()=>u,GL_TYPE:()=>l,TEXTURE_FORMAT:()=>E,TEXTURE_FORMAT_DEFAULTS:()=>R,TEXTURE_FORMAT_INTERNAL:()=>T,UNIFORM_SOURCE_TEXTURE:()=>o,VARYING_UV_COORDS:()=>h});var i={};t.r(i),t.d(i,{defaultForms:()=>c,defaultShaders:()=>S,defaultTextureSettings:()=>d,getDefaultLayerSettings:()=>A});var s={};t.r(s),t.d(s,{makeClear:()=>m,resizeCanvas:()=>g,setBlendFunc:()=>F});var n={};t.r(n),t.d(n,{plane:()=>p});var a={};t.r(a),t.d(a,{STACK_GL_GEOMETRY_PROP_ELEMENTS:()=>I,STACK_GL_GEOMETRY_PROP_NORMAL:()=>y,STACK_GL_GEOMETRY_PROP_POSITION:()=>b,STACK_GL_GEOMETRY_PROP_UV:()=>U,convertStackGLGeometry:()=>B});const f="position",_="normal",u="uv",o="source",h="coords",l={FLOAT:5126,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,INT:5124,INT_VEC2:35667,INT_VEC3:35668,INT_VEC4:35669,BOOL:35670,BOOL_VEC2:35671,BOOL_VEC3:35672,BOOL_VEC4:35673,FLOAT_MAT2:35674,FLOAT_MAT3:35675,FLOAT_MAT4:35676,SAMPLER_2D:35678,SAMPLER_CUBE:35680,SAMPLER_3D:35679,SAMPLER_2D_SHADOW:35682,FLOAT_MAT2X3:35685,FLOAT_MAT2X4:35686,FLOAT_MAT3X2:35687,FLOAT_MAT3X4:35688,FLOAT_MAT4X2:35689,FLOAT_MAT4X3:35690,SAMPLER_2D_ARRAY:36289,SAMPLER_2D_ARRAY_SHADOW:36292,SAMPLER_CUBE_SHADOW:36293,UNSIGNED_INT:5125,UNSIGNED_INT_VEC2:36294,UNSIGNED_INT_VEC3:36295,UNSIGNED_INT_VEC4:36296,INT_SAMPLER_2D:36298,INT_SAMPLER_3D:36299,INT_SAMPLER_CUBE:36300,INT_SAMPLER_2D_ARRAY:36303,UNSIGNED_INT_SAMPLER_2D:36306,UNSIGNED_INT_SAMPLER_3D:36307,UNSIGNED_INT_SAMPLER_CUBE:36308,UNSIGNED_INT_SAMPLER_2D_ARRAY:36311,TEXTURE_2D:3553,TEXTURE_CUBE_MAP:34067,TEXTURE_3D:32879,TEXTURE_2D_ARRAY:35866,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,UNSIGNED_SHORT_4_4_4_4:32819,UNSIGNED_SHORT_5_5_5_1:32820,UNSIGNED_SHORT_5_6_5:33635,HALF_FLOAT:5131,UNSIGNED_INT_2_10_10_10_REV:33640,UNSIGNED_INT_10F_11F_11F_REV:35899,UNSIGNED_INT_5_9_9_9_REV:35902,FLOAT_32_UNSIGNED_INT_24_8_REV:36269,UNSIGNED_INT_24_8:34042},E={RED:6403,RG:33319,RGB:6407,RGBA:6408,RED_INTEGER:36244,RG_INTEGER:33320,RGB_INTEGER:36248,RGBA_INTEGER:36249,DEPTH_COMPONENT:6402},T={R8:33321,RG8:33323,RGB8:32849,RGBA8:32856,R16F:33325,RG16F:33327,RGB16F:34843,RGBA16F:34842,R32F:33326,RG32F:33328,RGB32F:34837,RGBA32F:34836,R8I:33329,RG8I:33335,RGB8I:36239,RGBA8I:36238,R8UI:33330,RG8UI:33336,RGB8UI:36221,RGBA8UI:36220,R16I:33331,RG16I:33337,RGB16I:36233,RGBA16I:36232,R16UI:33332,RG16UI:33338,RGB16UI:36215,RGBA16UI:36214,R32I:33333,RG32I:33339,RGB32I:36227,RGBA32I:36226,R32UI:33334,RG32UI:33340,RGB32UI:36209,RGBA32UI:36208,RGB10_A2:32857,RGB10_A2UI:36975,SRGB:35904,SRGB8:35905,SRGB8_ALPHA8:35907,R8_SNORM:36756,RG8_SNORM:36757,RGB8_SNORM:36758,RGBA8_SNORM:36759,DEPTH_COMPONENT16:33189,DEPTH_COMPONENT24:33190,DEPTH_COMPONENT32F:36012},R={[l.UNSIGNED_BYTE]:{[E.RED]:T.R8,[E.RG]:T.RG8,[E.RGB]:T.RGB8,[E.RGBA]:T.RGBA8},[l.UNSIGNED_SHORT]:{[E.DEPTH_COMPONENT]:T.DEPTH_COMPONENT16,[E.RED]:T.R16UI,[E.RG]:T.RG16UI,[E.RGB]:T.RGB16UI,[E.RGBA]:T.RGBA16UI},[l.UNSIGNED_INT]:{[E.DEPTH_COMPONENT]:T.DEPTH_COMPONENT24,[E.RED]:T.R32UI,[E.RG]:T.RG32UI,[E.RGB]:T.RGB32UI,[E.RGBA]:T.RGBA32UI},[l.FLOAT]:{[E.RED]:T.R16F,[E.RG]:T.RG16F,[E.RGB]:T.RGB16F,[E.RGBA]:T.RGBA16F,[E.DEPTH_COMPONENT]:T.DEPTH_COMPONENT32F},COMPRESSED_TYPES:{}},d={wrap:"CLAMP_TO_EDGE",minFilter:"LINEAR",magFilter:"NEAREST"};function A(t){return{clearColor:[0,0,0,1],blendFunc:[t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA]}}const c={renderQuad:{attribs:{[f]:{buffer:new Float32Array([-1,1,-1,-1,1,1,1,-1]),storeType:"STATIC"},[u]:{buffer:new Float32Array([0,1,0,0,1,1,1,0]),storeType:"STATIC"}},drawType:"TRIANGLE_STRIP",itemCount:4}},S={basicEffect:{vert:`\nattribute vec2 ${f};\nattribute vec2 ${u};\nvarying vec2 ${h};\nvoid main() {\n\t${h} = ${u};\n\tgl_Position = vec4(${f}, 0.0, 1.0);\n}`,frag:`precision mediump float;\nuniform sampler2D ${o};\nvarying vec2 ${h};\nvoid main() {\n\tgl_FragColor = texture2D(${o}, ${h});\n}`}};function m(t,...e){return e.reduce(((e,r)=>e|t[r.toUpperCase()+"_BUFFER_BIT"]),0)}function F(t,e){t.blendFunc.apply(t,e.map((e=>t[e.toUpperCase()])))}function g(t,e=1){let r=t.width,i=t.height;if("clientWidth"in t){const s=t.getBoundingClientRect();r=s.width*e|0,i=s.height*e|0}return(t.width!==r||t.height!==i)&&(t.width=r,t.height=i,!0)}function p(t,e,r,i){const s=t/2,n=e/2,a=r||1,f=i||1,_=a+1,u=f+1,o=t/a,h=e/f,l=new Float32Array(_*u*3),E=new Float32Array(_*u*3),T=new Float32Array(_*u*2);let R,d,A=0,c=0;for(R=0;R<u;R++){const t=R*h-n;for(d=0;d<_;d++){const e=d*o-s;l[A]=e,l[A+1]=-t,E[A+2]=1,T[c]=d/a,T[c+1]=1-R/f,A+=3,c+=2}}A=0;const S=new(l.length/3>65535?Uint32Array:Uint16Array)(a*f*6);for(R=0;R<f;R++)for(d=0;d<a;d++){const t=d+_*R,e=d+_*(R+1),r=d+1+_*(R+1),i=d+1+_*R;S[A]=t,S[A+1]=e,S[A+2]=i,S[A+3]=e,S[A+4]=r,S[A+5]=i,A+=6}return{attribs:{position:{buffer:l},normal:{buffer:E},uv:{buffer:T}},elements:{buffer:S},drawType:"TRIANGLES",itemCount:S.length}}function N(t,e=[]){for(const r of t){const t=e.length;for(let i=0;i<r.length;i++)e[i+t]=r[i]}return e}const b="positions",y="normals",U="uvs",I="cells";function B(t){const e={drawType:"TRIANGLES",attribs:{},itemCount:0};for(const r in t){const i=t[r];if(r===I){const t=new(i.length>65535?Uint32Array:Uint16Array)(N(i));Object.assign(e,{elements:{buffer:t},itemCount:t.length})}else r===b?e.attribs[f]={buffer:new Float32Array(N(i))}:r===y?e.attribs[_]={buffer:new Float32Array(N(i))}:r===U?e.attribs[u]={buffer:new Float32Array(N(i))}:e.attribs[r]={buffer:new Float32Array(N(i))}}return e}function O(t){return x[t].bindPoint}function G(t,e){return r=>{t.uniform1i(e,r)}}function L(t,e){return r=>{t.uniform1iv(e,r)}}function D(t,e){return r=>{t.uniform2iv(e,r)}}function M(t,e){return r=>{t.uniform3iv(e,r)}}function P(t,e){return r=>{t.uniform4iv(e,r)}}function w(t,e,r,i){const s=O(e);return e=>{t.uniform1i(i,r),t.activeTexture(t.TEXTURE0+r),t.bindTexture(s,e._texture)}}function C(t,e,r,i,s){const n=O(e),a=new Int32Array(s);for(let t=0;t<s;++t)a[t]=r+t;return e=>{t.uniform1iv(i,a);for(const r in e)t.activeTexture(t.TEXTURE0+a[r]),t.bindTexture(n,e[r]._texture)}}const x={[l.FLOAT]:{Type:Float32Array,size:4,setter:function(t,e){return r=>{t.uniform1f(e,r)}},arraySetter:function(t,e){return r=>{t.uniform1fv(e,r)}}},[l.FLOAT_VEC2]:{Type:Float32Array,size:8,setter:function(t,e){return r=>{t.uniform2fv(e,r)}}},[l.FLOAT_VEC3]:{Type:Float32Array,size:12,setter:function(t,e){return r=>{t.uniform3fv(e,r)}}},[l.FLOAT_VEC4]:{Type:Float32Array,size:16,setter:function(t,e){return r=>{t.uniform4fv(e,r)}}},[l.INT]:{Type:Int32Array,size:4,setter:G,arraySetter:L},[l.INT_VEC2]:{Type:Int32Array,size:8,setter:D},[l.INT_VEC3]:{Type:Int32Array,size:12,setter:M},[l.INT_VEC4]:{Type:Int32Array,size:16,setter:P},[l.UNSIGNED_INT]:{Type:Uint32Array,size:4,setter:function(t,e){return r=>{t.uniform1ui(e,r)}},arraySetter:function(t,e){return r=>{t.uniform1uiv(e,r)}}},[l.UNSIGNED_INT_VEC2]:{Type:Uint32Array,size:8,setter:function(t,e){return r=>{t.uniform2uiv(e,r)}}},[l.UNSIGNED_INT_VEC3]:{Type:Uint32Array,size:12,setter:function(t,e){return r=>{t.uniform3uiv(e,r)}}},[l.UNSIGNED_INT_VEC4]:{Type:Uint32Array,size:16,setter:function(t,e){return r=>{t.uniform4uiv(e,r)}}},[l.BOOL]:{Type:Uint32Array,size:4,setter:G,arraySetter:L},[l.BOOL_VEC2]:{Type:Uint32Array,size:8,setter:D},[l.BOOL_VEC3]:{Type:Uint32Array,size:12,setter:M},[l.BOOL_VEC4]:{Type:Uint32Array,size:16,setter:P},[l.FLOAT_MAT2]:{Type:Float32Array,size:16,setter:function(t,e){return r=>{t.uniformMatrix2fv(e,!1,r)}}},[l.FLOAT_MAT3]:{Type:Float32Array,size:36,setter:function(t,e){return r=>{t.uniformMatrix3fv(e,!1,r)}}},[l.FLOAT_MAT4]:{Type:Float32Array,size:64,setter:function(t,e){return r=>{t.uniformMatrix4fv(e,!1,r)}}},[l.FLOAT_MAT2X3]:{Type:Float32Array,size:24,setter:function(t,e){return r=>{t.uniformMatrix2x3fv(e,!1,r)}}},[l.FLOAT_MAT2X4]:{Type:Float32Array,size:32,setter:function(t,e){return r=>{t.uniformMatrix2x4fv(e,!1,r)}}},[l.FLOAT_MAT3X2]:{Type:Float32Array,size:24,setter:function(t,e){return r=>{t.uniformMatrix3x2fv(e,!1,r)}}},[l.FLOAT_MAT3X4]:{Type:Float32Array,size:48,setter:function(t,e){return r=>{t.uniformMatrix3x4fv(e,!1,r)}}},[l.FLOAT_MAT4X2]:{Type:Float32Array,size:32,setter:function(t,e){return r=>{t.uniformMatrix4x2fv(e,!1,r)}}},[l.FLOAT_MAT4X3]:{Type:Float32Array,size:48,setter:function(t,e){return r=>{t.uniformMatrix4x3fv(e,!1,r)}}},[l.SAMPLER_2D]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_2D},[l.SAMPLER_CUBE]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_CUBE_MAP},[l.SAMPLER_3D]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_3D},[l.SAMPLER_2D_SHADOW]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_2D},[l.SAMPLER_2D_ARRAY]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_2D_ARRAY},[l.SAMPLER_2D_ARRAY_SHADOW]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_2D_ARRAY},[l.SAMPLER_CUBE_SHADOW]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_CUBE_MAP},[l.INT_SAMPLER_2D]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_2D},[l.INT_SAMPLER_3D]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_3D},[l.INT_SAMPLER_CUBE]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_CUBE_MAP},[l.INT_SAMPLER_2D_ARRAY]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_2D_ARRAY},[l.UNSIGNED_INT_SAMPLER_2D]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_2D},[l.UNSIGNED_INT_SAMPLER_3D]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_3D},[l.UNSIGNED_INT_SAMPLER_CUBE]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_CUBE_MAP},[l.UNSIGNED_INT_SAMPLER_2D_ARRAY]:{Type:null,size:0,setter:w,arraySetter:C,bindPoint:l.TEXTURE_2D_ARRAY}};function v(t,e,r){return i=>{t.bindBuffer(t.ARRAY_BUFFER,i.buffer),t.enableVertexAttribArray(e),t.vertexAttribPointer(e,r.itemSize,l.FLOAT,i.normalize||!1,i.stride||0,i.offset||0)}}function z(t,e,r){return i=>{t.bindBuffer(t.ARRAY_BUFFER,i.buffer),t.enableVertexAttribArray(e),t.vertexAttribIPointer(e,r.itemSize,l.INT,i.stride||0,i.offset||0)}}function X(t,e,r){const i=r.size,s=r.count;return r=>{t.bindBuffer(t.ARRAY_BUFFER,r.buffer);const n=i,a=n/s,f=x[l.FLOAT].size*n,_=r.normalize||!1,u=r.offset||0,o=f/s;for(let r=0;r<s;++r)t.enableVertexAttribArray(e+r),t.vertexAttribPointer(e+r,a,l.FLOAT,_,f,u+o*r)}}const V={[l.FLOAT]:{size:4,setter:v,itemSize:1},[l.FLOAT_VEC2]:{size:8,setter:v,itemSize:2},[l.FLOAT_VEC3]:{size:12,setter:v,itemSize:3},[l.FLOAT_VEC4]:{size:16,setter:v,itemSize:4},[l.INT]:{size:4,setter:z,itemSize:1},[l.INT_VEC2]:{size:8,setter:z,itemSize:2},[l.INT_VEC3]:{size:12,setter:z,itemSize:3},[l.INT_VEC4]:{size:16,setter:z,itemSize:4},[l.UNSIGNED_INT]:{size:4,setter:z,itemSize:1},[l.UNSIGNED_INT_VEC2]:{size:8,setter:z,itemSize:2},[l.UNSIGNED_INT_VEC3]:{size:12,setter:z,itemSize:3},[l.UNSIGNED_INT_VEC4]:{size:16,setter:z,itemSize:4},[l.BOOL]:{size:4,setter:z,itemSize:1},[l.BOOL_VEC2]:{size:8,setter:z,itemSize:2},[l.BOOL_VEC3]:{size:12,setter:z,itemSize:3},[l.BOOL_VEC4]:{size:16,setter:z,itemSize:4},[l.FLOAT_MAT2]:{size:4,setter:X,count:2},[l.FLOAT_MAT3]:{size:9,setter:X,count:3},[l.FLOAT_MAT4]:{size:16,setter:X,count:4}};function H(t,e){if(e.enable)for(const r of e.enable)t.enable(r);if(e.disable)for(const r of e.disable)t.disable(r);e.blendFunc&&t.blendFunc.apply(t,e.blendFunc),null!=e.depthFunc&&t.depthFunc(e.depthFunc),null!=e.cullFace&&t.cullFace(e.cullFace),null!=e.frontFace&&t.frontFace(e.frontFace),null!=e.lineWidth&&t.lineWidth(e.lineWidth),e.colorMask&&t.colorMask.apply(t,e.colorMask),null!=e.depthMask&&t.depthMask(e.depthMask),e.clearColor&&t.clearColor.apply(t,e.clearColor),null!=e.clearDepth&&t.clearDepth(e.clearDepth),null!=e.clearBits&&t.clear(e.clearBits)}function Y(t,e){if(e.enable)for(const r of e.enable)t.disable(r);if(e.disable)for(const r of e.disable)t.enable(r)}l.BYTE,Int8Array,l.UNSIGNED_BYTE,Uint8Array,l.SHORT,Int16Array,l.UNSIGNED_SHORT,Uint16Array,l.INT,Int32Array,l.UNSIGNED_INT,Uint32Array,l.FLOAT,Float32Array,l.UNSIGNED_SHORT_4_4_4_4,Uint16Array,l.UNSIGNED_SHORT_5_5_5_1,Uint16Array,l.UNSIGNED_SHORT_5_6_5,Uint16Array,l.HALF_FLOAT,Uint16Array,l.UNSIGNED_INT_2_10_10_10_REV,Uint32Array,l.UNSIGNED_INT_10F_11F_11F_REV,Uint32Array,l.UNSIGNED_INT_5_9_9_9_REV,Uint32Array,l.FLOAT_32_UNSIGNED_INT_24_8_REV,Uint32Array,l.UNSIGNED_INT_24_8,Uint32Array;let W=1;class k{constructor(t,e="Form"+W++){this._painter=t,this.id=e}update(t){const e=this._painter.gl;t.drawType&&(this._drawType=e[t.drawType]),t.itemCount&&(this._itemCount=t.itemCount),this._attribs=this._attribs||{};for(const r in t.attribs){const i=t.attribs[r];null==this._attribs[r]&&(this._attribs[r]={buffer:e.createBuffer()}),e.bindBuffer(e.ARRAY_BUFFER,this._attribs[r].buffer),e.bufferData(e.ARRAY_BUFFER,i.buffer,e[(i.storeType||"STATIC")+"_DRAW"])}if(t.elements){const r=t.elements.buffer;null==this._elements&&(this._elements={buffer:e.createBuffer(),glType:null}),this._elements.glType=function(t){if(t instanceof Int8Array)return l.BYTE;if(t instanceof Uint8Array)return l.UNSIGNED_BYTE;if(t instanceof Uint8ClampedArray)return l.UNSIGNED_BYTE;if(t instanceof Int16Array)return l.SHORT;if(t instanceof Uint16Array)return l.UNSIGNED_SHORT;if(t instanceof Int32Array)return l.INT;if(t instanceof Uint32Array)return l.UNSIGNED_INT;if(t instanceof Float32Array)return l.FLOAT;throw new Error("unsupported typed array type")}(r),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,this._elements.buffer),e.bufferData(e.ELEMENT_ARRAY_BUFFER,r,e[(t.elements.storeType||"STATIC")+"_DRAW"])}return this}destroy(){const t=this._painter.gl;for(const e in this._attribs)t.deleteBuffer(this._attribs[e].buffer);this._attribs={},this._elements&&(t.deleteBuffer(this._elements.buffer),this._elements=void 0)}}let j=1;class ${constructor(t,e="Texture"+j++){this._painter=t,this.id=e,this._texture=null,this._data={}}update(t){const e=this._painter.gl;if(null==this._texture&&(this._texture=e.createTexture()),e.bindTexture(e.TEXTURE_2D,this._texture),t.wrap&&t.wrap!==this._data.wrap||t.wrapS&&t.wrapS!==this._data.wrapS||t.wrapT&&t.wrapT!==this._data.wrapT){let r,i;t.wrap?r=i=t.wrap:(i=t.wrapT||d.wrap,r=t.wrapS||d.wrap),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[r]),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[i])}else this._data.wrap||this._data.wrapS||this._data.wrapT||(this._data.wrap=this._data.wrapT=this._data.wrapS=d.wrap,e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e[this._data.wrap]),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e[this._data.wrap]));return t.magFilter&&t.magFilter!==this._data.magFilter?e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[t.magFilter]):this._data.magFilter||(this._data.magFilter=d.magFilter,e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e[this._data.magFilter])),t.minFilter&&t.minFilter!==this._data.minFilter?e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[t.minFilter]):this._data.minFilter||(this._data.minFilter=d.minFilter,e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e[this._data.minFilter])),t.asset&&e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,t.asset),void 0!==t.data&&e.texImage2D(e.TEXTURE_2D,0,"FLOAT"===t.type&&this._painter.isWebGL2?e.RGBA32F:e.RGBA,t.width,t.height,0,e.RGBA,e[t.type||"UNSIGNED_BYTE"],t.data),null!=t.flipY&&t.flipY!==this._data.flipY&&e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,t.flipY),t.minFilter&&t.minFilter.indexOf("MIPMAP")>0&&e.generateMipmap(e.TEXTURE_2D),e.bindTexture(e.TEXTURE_2D,null),Object.assign(this._data,t),this}destroy(){this._painter.gl.deleteTexture(this._texture),this._data={},this._texture=null}}let K=1;class Q{constructor(t,e="Form"+K++){this._painter=t,this.id=e,this.width=0,this.height=0,this.antialias=!1,this.frameBuffer=null,this.antiAliasFrameBuffer=null,this.antiAliasRenderBuffer=null,this.textures=[],this.depthBuffer=null,this.bufferStructure=[],this._data={}}update(t){var e;const r=this._painter.gl,i=t.width||this.width,s=t.height||this.height;if(!i||!s)return this;if(i===this.width&&s===this.height){if(!t.bufferStructure)return this;if(t.bufferStructure.length===this.bufferStructure.length&&this.bufferStructure.every(((e,r)=>function(t,e){if(t===e)return!0;if(!e)return!1;const r=Object.keys(t);if(!function(t,e){if(t===e)return!0;if(!e||!t)return!1;if(t.length!==e.length)return!1;for(let r=0;r<t.length;r++)if(t[r]!==e[r])return!1;return!0}(r,Object.keys(e)))return!1;for(const i of r)if(t[i]!==e[i])return!1;return!0}(e,t.bufferStructure[r]))))return this}null==this.frameBuffer&&(this.frameBuffer=r.createFramebuffer()),null==this.depthBuffer&&(this.depthBuffer=r.createRenderbuffer()),t.bufferStructure&&t.bufferStructure.length&&(this.bufferStructure=t.bufferStructure,this.bufferStructure.some((t=>"FLOAT"===t.type))&&(this._painter.isWebGL2?r.getExtension("EXT_color_buffer_float"):r.getExtension("OES_texture_float")));const n=this.bufferStructure.length||1,a=[r.COLOR_ATTACHMENT0];if(r.bindFramebuffer(r.FRAMEBUFFER,this.frameBuffer),n>1){let t;this._painter.isWebGL2||(t=r.getExtension("WEBGL_draw_buffers"));const e=this._painter.isWebGL2?r.COLOR_ATTACHMENT0:t.COLOR_ATTACHMENT0_WEBGL;for(let t=0;t<n;t++)a[t]=e+t;this._painter.isWebGL2?r.drawBuffers(a):t.drawBuffersWEBGL(a)}if(this.antialias=1===n&&this._painter.isWebGL2&&(t.antialias||(null===(e=this._data)||void 0===e?void 0:e.antialias)),this.antialias){const t=r;null==this.antiAliasFrameBuffer&&(this.antiAliasFrameBuffer=r.createFramebuffer()),null==this.antiAliasRenderBuffer&&(this.antiAliasRenderBuffer=r.createRenderbuffer()),r.bindFramebuffer(r.FRAMEBUFFER,this.antiAliasFrameBuffer),r.bindRenderbuffer(r.RENDERBUFFER,this.antiAliasRenderBuffer),t.renderbufferStorageMultisample(r.RENDERBUFFER,Math.min(4,r.getParameter(t.MAX_SAMPLES)),t.RGBA8,i,s),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,this.antiAliasRenderBuffer),r.bindRenderbuffer(r.RENDERBUFFER,this.depthBuffer),t.renderbufferStorageMultisample(r.RENDERBUFFER,Math.min(4,r.getParameter(t.MAX_SAMPLES)),r.DEPTH_COMPONENT16,i,s),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,this.depthBuffer),r.bindFramebuffer(r.FRAMEBUFFER,this.frameBuffer)}else r.bindRenderbuffer(r.RENDERBUFFER,this.depthBuffer),r.renderbufferStorage(r.RENDERBUFFER,r.DEPTH_COMPONENT16,i,s),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.RENDERBUFFER,this.depthBuffer);for(let t=0;t<n;t++){this.textures[t]||(this.textures[t]=new $(this._painter,this.id+"_Texture"+t));const e=this.textures[t];e.update(Object.assign(Object.assign({minFilter:"NEAREST",magFilter:"NEAREST"},this.bufferStructure[t]),{data:null,width:i,height:s})),r.framebufferTexture2D(r.FRAMEBUFFER,a[t],r.TEXTURE_2D,e._texture,0)}if(this.antialias){r.bindFramebuffer(r.FRAMEBUFFER,this.antiAliasFrameBuffer);const e=r.checkFramebufferStatus(r.FRAMEBUFFER);e!==r.FRAMEBUFFER_COMPLETE&&console.error("antialias framebuffer error",e,t),r.bindFramebuffer(r.FRAMEBUFFER,this.frameBuffer)}const f=r.checkFramebufferStatus(r.FRAMEBUFFER);return f!==r.FRAMEBUFFER_COMPLETE&&console.error("framebuffer error",f,t),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindTexture(r.TEXTURE_2D,null),r.bindRenderbuffer(r.RENDERBUFFER,null),Object.assign(this._data,t),this.width=i,this.height=s,this}destroy(){const t=this._painter.gl;t.deleteFramebuffer(this.frameBuffer),t.deleteRenderbuffer(this.depthBuffer);for(const e of this.textures)t.deleteTexture(e);this.antiAliasFrameBuffer&&t.deleteFramebuffer(this.antiAliasFrameBuffer),this.antiAliasRenderBuffer&&t.deleteRenderbuffer(this.antiAliasRenderBuffer),this.textures=[],this.frameBuffer=null,this.depthBuffer=null,this._data={},this.bufferStructure=[],this.width=0,this.height=0}}let q=1;class J{constructor(t,e="Layer"+q++){this._painter=t,this.id=e,this.sketches=[],this.effects=[],this.width=0,this.height=0,this._targets=[],this._textures=[],this._passCount=0,this._data={},this._uniforms=null}image(t=0){return this._targets.length&&this._targets[this._targets.length-1].textures[t]||this._textures[t]}update(t={}){var e,r,i,s;t.sketches&&(this.sketches=Array.isArray(t.sketches)?t.sketches:[t.sketches]),t.effects&&(this.effects=Array.isArray(t.effects)?t.effects:[t.effects]),t.uniforms&&(this._uniforms=t.uniforms);const n=t.selfReferencing||this._data.selfReferencing;let a=this.effects.reduce(((t,e)=>t+(e._uniforms.length||1)),this.sketches.length?1:0);const f=n||a>1?2:a;(t.directRender||this._data.directRender)&&(a-=1),this._passCount=a;const _=this._painter.gl,u=t.width||(null===(e=t.texture)||void 0===e?void 0:e.width)||this._data.width||(null===(r=this._data.texture)||void 0===r?void 0:r.width)||_.drawingBufferWidth,o=t.height||(null===(i=t.texture)||void 0===i?void 0:i.height)||this._data.height||(null===(s=this._data.texture)||void 0===s?void 0:s.height)||_.drawingBufferHeight,h=t.antialias||this._data.antialias||!0;f!==this._targets.length&&this._destroyTargets();const l=Object.assign(Object.assign({},t),{width:u,height:o,antialias:h});return!this._targets.length&&f>0?this._targets=function(t,e,r=[]){for(let i=0;i<e;i++)r[i]=t(i);return r}((t=>new Q(this._painter,this.id+"_target"+(t+1)).update(l)),f):this._targets.length&&this._targets.forEach((t=>{t.update(l)})),t.texture&&(this._textures[0]||(this._textures[0]=new $(this._painter,this.id+"_Texture0")),t.texture.width=u,t.texture.height=o,this._textures[0].update(t.texture)),Object.assign(this._data,t),this.width=u,this.height=o,this}destroy(){this._destroyTargets(),this.clear()}clear(){this.effects=[];for(const t of this._textures)t.destroy();this.effects=[],this.sketches=[],this.width=0,this.height=0,this._data={},this._textures=[],this._uniforms=null}_destroyTargets(){this._targets.forEach((t=>t.destroy())),this._targets=[]}_swapTargets(){if(this._targets.length>1){const t=this._targets[0];this._targets[0]=this._targets[1],this._targets[1]=t}}}let Z=1;class tt{constructor(t,e="Shade"+Z++){this._painter=t,this.id=e}update(t){const e=this._painter.gl,r=t.frag&&t.frag.trim()||this.fragSource,i=t.vert&&t.vert.trim()||this.vertSource;if(!r||!i||r===this.fragSource&&i===this.vertSource)return this;this.destroy(),r.indexOf("GL_EXT_draw_buffers")>=0&&e.getExtension("WEBGL_draw_buffers");const s=e.createProgram(),n=e.createShader(e.FRAGMENT_SHADER),a=e.createShader(e.VERTEX_SHADER);if(!(s&&a&&n))return this;if(this._program=s,this._frag=n,this._vert=a,e.attachShader(s,a),e.attachShader(s,n),e.shaderSource(a,i),e.shaderSource(n,r),e.compileShader(a),e.compileShader(n),e.getShaderParameter(a,e.COMPILE_STATUS)||console.error("Error Compiling Vertex Shader!\n",e.getShaderInfoLog(a),et(i)),e.getShaderParameter(n,e.COMPILE_STATUS)||console.error("Error Compiling Fragment Shader!\n",e.getShaderInfoLog(n),et(r)),e.linkProgram(s),!e.getProgramParameter(s,e.LINK_STATUS)){const t=e.getProgramInfoLog(s);console.error("Error in program linking:",t)}return this._uniformSetters=function(t,e){let r=0;function i(e,i){const s=t.getUniformLocation(e,i.name),n=i.size>1&&"[0]"===i.name.substr(-3),a=i.type,f=x[a];if(!f)throw new Error("unknown type: 0x"+a.toString(16));if(null==s)return;let _;if(null===f.Type){const e=r;r+=i.size,_=n?f.arraySetter(t,a,e,s,i.size):f.setter(t,a,e,s)}else _=f.arraySetter&&n?f.arraySetter(t,s):f.setter(t,s);return{setter:_,location:s}}const s={},n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const n=t.getActiveUniform(e,r);if(!n)continue;let a=n.name;if("[0]"===a.substr(-3)&&(a=a.substr(0,a.length-3)),e){const t=i(e,n);t&&(s[a]=t)}}return s}(e,s),this._attributeSetters=function(t,e){const r={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const i=t.getActiveAttrib(e,s);if(!i)break;const n=t.getAttribLocation(e,i.name),a=V[i.type],f=a.setter(t,n,a);r[i.name]={setter:f,location:n}}return r}(e,s),this.fragSource=r,this.vertSource=i,this}destroy(){const t=this._painter.gl;t.deleteProgram(this._program),t.deleteShader(this._frag),t.deleteShader(this._vert),this.vertSource=void 0,this.fragSource=void 0,this._attributeSetters={},this._uniformSetters={}}}function et(t){return t.trim().split("\n").map(((t,e)=>e+1+": "+t)).join("\n")}let rt=1;class it{constructor(t="Sketch"+rt++){this.id=t,this._uniforms=[]}update(t){return t.drawSettings&&(this._drawSettings=t.drawSettings),t.form&&(this.form=t.form),t.shade&&(this.shade=t.shade),t.uniforms&&(this._uniforms=Array.isArray(t.uniforms)?t.uniforms:[t.uniforms]),this}destroy(){this.form=null,this.shade=null,this._drawSettings=void 0,this._uniforms=[]}}let st=1;class nt extends it{constructor(t,e,r="Effect"+st++){super(r),this.id=r,this.form=t,this.shade=e}update(t){var e;return t.frag&&(null===(e=this.shade)||void 0===e||e.update({frag:t.frag})),t.drawSettings&&(this._drawSettings=t.drawSettings),t.uniforms&&(this._uniforms=Array.isArray(t.uniforms)?t.uniforms:[t.uniforms]),this}}class at{constructor(t,e={}){this.canvas=t,this.isWebGL2=!0,this.maxBufferSamples=0;let r=null;if(e.useWebGL1||(r=t.getContext("webgl2",e)||t.getContext("experimental-webgl2",e)),null==r&&(this.isWebGL2=!1,r=t.getContext("webgl",e)||t.getContext("experimental-webgl",e)),null==r)throw Error("Cannot initialize WebGL.");this.gl=r,this.sizeMultiplier=e.sizeMultiplier||1,this.isWebGL2&&(this.maxBufferSamples=r.getParameter(r.MAX_SAMPLES)),this.resize(),H(r,A(r)),this._renderQuad=this.createForm().update(c.renderQuad),this._staticEffect=this.createEffect(),this._defaultLayer=this.createLayer()}resize(){return g(this.gl.canvas,this.sizeMultiplier),this}destroy(){this._defaultLayer.destroy(),this._staticEffect.destroy(),this._renderQuad.destroy()}updateDrawSettings(t){return H(this.gl,Object.assign({},t)),this}createForm(t){return new k(this,t)}createShade(t){return new tt(this,t)}createSketch(t){return new it(t)}createEffect(t){return new nt(this._renderQuad,this.createShade(t&&t+"_effectShade").update(S.basicEffect),t)}createLayer(t){return new J(this,t)}draw(t){return this._defaultLayer.update(Object.assign(Object.assign({},t),{directRender:!0})),this.compose(this._defaultLayer),this._defaultLayer.clear(),this}compose(...t){for(const e of t)ht(this.gl,e);return this}show(t,e){return this.draw({effects:this._staticEffect,uniforms:{source:t.image(e)}})}}function ft(t,e,r,i,s){if(t.useProgram(e._program),function(t,e){for(const r in e._attribs){const i=t._attributeSetters[r];i&&i.setter(e._attribs[r])}}(e,r),Array.isArray(i))for(const t of i)_t(e,t,s);else i&&_t(e,i,s);r._elements&&null!=r._elements.glType?(t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,r._elements.buffer),t.drawElements(r._drawType,r._itemCount,r._elements.glType,0)):t.drawArrays(r._drawType,0,r._itemCount)}function _t(t,e,r){for(const i in e){const s=t._uniformSetters[i];if(s){let t=e[i];"function"==typeof t&&(t=t()),"string"==typeof t&&r?s.setter(r[t]):s.setter(t)}}}const ut=[];function ot(t,e,r){e?(t.bindFramebuffer(t.FRAMEBUFFER,e.antialias&&r?e.antiAliasFrameBuffer:e.frameBuffer),t.viewport(0,0,e.width,e.height)):(t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,t.drawingBufferWidth,t.drawingBufferHeight))}function ht(t,e){let r=e._passCount;if(e.sketches.length){const i=r>0?e._targets[0]:void 0,s=e._textures.length?e._textures:e._targets[1]&&e._targets[1].textures;ot(t,i,!0),e._data.drawSettings&&H(t,e._data.drawSettings),function(t,e,r,i){for(const s of e){if(!s.form||!s.shade)throw Error("cannot render incomplete sketch");if(s._drawSettings&&H(t,s._drawSettings),Array.isArray(s._uniforms)&&s._uniforms.length)for(const e of s._uniforms)ut.length=0,r&&ut.push(r),ut.push(e),ft(t,s.shade,s.form,ut,i);else ut.length=0,r&&ut.push(r),s._uniforms&&ut.push(s._uniforms),ft(t,s.shade,s.form,ut,i);s._drawSettings&&Y(t,s._drawSettings)}}(t,e.sketches,e._uniforms,s),function(t,e){if(e&&e.antialias){const r=t;t.bindFramebuffer(r.READ_FRAMEBUFFER,e.antiAliasFrameBuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,e.frameBuffer),r.clearBufferfv(r.COLOR,0,[1,1,1,1]),r.blitFramebuffer(0,0,e.width,e.height,0,0,e.width,e.height,t.COLOR_BUFFER_BIT,t.LINEAR)}}(t,i),e._swapTargets(),r--}if(e.effects.length)for(let i=0;i<e.effects.length;i++){const s=e.effects[i];if(!s.form||!s.shade)throw Error("cannot render incomplete effect");if(s._uniforms.length)for(let n=0;n<s._uniforms.length;n++){const a=r>0?e._targets[0]:void 0,f=n+i===0&&e._textures.length&&!e.sketches.length?e._textures:e._targets[1]&&e._targets[1].textures;ot(t,a,!1),e._data.drawSettings&&H(t,e._data.drawSettings),s._drawSettings&&H(t,s._drawSettings),ut.length=0,e._uniforms&&ut.push(e._uniforms),ut.push(s._uniforms[n]),ft(t,s.shade,s.form,ut,f),e._swapTargets(),r--}else{const n=r>0?e._targets[0]:void 0,a=0===i&&e._textures.length&&!e.sketches.length?e._textures:e._targets[1]&&e._targets[1].textures;ot(t,n,!1),e._data.drawSettings&&H(t,e._data.drawSettings),s._drawSettings&&H(t,s._drawSettings),ut.length=0,e._uniforms&&ut.push(e._uniforms),ft(t,s.shade,s.form,ut,a),e._swapTargets(),r--}s._drawSettings&&Y(t,s._drawSettings)}e._data.drawSettings&&Y(t,e._data.drawSettings)}const lt={geometry:{plane:n},stackgl:a,context:s},Et=i,Tt=r;return e})()}));