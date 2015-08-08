renderer = require '../renderer'


updateHelper = (updateFn) ->
  (name) ->
    (scene, obj) ->
      updateFn scene, name, obj



module.exports =
  updateShader: updateHelper renderer.updateShader
  updateLayer: updateHelper renderer.updateLayer
  updateObject: updateHelper renderer.updateObject
  updateGeometry: updateHelper renderer.updateGeometry

