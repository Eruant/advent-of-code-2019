const readline = require('readline')
const input = require('./input.js')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const run = async (memory, instructionPointer = 0) => {
  const [E, D = '0', C = 0, B = 0, A = 0] = (memory[instructionPointer] + '').split('').reverse()
  const opcode = parseInt(D + E, 10)
  const param1 = parseInt(C, 10)
  const param2 = parseInt(B, 10)
  const param3 = parseInt(A, 10)

  switch (opcode) {
    case 1:
      {
        // add
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]

        const a = param1 === 1 ? pointerA : memory[pointerA]
        const b = param2 === 1 ? pointerB : memory[pointerB]

        // write
        rl.write(` ADD: ${memory[instructionPointer + 1]}:${a} ${memory[instructionPointer + 2]}:${b} ${memory[pointerC]}:${a + b} \n`)

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

        // write
        rl.write(` MULTIPLY: ${memory[instructionPointer + 1]}:${a} ${memory[instructionPointer + 2]}:${b} ${a * b} \n`)

        memory[pointerC] = a * b

        return run(memory, instructionPointer + 4)
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
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]

        const isTrue = (param1 === 1 ? pointerA : memory[pointerA]) !== 0
        const next = param2 === 1 ? pointerB : memory[pointerB]

        rl.write(` JUMP-IF-TRUE ${isTrue} ${next}\n`)
        return run(memory, isTrue ? next : instructionPointer + 3)
      }
    case 6:
      {
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]

        const isFalse = (param1 === 1 ? pointerA : memory[pointerA]) === 0
        const next = param2 === 1 ? pointerB : memory[pointerB]

        rl.write(` JUMP-IF-FALSE ${isFalse} ${next}\n`)
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
      // finished
      rl.write(`Finished: ${memory[0]}\n`)
      process.exit()
    default:
      rl.write(`Unknown instruction at position ${instructionPointer}: ${memory[instructionPointer]}\n`)
      rl.close()
      process.exit(1)
  }
}

run(input)
