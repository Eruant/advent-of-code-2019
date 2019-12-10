const {test} = require('tap')
const multiply = require('./commandMultiply.js')

test('multiply using position mode', t => {
  t.plan(1)

  const memory = [1, 5, 6, 7, 99, 3, 2, 0]
  const instructionPointer = 0
  const param1 = 0
  const param2 = 0

  const actual = multiply({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [1, 5, 6, 7, 99, 3, 2, 6],
    instructionPointer: 4
  }

  t.deepEqual(actual, expected)
})

test('multiply using parameter mode', t => {
  t.plan(1)

  const memory = [1, 3, 2, 5, 99, 0]
  const instructionPointer = 0
  const param1 = 1
  const param2 = 1

  const actual = multiply({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [1, 3, 2, 5, 99, 6],
    instructionPointer: 4
  }

  t.deepEqual(actual, expected)
})
