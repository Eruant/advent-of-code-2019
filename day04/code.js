const getNumbersInRange = ([lowest, highest]) => {
  const passwords = new Set()

  for (let i = 0; i <= highest; i++) {
    let chars = Array.from({length: 6}, _ => i)
    let pointer = 5

    while (pointer > 0) {
      passwords.add(chars.join(''))

      if (chars[pointer] + 1 <= highest) {
        chars[pointer] = chars[pointer] + 1
      } else {
        pointer--

        if (chars[pointer] + 1 <= highest) {
          chars[pointer] = chars[pointer] + 1
          const lowestSoFar = chars[pointer]
          let offset = 1

          while (pointer + offset < 6) {
            chars[pointer + offset] = lowestSoFar
            offset++
          }
          pointer = 5
        }
      }
    }
  }

  return passwords
}

const getRange = (set, min, max) => {
  const result = new Set()

  for (const [entry] of set.entries()) {
    const number = parseInt(entry, 10)
    if (number >= min && number <= max) {
      result.add(entry)
    }
  }

  return result
}

const getValidPasswords = passwords => {
  const reduced = new Set()

  for (const [entry] of passwords.entries()) {
    let pointer = 0

    while (pointer < entry.length - 1) {
      if (entry[pointer] === entry[pointer + 1]) {
        reduced.add(entry)
      }
      pointer++
    }
  }

  return reduced
}

const removeTripples = passwords => {
  const results = new Set()

  for (const [entry] of passwords.entries()) {
    if (/(?:^|(.)(?!\1))(\d)\2(?!\2)/.test(entry)) {
      results.add(entry)
    }
  }

  return results
}

const getNumberOfPasswords = passwords => passwords.size

const rawPasswords = getNumbersInRange([0, 9])
const rangedPasswords = getRange(rawPasswords, 138307, 654504)
const validPasswords = getValidPasswords(rangedPasswords)
const part1 = getNumberOfPasswords(validPasswords)

const part2 = getNumberOfPasswords(removeTripples(validPasswords))
console.log({part1, part2})
