const {test} = require('tap')
const jump = require('./commandJumpIfFalse.js')

test('jumpIfFalse using position mode and true', t => {
  t.plan(1)

  const memory = [6, 100, 3, 5, 99, 99]
  const instructionPointer = 0
  const param1 = 0
  const param2 = 0

  const actual = jump({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [6, 100, 3, 5, 99, 99],
    instructionPointer: 3
  }

  t.deepEqual(actual, expected)
})

test('jumpIfFalse using position mode and false', t => {
  t.plan(1)

  const memory = [6, 3, 4, 0, 5, 99]
  const instructionPointer = 0
  const param1 = 0
  const param2 = 0

  const actual = jump({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [6, 3, 4, 0, 5, 99],
    instructionPointer: 5
  }

  t.deepEqual(actual, expected)
})

test('jumpIfFalse using parameter mode and true', t => {
  t.plan(1)

  const memory = [6, 1, 0, 99]
  const instructionPointer = 0
  const param1 = 1
  const param2 = 1

  const actual = jump({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [6, 1, 0, 99],
    instructionPointer: 3
  }

  t.deepEqual(actual, expected)
})

test('jumpIfFalse using parameter mode and false', t => {
  t.plan(1)

  const memory = [6, 0, 5, 99]
  const instructionPointer = 0
  const param1 = 1
  const param2 = 1

  const actual = jump({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [6, 0, 5, 99],
    instructionPointer: 5
  }

  t.deepEqual(actual, expected)
})
