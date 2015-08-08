(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define(factory);
	else if(typeof exports === 'object')
		exports["tsRenderer"] = factory();
	else
		root["tsRenderer"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _renderer = __webpack_require__(1);

	var _renderer2 = _interopRequireDefault(_renderer);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _assetLib = __webpack_require__(3);

	var _assetLib2 = _interopRequireDefault(_assetLib);

	var _utils = __webpack_require__(4);

	var _utils2 = _interopRequireDefault(_utils);

	exports['default'] = {
	    Renderer: _renderer2['default'],
	    Constants: _constants2['default'],
	    AssetLib: _assetLib2['default'],
	    utils: _utils2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var consts, create, getBufferData, init, initGeometries, initLayers, initObjects, initSettings, initShaders, lib, makeClear, renderLayers, renderObject, setTextureParams, typedArrayToGLType, updatStaticLayer, updateGeometry, updateLayer, updateObject, updateRenderTarget, updateShader, updateSize;

	consts = __webpack_require__(2);

	lib = __webpack_require__(3);

	create = function(canvas) {
	  var ctx, gl;
	  if (canvas == null) {
	    canvas = document.createElement('canvas');
	  }
	  gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	  if (!gl) {
	    throw Error('WebGL-Context could not be initialized!');
	  }
	  ctx = {
	    settings: {},
	    shaders: {},
	    geometries: {},
	    layers: {},
	    objects: {},
	    source: {},
	    target: {},
	    gl: gl
	  };
	  updateGeometry(ctx, '_renderQuad', lib.geometries._renderQuad);
	  updateShader(ctx, '_renderResult', lib.shaders._renderResult);
	  return updateObject(ctx, '_result', lib.objects._resultObject);
	};

	init = function(ctx, data) {
	  initSettings(ctx, data.settings);
	  initShaders(ctx, data.shaders);
	  initGeometries(ctx, data.geometries);
	  initLayers(ctx, data.layers);
	  initObjects(ctx, data.objects);
	  return updateSize(ctx);
	};

	initShaders = function(ctx, data) {
	  var k, v;
	  if (data) {
	    for (k in data) {
	      v = data[k];
	      updateShader(ctx, k, v);
	    }
	  }
	  return ctx;
	};

	initLayers = function(ctx, data) {
	  var k, v;
	  if (data) {
	    for (k in data) {
	      v = data[k];
	      updateLayer(ctx, k, v);
	    }
	  }
	  return ctx;
	};

	initGeometries = function(ctx, data) {
	  var k, v;
	  if (data) {
	    for (k in data) {
	      v = data[k];
	      updateGeometry(ctx, k, v);
	    }
	  }
	  return ctx;
	};

	initObjects = function(ctx, data) {
	  var k, v;
	  if (data) {
	    for (k in data) {
	      v = data[k];
	      updateObject(ctx, k, v);
	    }
	  }
	  return ctx;
	};

	updateObject = function(ctx, id, object) {
	  ctx.objects[id] = object;
	  return ctx;
	};

	initSettings = function(ctx, data) {
	  var j, len, param, ref;
	  data || (data = {});
	  ctx.settings.clearColor = data.clearColor || [0.0, 0.0, 0.0, 1.0];
	  ctx.settings.minFilter = data.minFilter || 'LINEAR';
	  ctx.settings.wrap = data.wrap || 'CLAMP_TO_EDGE';
	  ctx.settings.clearBits = makeClear(ctx.gl, data.clearBuffers || ['DEPTH', 'COLOR']);
	  ctx.settings.enable = data.enable || ['DEPTH_TEST'];
	  ref = ctx.settings.enable;
	  for (j = 0, len = ref.length; j < len; j++) {
	    param = ref[j];
	    ctx.gl.enable(ctx.gl[param]);
	  }
	  return ctx;
	};

	updateShader = function(ctx, name, data) {
	  var attribs, base, fragSource, gl, newProgram, ref, ref1, shader, type, uniforms;
	  shader = (base = ctx.shaders)[name] != null ? base[name] : base[name] = {};
	  newProgram = shader.program == null;
	  gl = ctx.gl;
	  fragSource = 'precision mediump float;\n' + data.frag;
	  if (newProgram) {
	    shader.program = gl.createProgram();
	  }
	  if (shader.vert == null) {
	    shader.vert = gl.createShader(gl.VERTEX_SHADER);
	  }
	  if (shader.frag == null) {
	    shader.frag = gl.createShader(gl.FRAGMENT_SHADER);
	  }
	  gl.shaderSource(shader.vert, data.vert);
	  gl.shaderSource(shader.frag, fragSource);
	  gl.compileShader(shader.vert);
	  gl.compileShader(shader.frag);
	  if (!gl.getShaderParameter(shader.vert, gl.COMPILE_STATUS)) {
	    console.error('Error Compiling Vertex Shader!\n', gl.getShaderInfoLog(shader.vert), data.vert);
	  }
	  if (!gl.getShaderParameter(shader.frag, gl.COMPILE_STATUS)) {
	    console.error('Error Compiling Fragment Shader!\n', gl.getShaderInfoLog(shader.frag), data.frag);
	  }
	  if (newProgram) {
	    gl.attachShader(shader.program, shader.vert);
	    gl.attachShader(shader.program, shader.frag);
	  }
	  gl.linkProgram(shader.program);
	  attribs = shader.attribs = {};
	  ref = data.attribs;
	  for (name in ref) {
	    type = ref[name];
	    attribs[name] = {
	      index: gl.getAttribLocation(shader.program, name),
	      type: gl[consts.attribType[type]],
	      itemSize: consts.attribItemSize[type]
	    };
	  }
	  uniforms = shader.uniforms = {};
	  ref1 = data.uniforms;
	  for (name in ref1) {
	    type = ref1[name];
	    uniforms[name] = {
	      index: gl.getUniformLocation(shader.program, name),
	      type: type
	    };
	  }
	  return ctx;
	};

	updateGeometry = function(ctx, name, data) {
	  var attribData, attribs, base, base1, buffer, geometry, gl, ref;
	  gl = ctx.gl;
	  geometry = (base = ctx.geometries)[name] != null ? base[name] : base[name] = {};
	  geometry.drawType = gl[data.drawType];
	  geometry.itemCount = data.itemCount;
	  attribs = geometry.attribs != null ? geometry.attribs : geometry.attribs = {};
	  ref = data.attribs;
	  for (name in ref) {
	    attribData = ref[name];
	    if (attribs[name] == null) {
	      attribs[name] = gl.createBuffer();
	    }
	    gl.bindBuffer(gl.ARRAY_BUFFER, attribs[name]);
	    gl.bufferData(gl.ARRAY_BUFFER, getBufferData(attribData), gl[(attribData.storeType || 'STATIC') + '_DRAW']);
	  }
	  if (data.elements) {
	    if (geometry.elements == null) {
	      geometry.elements = {};
	    }
	    if ((base1 = geometry.elements).buffer == null) {
	      base1.buffer = gl.createBuffer();
	    }
	    buffer = getBufferData(data.elements);
	    geometry.elements.glType = typedArrayToGLType(buffer, gl);
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.elements.buffer);
	    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, buffer, gl[(data.elements.storeType || 'STATIC') + '_DRAW']);
	  } else if (geometry.elements) {
	    delete geometry.elements;
	  }
	  return ctx;
	};

	updateLayer = function(ctx, name, data) {
	  var base, layer;
	  layer = (base = ctx.layers)[name] != null ? base[name] : base[name] = {};
	  layer.type = data.type;
	  layer.noClear = data.noClear;
	  layer.clearColor = data.clearColor || ctx.settings.clearColor;
	  if (data.buffered) {
	    layer.width = data.width || ctx.settings.width;
	    layer.height = data.height || ctx.settings.height;
	    updateRenderTarget(ctx.gl, layer, data);
	  }
	  switch (data.type) {
	    case consts.LayerType.STATIC:
	      updateStaticLayer(layer, data);
	      break;
	    case consts.LayerType.RENDER:
	      layer.objects = data.objects;
	      break;
	    case consts.LayerType.EFFECT:
	      layer.object = data;
	      layer.object.geometry = '_renderQuad';
	  }
	  return ctx;
	};

	updatStaticLayer = function(ctx, layer, data) {
	  var gl, texture;
	  gl = ctx.gl;
	  texture = layer.texture != null ? layer.texture : layer.texture = gl.createTexture();
	  gl.bindTexture(gl.TEXTURE_2D, texture);
	  setTextureParams(ctx.gl, data);
	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.asset);
	  gl.generateMipmap(gl.TEXTURE_2D);
	  gl.bindTexture(gl.TEXTURE_2D, null);
	};

	updateSize = function(ctx) {
	  var gl;
	  gl = ctx.gl;
	  ctx.settings.width = gl.canvas.clientWidth;
	  ctx.settings.height = gl.canvas.clientHeight;
	  if (gl.canvas.width !== ctx.settings.width || gl.canvas.height !== ctx.settings.height) {
	    gl.canvas.height = ctx.settings.height;
	    gl.canvas.width = ctx.settings.width;
	  }
	  updateRenderTarget(ctx.gl, ctx.source, ctx.settings);
	  updateRenderTarget(ctx.gl, ctx.target, ctx.settings);
	  return ctx;
	};

	renderLayers = function(ctx, layerIds) {
	  var directRender, gl, i, id, j, l, last, layer, layerId, len, len1, ref, renderToTarget, tmp;
	  gl = ctx.gl;
	  last = layerIds.length - 1;
	  for (i = j = 0, len = layerIds.length; j < len; i = ++j) {
	    layerId = layerIds[i];
	    layer = ctx.layers[layerId];
	    directRender = i === last;
	    renderToTarget = !(directRender || (layer.frameBuffer != null));
	    if (directRender) {
	      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	    } else if (renderToTarget) {
	      gl.bindFramebuffer(gl.FRAMEBUFFER, ctx.target.frameBuffer);
	      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
	    } else {
	      gl.bindFramebuffer(gl.FRAMEBUFFER, layer.frameBuffer);
	      gl.viewport(0, 0, layer.width, layer.height);
	    }
	    if (!layer.noClear) {
	      gl.clearColor.apply(gl, layer.clearColor || ctx.settings.clearColor);
	      gl.clear(ctx.settings.clearBits);
	    }
	    if (layer.type === consts.LayerType.RENDER) {
	      ref = layer.objects;
	      for (l = 0, len1 = ref.length; l < len1; l++) {
	        id = ref[l];
	        renderObject(ctx, ctx.objects[id]);
	      }
	    } else if (layer.type === consts.LayerType.EFFECT) {
	      renderObject(ctx, layer.object);
	    }
	    if (renderToTarget) {
	      tmp = ctx.source;
	      ctx.source = ctx.target;
	      ctx.target = tmp;
	    }
	  }
	};

	renderObject = function(ctx, object) {
	  var attrib, buffIndex, geometry, gl, index, name, ref, ref1, shader, texture, textureCount, uniform, value;
	  gl = ctx.gl;
	  textureCount = 0;
	  shader = ctx.shaders[object.shader];
	  geometry = ctx.geometries[object.geometry];
	  gl.useProgram(shader.program);
	  ref = shader.attribs;
	  for (name in ref) {
	    attrib = ref[name];
	    buffIndex = geometry.attribs[name];
	    gl.bindBuffer(gl.ARRAY_BUFFER, buffIndex);
	    gl.enableVertexAttribArray(attrib.index);
	    gl.vertexAttribPointer(attrib.index, attrib.itemSize, attrib.type, false, 0, 0);
	  }
	  ref1 = shader.uniforms;
	  for (name in ref1) {
	    uniform = ref1[name];
	    index = uniform.index;
	    value = object.uniforms[name];
	    switch (uniform.type) {
	      case 't':
	        texture = value === consts.SOURCE_LAYER ? ctx.source.texture : ctx.layers[value].texture;
	        gl.activeTexture(gl['TEXTURE' + textureCount]);
	        gl.bindTexture(gl.TEXTURE_2D, texture);
	        gl.uniform1i(index, textureCount);
	        textureCount++;
	        break;
	      case 'f 1':
	        gl.uniform1f(index, value);
	        break;
	      case 'f 2':
	        gl.uniform2fv(index, value);
	        break;
	      case 'f 3':
	        gl.uniform3fv(index, value);
	        break;
	      case 'f 4':
	        gl.uniform4fv(index, value);
	        break;
	      case 'm 2':
	        gl.uniformMatrix2fv(index, false, value);
	        break;
	      case 'm 3':
	        gl.uniformMatrix3fv(index, false, value);
	        break;
	      case 'm 4':
	        gl.uniformMatrix4fv(index, false, value);
	        break;
	      case 'i 1':
	        gl.uniform1i(index, value);
	        break;
	      case 'i 2':
	        gl.uniform2iv(index, value);
	        break;
	      case 'i 3':
	        gl.uniform3iv(index, value);
	        break;
	      case 'i 4':
	        gl.uniform4iv(index, value);
	        break;
	      default:
	        console.error('Uniform type ' + uniform.type + ' unknown. uniform ' + name + ' not set!');
	    }
	  }
	  if (geometry.elements) {
	    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.elements.buffer);
	    gl.drawElements(geometry.drawType, geometry.itemCount, geometry.elements.glType, 0);
	  } else {
	    gl.drawArrays(geometry.drawType, 0, geometry.itemCount);
	  }
	};

	makeClear = function(gl, clearArray) {
	  var f;
	  f = function(res, item) {
	    return res | gl[item + '_BUFFER_BIT'];
	  };
	  return clearArray.reduce(f, 0);
	};

	setTextureParams = function(gl, data) {
	  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, !!data.flipY);
	  if (data.wrap) {
	    data.wrapS = data.wrapT = data.wrap;
	  }
	  if (data.wrapS) {
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl[data.wrapS]);
	  }
	  if (data.wrapT) {
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl[data.wrapT]);
	  }
	  if (data.magFilter) {
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl[data.magFilter]);
	  }
	  if (data.minFilter) {
	    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl[data.minFilter]);
	  }
	};

	updateRenderTarget = function(gl, target, data) {
	  var err;
	  if (target.frameBuffer == null) {
	    target.frameBuffer = gl.createFramebuffer();
	  }
	  if (target.texture == null) {
	    target.texture = target.texture || gl.createTexture();
	  }
	  if (target.depthBuffer == null) {
	    target.depthBuffer = gl.createRenderbuffer();
	  }
	  gl.bindTexture(gl.TEXTURE_2D, target.texture);
	  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, data.width, data.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	  setTextureParams(gl, data);
	  gl.bindRenderbuffer(gl.RENDERBUFFER, target.depthBuffer);
	  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, data.width, data.height);
	  gl.bindFramebuffer(gl.FRAMEBUFFER, target.frameBuffer);
	  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, target.texture, 0);
	  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, target.depthBuffer);
	  err = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
	  if (err !== gl.FRAMEBUFFER_COMPLETE) {
	    console.error('framebuffer error', err, data);
	  }
	  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	  gl.bindTexture(gl.TEXTURE_2D, null);
	  gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	};

	getBufferData = function(data) {
	  if (data.buffer) {
	    return data.buffer;
	  } else {
	    return new window[data.type](data.array);
	  }
	};

	typedArrayToGLType = function(array, gl) {
	  if (array instanceof Uint8Array) {
	    return gl.UNSIGNED_BYTE;
	  }
	  if (array instanceof Uint16Array) {
	    return gl.UNSIGNED_SHORT;
	  }
	  if (array instanceof Uint32Array) {
	    return gl.UNSIGNED_INT;
	  }
	  throw new TypeError('invalid array type');
	};

	module.exports = {
	  create: create,
	  init: init,
	  initSettings: initSettings,
	  updateObject: updateObject,
	  updateGeometry: updateGeometry,
	  updateShader: updateShader,
	  updateLayer: updateLayer,
	  updateSize: updateSize,
	  renderLayers: renderLayers
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	exports.SOURCE_LAYER = 'source';

	exports.LayerType = {
	  RENDER: 'render',
	  EFFECT: 'effect',
	  STATIC: 'static'
	};

	exports.attribType = {
	  'f 1': 'FLOAT',
	  'f 2': 'FLOAT',
	  'f 3': 'FLOAT',
	  'f 4': 'FLOAT',
	  'i 1': 'INT',
	  'i 2': 'INT',
	  'i 3': 'INT',
	  'i 4': 'INT',
	  'b 1': 'BYTE',
	  'b 2': 'BYTE',
	  'b 3': 'BYTE',
	  'b 4': 'BYTE'
	};

	exports.attribItemSize = {
	  'f 1': 1,
	  'f 2': 2,
	  'f 3': 3,
	  'f 4': 4,
	  'i 1': 1,
	  'i 2': 2,
	  'i 3': 3,
	  'i 4': 4,
	  'b 1': 1,
	  'b 2': 2,
	  'b 3': 3,
	  'b 4': 4
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var consts;

	consts = __webpack_require__(2);

	module.exports = {
	  geometries: {
	    _renderQuad: {
	      attribs: {
	        "position": {
	          buffer: new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
	          storeType: "STATIC"
	        },
	        "uv": {
	          buffer: new Float32Array([0, 1, 0, 0, 1, 1, 1, 0]),
	          storeType: "STATIC"
	        }
	      },
	      drawType: "TRIANGLE_STRIP",
	      itemCount: 4
	    }
	  },
	  shaders: {
	    _renderResult: {
	      vert: "attribute vec2 position;\nattribute vec2 uv;\nvarying vec2 vUv;\nvoid main() {\n    vUv = uv;\n    gl_Position = vec4(position, 0.0, 1.0);\n}",
	      frag: "uniform sampler2D source;\nvarying vec2 vUv;\nvoid main() {\n    gl_FragColor = texture2D(source, vUv);\n}",
	      attribs: {
	        "position": "f 2",
	        "uv": "f 2"
	      },
	      uniforms: {
	        "source": "t"
	      }
	    }
	  },
	  objects: {
	    _resultObject: {
	      shader: '_renderResult',
	      geometry: '_renderQuad',
	      uniforms: {
	        'source': consts.SOURCE_LAYER
	      }
	    }
	  }
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _entitySystemUpdateReactions = __webpack_require__(5);

	var _entitySystemUpdateReactions2 = _interopRequireDefault(_entitySystemUpdateReactions);

	exports['default'] = {
	    ESUpdateReactions: _entitySystemUpdateReactions2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var renderer, updateHelper;

	renderer = __webpack_require__(1);

	updateHelper = function(updateFn) {
	  return function(name) {
	    return function(scene, obj) {
	      return updateFn(scene, name, obj);
	    };
	  };
	};

	module.exports = {
	  updateShader: updateHelper(renderer.updateShader),
	  updateLayer: updateHelper(renderer.updateLayer),
	  updateObject: updateHelper(renderer.updateObject),
	  updateGeometry: updateHelper(renderer.updateGeometry)
	};


/***/ }
/******/ ])
});
;