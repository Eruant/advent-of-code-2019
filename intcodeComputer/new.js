const readline = require('readline')
const input = require('./input.js')
const commandAdd = require('./commandAdd.js')
const commandMultiply = require('./commandMultiply.js')
const commandJumpIfTrue = require('./commandJumpIfTrue.js')
const commandJumpIfFalse = require('./commandJumpIfFalse.js')
const parseInstruction = require('./parseInstruction.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const run = async (memory, instructionPointer = 0) => {
  const {opcode, param1, param2} = parseInstruction(memory[instructionPointer])

  switch (opcode) {
    case 1:
      {
        const data = commandAdd({param1, param2, memory, instructionPointer})
        return run(data.memory, data.instructionPointer)
      }
    case 2:
      {
        const data = commandMultiply({param1, param2, memory, instructionPointer})
        return run(data.memory, data.instructionPointer)
      }
    case 3:
      {
        const q = new Promise(resolve => {
          rl.question('>>> ', answer => {
            if (!/[0-9]+/.test(answer)) {
              throw new Error('Intcode computer only accepts numbers')
            }

            resolve(parseInt(answer, 10))
          })
        })

        const value = await q
        const pointerA = memory[instructionPointer + 1]

        rl.write(` IN: ${value} -> ${pointerA}\n`)

        // XXX is this needed?
        if (param1 === 1) {
          memory[instructionPointer + 1] = value
        } else {
          memory[pointerA] = value
        }
        return run(memory, instructionPointer + 2)
      }
    case 4:
      {
        const pointerA = memory[instructionPointer + 1]
        // const value = memory[pointerA]
        const value = param1 === 1
          ? pointerA
          : memory[pointerA]

        rl.write(`--------------------\n OUT: ${value}\n--------------------\n`)
        return run(memory, instructionPointer + 2)
      }
    case 5:
      {
        const data = commandJumpIfTrue({param1, param2, memory, instructionPointer})
        return run(data.memory, data.instructionPointer)
      }
    case 6:
      {
        const data = commandJumpIfFalse({param1, param2, memory, instructionPointer})
        return run(data.memory, data.instructionPointer)
      }
    case 7:
      {
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        memory[pointerC] = (a < b) ? 1 : 0
        return run(memory, instructionPointer + 4)
      }
    case 8:
      {
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        memory[pointerC] = (a === b) ? 1 : 0
        return run(memory, instructionPointer + 4)
      }
    case 99:
      // finished
      rl.write(`Finished: ${memory[0]}\n`)
      rl.close()
      return
    default:
      rl.write(`Unknown instruction at position ${instructionPointer}: ${memory[instructionPointer]}\n`)
      rl.close()
      process.exit(1)
  }
}

run(input)
