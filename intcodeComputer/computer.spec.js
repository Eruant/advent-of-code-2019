const {test} = require('tap')
const computer = require('./computer.js')

test('computer unknown input', t => {
  const cpu = computer([98])

  t.throws(() => {
    cpu.step()
  })

  t.end()
})

test('computer take input', t => {
  const cpu = computer([3, 1, 99])

  cpu.setInput(101)
  t.deepEqual(cpu.step(), 3)

  t.end()
})

test('computer take multiple inputs', t => {
  const cpu = computer([3, 1, 104, 33, 3, 0, 99])

  cpu.setInput('a')
  t.deepEqual(cpu.step(), false)
  t.deepEqual(cpu.getOutput(), 33)
  t.strictDeepEqual(cpu.getOutput(), null)

  cpu.setInput(88)
  t.deepEqual(cpu.step(), 88)

  t.end()
})

test('computer give output', t => {
  const cpu = computer([4, 5, 4, 6, 99, 1, 2])

  t.deepEqual(cpu.step(), 4)

  t.end()
})

test('computer send output and request input', t => {
  const cpu = computer([4, 7, 4, 8, 3, 0, 99, 1, 2])

  t.deepEqual(cpu.step(), false)
  t.deepEqual(cpu.getOutput(), 1)
  t.deepEqual(cpu.getOutput(), 2)

  cpu.setInput(101)
  t.deepEqual(cpu.step(), 101)

  t.end()
})
