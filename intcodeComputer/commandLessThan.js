const commandLessThan = ({param1, param2, memory, instructionPointer}) => {
  const pointerA = memory[instructionPointer + 1]
  const pointerB = memory[instructionPointer + 2]
  const pointerC = memory[instructionPointer + 3]

  const a = param1 === 1 ? pointerA : memory[pointerA]
  const b = param2 === 1 ? pointerB : memory[pointerB]

  memory[pointerC] = (a < b) ? 1 : 0

  return {
    memory,
    instructionPointer: instructionPointer + 4
  }
}

module.exports = commandLessThan
