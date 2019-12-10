const parseInstruction = instruction => {
  const [E, D = '0', C = 0, B = 0] = (instruction + '').split('').reverse()
  const opcode = parseInt(D + E, 10)
  const param1 = parseInt(C, 10)
  const param2 = parseInt(B, 10)

  return {
    opcode,
    param1,
    param2
  }
}

module.exports = parseInstruction
