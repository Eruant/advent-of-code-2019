const commandAdd = require('./commandAdd.js')
const commandMultiply = require('./commandMultiply.js')
const commandJumpIfTrue = require('./commandJumpIfTrue.js')
const commandJumpIfFalse = require('./commandJumpIfFalse.js')
const commandLessThan = require('./commandLessThan.js')
const commandEquals = require('./commandEquals.js')
const parseInstruction = require('./parseInstruction.js')

function * computer (memory) {
  let complete = false
  let instructionPointer = 0
  let output = []
  let requireInput = false
  let result = null

  function run (input) {
    const {opcode, param1, param2} = parseInstruction(memory[instructionPointer])

    switch (opcode) {
      case 1:
        {
          const data = commandAdd({param1, param2, memory, instructionPointer})
          instructionPointer = data.instructionPointer
          memory = data.memory
          return
        }
      case 2:
        {
          const data = commandMultiply({param1, param2, memory, instructionPointer})
          instructionPointer = data.instructionPointer
          memory = data.memory
          return
        }
      case 3:
        {
          if (!input) {
            requireInput = true
            return
          }

          requireInput = false
          output = []
          const pointerA = memory[instructionPointer + 1]

          if (param1 === 1) {
            memory[instructionPointer + 1] = input
          } else {
            memory[pointerA] = input
          }

          instructionPointer += 2

          return
        }
      case 4:
        {
          const pointerA = memory[instructionPointer + 1]
          const value = param1 === 1 ? pointerA : memory[pointerA]

          output.push(value)
          console.log(output)

          instructionPointer += 2
          return
        }
      case 5:
        {
          const data = commandJumpIfTrue({param1, param2, memory, instructionPointer})
          instructionPointer = data.instructionPointer
          memory = data.memory
          return
        }
      case 6:
        {
          const data = commandJumpIfFalse({param1, param2, memory, instructionPointer})
          instructionPointer = data.instructionPointer
          memory = data.memory
          return
        }
      case 7:
        {
          const data = commandLessThan({param1, param2, memory, instructionPointer})
          instructionPointer = data.instructionPointer
          memory = data.memory
          return
        }
      case 8:
        {
          const data = commandEquals({param1, param2, memory, instructionPointer})
          instructionPointer = data.instructionPointer
          memory = data.memory
          return
        }
      case 99:
        complete = true
        return memory[0]
      default:
        throw new Error(`Unknown instruction at position ${instructionPointer}`)
    }
  }

  while (!complete) {
    let input = null

    if (requireInput) {
      console.log('requiring input')
      input = yield output
    }

    result = run(input)
  }

  return result
}

module.exports = computer
