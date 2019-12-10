const readline = require('readline')
const input = require('./input.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const state = {
  maxThrusterSignal: 0
}

const run = (memory, instructionPointer = 0) => {
  const [E, D = '0', C = 0, B = 0] = (memory[instructionPointer] + '').split('').reverse()
  const opcode = parseInt(D + E, 10)
  const param1 = parseInt(C, 10)
  const param2 = parseInt(B, 10)

  switch (opcode) {
    case 1:
      {
        // add
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        memory[pointerC] = a + b

        return run(memory, instructionPointer + 4)
      }
    case 2:
      {
        // multiply
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        memory[pointerC] = a * b

        return run(memory, instructionPointer + 4)
      }
    case 3:
      {
        const value = state[state.next].shift()
        state.next = state.next === 'sequence' ? 'value' : 'sequence'

        const pointerA = memory[instructionPointer + 1]

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
        const value = param1 === 1
          ? pointerA
          : memory[pointerA]

        state.value.push(value)
        return run(memory, instructionPointer + 2)
      }
    case 5:
      {
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]

        const isTrue = (param1 === 1 ? pointerA : memory[pointerA]) !== 0
        const next = param2 === 1 ? pointerB : memory[pointerB]

        return run(memory, isTrue ? next : instructionPointer + 3)
      }
    case 6:
      {
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]

        const isFalse = (param1 === 1 ? pointerA : memory[pointerA]) === 0
        const next = param2 === 1 ? pointerB : memory[pointerB]

        return run(memory, isFalse ? next : instructionPointer + 3)
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
      if (state.sequence.length === 0) {
        rl.write(`Signal: ${state.value}\n`)

        if (state.maxThrusterSignal < state.value) {
          state.maxThrusterSignal = state.value
        }

        return
      } else {
        return run(memory) // run again
      }
    default:
      rl.write(`Unknown instruction at position ${instructionPointer}: ${memory[instructionPointer]}\n`)
      rl.close()
      process.exit(1)
  }
}

const getMaxState = () => {
  for (let a = 0; a < 5; a++) {
    for (let b = 0; b < 5; b++) {
      if (b !== a) {
        for (let c = 0; c < 5; c++) {
          if (c !== a && c !== b) {
            for (let d = 0; d < 5; d++) {
              if (d !== a && d !== b && d !== c) {
                for (let e = 0; e < 5; e++) {
                  if (e !== a && e !== b && e !== c && e !== d) {
                    state.sequence = [a, b, c, d, e]
                    state.value = [0]
                    state.next = 'sequence'

                    run([...input])
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  rl.write(`MAX THRUSTER SIGNAL: ${state.maxThrusterSignal}\n`)
  rl.close()
  process.exit()
}

getMaxState() // 99376
