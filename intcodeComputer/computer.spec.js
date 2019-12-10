const {test} = require('tap')
const computer = require('./computer.js')

test('computer unknown input', t => {
  const cpu = computer([98])

  t.throws(() => {
    cpu.next()
  })

  t.end()
})

test('computer take input', t => {
  const cpu = computer([3, 1, 99])

  t.deepEqual(cpu.next(), {value: [], done: false})
  t.deepEqual(cpu.next(101), {value: 3, done: true})

  t.end()
})

test('computer give output', t => {
  const cpu = computer([4, 5, 4, 6, 99, 1, 2])

  t.deepEqual(cpu.next(), {value: 4, done: true})

  t.end()
})

test('computer send output and request input', t => {
  const cpu = computer([4, 7, 4, 8, 3, 0, 99, 1, 2])

  t.deepEqual(cpu.next(), {value: [1, 2], done: false})
  t.deepEqual(cpu.next(101), {value: 101, done: true})

  t.end()
})
