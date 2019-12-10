const commandJumpIfFalse = ({param1, param2, memory, instructionPointer}) => {
  const pointerA = memory[instructionPointer + 1]
  const pointerB = memory[instructionPointer + 2]

  const isFalse = (param1 === 1 ? pointerA : memory[pointerA]) === 0
  const next = param2 === 1 ? pointerB : memory[pointerB]

  return {
    memory,
    instructionPointer: isFalse ? next : instructionPointer + 3
  }
}

module.exports = commandJumpIfFalse
