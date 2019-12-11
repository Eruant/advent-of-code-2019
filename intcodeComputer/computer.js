const commandAdd = require('./commandAdd.js')
const commandMultiply = require('./commandMultiply.js')
const commandJumpIfTrue = require('./commandJumpIfTrue.js')
const commandJumpIfFalse = require('./commandJumpIfFalse.js')
const commandLessThan = require('./commandLessThan.js')
const commandEquals = require('./commandEquals.js')
const parseInstruction = require('./parseInstruction.js')

// TODO figure out a better way of getting values in and out of computer

function computer (memory, name = 'default') {
  let instructionPointer = 0
  const state = {
    input: [],
    output: []
  }

  function run () {
    const {opcode, param1, param2} = parseInstruction(memory[instructionPointer])
    console.log('run', opcode)

    switch (opcode) {
      case 1: return commandAdd({param1, param2, memory, instructionPointer})
      case 2: return commandMultiply({param1, param2, memory, instructionPointer})
      case 3:
        {
          const input = state.input.shift()
          if (!input) {
            throw new Error(`Could not read input for ${name} cpu`)
          }

          state.output = []

          const pointerA = memory[instructionPointer + 1]

          if (param1 === 1) {
            memory[instructionPointer + 1] = input
          } else {
            memory[pointerA] = input
          }

          instructionPointer += 2

          return {memory, instructionPointer}
        }
      case 4:
        {
          const pointerA = memory[instructionPointer + 1]
          const value = param1 === 1 ? pointerA : memory[pointerA]

          state.output.push(value)
          console.log(`>>> ${value} added to output: ${state.output.join(',')} <<<`)

          instructionPointer += 2
          return {memory, instructionPointer}
        }
      case 5: return commandJumpIfTrue({param1, param2, memory, instructionPointer})
      case 6: return commandJumpIfFalse({param1, param2, memory, instructionPointer})
      case 7: return commandLessThan({param1, param2, memory, instructionPointer})
      case 8: return commandEquals({param1, param2, memory, instructionPointer})
      case 99: return memory[0]
      default:
        throw new Error(`Unknown instruction at position ${instructionPointer}`)
    }
  }

  let paused = false

  return {
    getOutput: () => state.output.shift() || null,
    setInput: value => state.input.push(value),
    step: () => {
      paused = false
      console.log(state.input)

      while (!paused) {
        const {opcode} = parseInstruction(memory[instructionPointer])

        if (opcode === 3 && !state.input.length) {
          paused = true
          console.log('pausing to wait for input')
          continue
        }

        const result = run()
        console.log('RESULT', result)

        if (typeof result === 'number') {
          return result
        }

        memory = result.memory
        instructionPointer = result.instructionPointer
      }

      return false
    }
  }
}

module.exports = computer
