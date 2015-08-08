{getReactionId, getFactoryId, ActionTypes} = require 'systems/types'
parser = require 'systems/object-spec-parser'


describe 'Entity system object specification parser', ->

  it 'creates a basic system specification out of a js object', ->

    barInit = ->
    barReaction = ->
    bazInit = ->
    bazReaction = ->
    bazReaction2 = ->

    spec =
      'foo':
        value: 200

      'kuku/foo':
        value: 1

      'kuku/bar':
        value: 2

      'baz':
        init:
          require: 'foo bar'
          do: bazInit

        reactions:
          'trigger1 trigger2':
            require: 'kuku/foo'
            do: bazReaction
          'kuku/bar': bazReaction2

      'bar':
        init: barInit
        reactions:
          'foo': barReaction


    expected =
      entities:
        'foo':
          id: 'foo'
          name: 'foo'
          namespace: ''
          initialValue: 200

        'kuku/foo':
          id: 'kuku/foo'
          name: 'foo'
          namespace: 'kuku'
          initialValue: 1

        'kuku/bar':
          id: 'kuku/bar'
          name: 'bar'
          namespace: 'kuku'
          initialValue: 2

        'baz':
          id: 'baz'
          name: 'baz'
          namespace: ''

        'bar':
          id: 'bar'
          name: 'bar'
          namespace: ''

        'trigger1':
          id: 'trigger1'
          name: 'trigger1'
          namespace: ''

        'trigger2':
          id: 'trigger2'
          name: 'trigger2'
          namespace: ''

      factories:
        "#{getFactoryId 'baz'}":
          id: "#{getFactoryId 'baz'}"
          receiver: 'baz'
          dependencies: ['foo', 'bar']
          procedure: bazInit

        "#{getFactoryId 'bar'}":
          id: "#{getFactoryId 'bar'}"
          receiver: 'bar'
          procedure: barInit

      reactions:
        "#{getReactionId 'bar', ['foo']}":
          id: "#{getReactionId 'bar', ['foo']}"
          receiver: 'bar'
          triggers: ['foo']
          procedure: barReaction

        "#{getReactionId 'baz', ['trigger1', 'trigger2']}":
          id: "#{getReactionId 'baz', ['trigger1', 'trigger2']}"
          receiver: 'baz'
          triggers: ['trigger1', 'trigger2']
          supplements: ['kuku/foo']
          procedure: bazReaction

        "#{getReactionId 'baz', ['kuku/bar']}":
          id: "#{getReactionId 'baz', ['kuku/bar']}"
          receiver: 'baz'
          triggers: ['kuku/bar']
          procedure: bazReaction2


    result = parser.parse spec
    # console.log result.entities
    # console.log result.factories
    # console.log result.reactions

    expect result
      .to.deep.equal expected
