const {test} = require('tap')
const parseInstruction = require('./parseInstruction.js')

test('only opcode', t => {
  t.plan(1)

  const actual = parseInstruction(1)
  const expected = {
    opcode: 1,
    param1: 0,
    param2: 0
  }

  t.strictDeepEqual(actual, expected)
})

test('position mode', t => {
  t.plan(1)

  const actual = parseInstruction(1102)
  const expected = {
    opcode: 2,
    param1: 1,
    param2: 1
  }

  t.strictDeepEqual(actual, expected)
})

test('parameter modes', t => {
  t.plan(1)

  const actual = parseInstruction(10003)
  const expected = {
    opcode: 3,
    param1: 0,
    param2: 0
  }

  t.strictDeepEqual(actual, expected)
})

test('mixed modes', t => {
  t.plan(1)

  const actual = parseInstruction(1099)
  const expected = {
    opcode: 99,
    param1: 0,
    param2: 1
  }

  t.strictDeepEqual(actual, expected)
})
