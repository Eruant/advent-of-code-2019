const fs = require('fs')
const readline = require('readline')

const input = fs.createReadStream('input.txt')

const rl = readline.createInterface({
  input: input,
  crlfDelay: Infinity
})

let part1TotalFuel = 0
let part2TotalFuel = 0

rl.on('line', line => {
  const mass = parseInt(line, 10)
  const fuelToAdd = Math.floor(mass / 3) - 2
  part1TotalFuel += fuelToAdd

  let uncalculatedFuel = fuelToAdd
  let additionalFuel = 0

  while (uncalculatedFuel > 0) {
    const f = Math.floor(uncalculatedFuel / 3) - 2
    if (f > 0) {
      additionalFuel += f
    }
    uncalculatedFuel = f
  }

  part2TotalFuel += fuelToAdd + additionalFuel

  // last line is answer
  console.log(`p1: ${part1TotalFuel}`)
  console.log(`p2: ${part2TotalFuel}`)
})
