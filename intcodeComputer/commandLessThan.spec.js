const {test} = require('tap')
const lt = require('./commandLessThan.js')

test('commandLessThank position mode, 8 < 8?', t => {
  t.plan(1)

  const memory = [8, 4, 5, 6, 8, 8, 2]
  const instructionPointer = 0
  const param1 = 0
  const param2 = 0

  const actual = lt({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [8, 4, 5, 6, 8, 8, 0],
    instructionPointer: 4
  }

  t.deepEqual(actual, expected)
})

test('commandLessThan position mode, 7 < 8?', t => {
  t.plan(1)

  const memory = [8, 4, 5, 6, 7, 8, 2]
  const instructionPointer = 0
  const param1 = 0
  const param2 = 0

  const actual = lt({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [8, 4, 5, 6, 7, 8, 1],
    instructionPointer: 4
  }

  t.deepEqual(actual, expected)
})

test('commandLessThan parameter mode, 5 < 5?', t => {
  t.plan(1)

  const memory = [8, 5, 5, 4, 2]
  const instructionPointer = 0
  const param1 = 1
  const param2 = 1

  const actual = lt({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [8, 5, 5, 4, 0],
    instructionPointer: 4
  }

  t.deepEqual(actual, expected)
})

test('commandLessThan parameter mode, 4 < 5?', t => {
  t.plan(1)

  const memory = [8, 4, 5, 4, 2]
  const instructionPointer = 0
  const param1 = 1
  const param2 = 1

  const actual = lt({param1, param2, memory, instructionPointer})
  const expected = {
    memory: [8, 4, 5, 4, 1],
    instructionPointer: 4
  }

  t.deepEqual(actual, expected)
})
