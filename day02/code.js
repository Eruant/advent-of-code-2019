const input = [1, 0, 0, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 10, 1, 19, 1, 5, 19, 23, 1, 23, 5, 27, 1, 27, 13, 31, 1, 31, 5, 35, 1, 9, 35, 39, 2, 13, 39, 43, 1, 43, 10, 47, 1, 47, 13, 51, 2, 10, 51, 55, 1, 55, 5, 59, 1, 59, 5, 63, 1, 63, 13, 67, 1, 13, 67, 71, 1, 71, 10, 75, 1, 6, 75, 79, 1, 6, 79, 83, 2, 10, 83, 87, 1, 87, 5, 91, 1, 5, 91, 95, 2, 95, 10, 99, 1, 9, 99, 103, 1, 103, 13, 107, 2, 10, 107, 111, 2, 13, 111, 115, 1, 6, 115, 119, 1, 119, 10, 123, 2, 9, 123, 127, 2, 127, 9, 131, 1, 131, 10, 135, 1, 135, 2, 139, 1, 10, 139, 0, 99, 2, 0, 14, 0]

const run = (memory, instructionPointer = 0) => {
  const opcode = memory[instructionPointer]

  switch (opcode) {
    case 1:
      {
        // add
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]
        memory[pointerC] = memory[pointerA] + memory[pointerB]
        return run(memory, instructionPointer + 4)
      }
    case 2:
      {
        // multiply
        const pointerA = memory[instructionPointer + 1]
        const pointerB = memory[instructionPointer + 2]
        const pointerC = memory[instructionPointer + 3]
        memory[pointerC] = memory[pointerA] * memory[pointerB]
        return run(memory, instructionPointer + 4)
      }
    case 99:
      // finished
      return memory[0]
  }
}

let input1 = [...input]
input1[1] = 12  // noun
input1[2] = 2   // verb

const part1 = run(input1) // 3562624

let part2 = false

let noun = 0
let verb = 0
while (!part2 && noun <= 99 && verb <= 99) {
  const program = [...input]
  program[1] = noun
  program[2] = verb

  const result = run(program)

  if (result === 19690720) {
    part2 = 100 * noun + verb // 8298
    break
  }

  if (noun < 99) {
    noun++
  } else {
    noun = 0
    verb++
  }
}

console.log({part1, part2})
