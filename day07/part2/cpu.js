const readline = require('readline')
const input = require('./input.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let instructionPointer = 0
let memory = [...input]

const run = async () => {
  const instruction = memory[instructionPointer]
  let opcode
  let param1 = 0
  let param2 = 0
  let param3 = 0

  switch (true) {
    case instruction > 10000:
      param3 = 1
      param2 = instruction - (param3 * 10000) > 1000 ? 1 : 0
      param1 = instruction - (param3 * 10000) - (param2 * 1000) > 100 ? 1 : 0
      opcode = instruction - (param3 * 10000) - (param2 * 1000) - (param1 * 100)
      break
    case instruction > 1000:
      param2 = instruction > 1000 ? 1 : 0
      param1 = instruction - (param2 * 1000) > 100 ? 1 : 0
      opcode = instruction - (param2 * 1000) - (param1 * 100)
      break
    case instruction > 100:
      param1 = instruction > 100 ? 1 : 0
      opcode = instruction - (param1 * 100)
      break
    default:
      opcode = instruction
      break
  }

  switch (opcode) {
    case 1:
      {
        // Add
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        memory[pointerC] = a + b
        instructionPointer += 4
      }
      break
    case 2:
      {
        // multiply
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        memory[pointerC] = a * b
        instructionPointer += 4
      }
      break
    case 3:
      {
        const value = await new Promise(resolve => {
          rl.question('> ', input => {
            if (!/[0-9]+/.test(input.trim())) {
              throw new Error('Intcode computer only accepts numbers')
            }

            resolve(parseInt(input.trim(), 10))
          })
        })

        const pointerA = memory[instructionPointer + 1]

        if (param1 === 1) {
          memory[instructionPointer + 1] = value
        } else {
          memory[pointerA] = value
        }

        instructionPointer += 2
        break
      }
    case 4:
      {
        const pointerA = memory[instructionPointer + 1]
        const value = param1 === 1 ? pointerA : memory[pointerA]
        rl.write(`${value}\n`)
        instructionPointer += 2
        break
      }
    case 5:
      {
       // jump if true
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]

        const isTrue = (param1 === 1 ? pointerA : memory[pointerA]) !== 0
        const next = param2 === 1 ? pointerB : memory[pointerB]

        instructionPointer = isTrue ? next : instructionPointer + 3
      }
      break
    case 6:
      {
        // jump if false
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]

        const isFalse = (param1 === 1 ? pointerA : memory[pointerA]) === 0
        const next = param2 === 1 ? pointerB : memory[pointerB]

        instructionPointer = isFalse ? next : instructionPointer + 3
      }
      break
    case 7:
      {
        // less than
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        memory[pointerC] = (a < b) ? 1 : 0
        instructionPointer += 4
      }
      break
    case 8:
      {
        // equals
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        memory[pointerC] = (a === b) ? 1 : 0
        instructionPointer += 4
      }
      break
    case 99:
      {
        rl.write(`Result: ${memory[0]}\n`)
        rl.close()
        return
      }
    default:
      throw new Error(`Unknown instruction at position ${instructionPointer}`)
  }

  return run()
}

run()
