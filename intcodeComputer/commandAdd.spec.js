const {test} = require('tap')
const add = require('./commandAdd.js')

test('add using position mode', t => {
  t.plan(1)

  const memory = [1, 5, 6, 7, 99, 1, 2, 0]
  const instructionPointer = 0
  const param1 = 0
  const param2 = 0

  const actual = add({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [1, 5, 6, 7, 99, 1, 2, 3],
    instructionPointer: 4
  }

  t.deepEqual(actual, expected)
})

test('add using parameter mode', t => {
  t.plan(1)

  const memory = [1, 1, 2, 5, 99, 0]
  const instructionPointer = 0
  const param1 = 1
  const param2 = 1

  const actual = add({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [1, 1, 2, 5, 99, 3],
    instructionPointer: 4
  }

  t.deepEqual(actual, expected)
})
