types = require 'systems/types'


describe 'System types', ->

  it 'has a incrementing id function', ->

    id1 = types.newUid()
    id2 = types.newUid()

    expect id2 > id1
      .to.be.true


