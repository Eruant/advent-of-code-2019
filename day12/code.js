const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const input = `<x=-7, y=-1, z=6>
<x=6, y=-9, z=-9>
<x=-12, y=2, z=-7>
<x=4, y=-17, z=-12>`

const pipe = (...fns) => x => fns.reduce((result, fn) => fn(result), x)

const parseInput = input =>
  input
    .split('\n')
    .map(
      line =>
        line
          .replace(/[<>\s]/g, '')
          .split(',')
          .map(value => value.split('='))
          .reduce((result, [key, value]) => {
            result.position[key] = parseInt(value, 10)
            return result
          }, {position: {}, velocity: {x: 0, y: 0, z: 0}})
    )

const applyGravity = moons => {
  const next = []

  moons.forEach(a => {
    const moon = {...a}

    moons.forEach(b => {
      ;['x', 'y', 'z'].forEach(key => {
        if (a.position[key] < b.position[key]) {
          moon.velocity[key] += 1
        } else if (a.position[key] > b.position[key]) {
          moon.velocity[key] -= 1
        }
      })
    })

    next.push(moon)
  })

  return next
}

const applyVelocity = moons => moons.map(moon => {
  ;['x', 'y', 'z'].forEach(key => {
    moon.position[key] += moon.velocity[key]
  })

  return moon
})

const step = pipe(applyGravity, applyVelocity)

const calculateEnergy = moons =>
  moons.reduce(
    (result, current) =>
      result + ['position', 'velocity'].reduce(
        (total, type) =>
          total * ['x', 'y', 'z'].reduce(
            (acc, key) =>
              acc + Math.abs(current[type][key]),
            0
          ),
        1),
    0)

// --- part 1 --------------------

let state = pipe(parseInput)(input)

for (let i = 1; i < 1001; i++) {
  state = step(state)
}

rl.write(`Energy for part1: ${calculateEnergy(state)}\n`)

// --- part 2 --------------------

const isSame = a =>
  a[0].velocity.x === 0 && a[0].velocity.y === 0 && a[0].velocity.z === 0 &&
  a[1].velocity.x === 0 && a[1].velocity.y === 0 && a[1].velocity.z === 0 &&
  a[2].velocity.x === 0 && a[2].velocity.y === 0 && a[2].velocity.z === 0 &&
  a[3].velocity.x === 0 && a[3].velocity.y === 0 && a[3].velocity.z === 0

let state2 = pipe(parseInput)(input)

let loop = 0

state2 = step(state2)
while (!isSame(state2)) {
  loop++
  state2 = step(state2)
  readline.cursorTo(rl, 0)
  rl.write(`count: ${loop}`)
}

rl.write(`\nNumber of steps for part 2: ${loop * 2}\n`)

rl.close()
