const commandJumpIfTrue = ({param1, param2, memory, instructionPointer}) => {
  const pointerA = memory[instructionPointer + 1]
  const pointerB = memory[instructionPointer + 2]

  const isTrue = (param1 === 1 ? pointerA : memory[pointerA]) !== 0
  const next = param2 === 1 ? pointerB : memory[pointerB]

  return {
    memory,
    instructionPointer: isTrue ? next : instructionPointer + 3
  }
}

module.exports = commandJumpIfTrue
