const readline = require('readline')
const input = require('./input.js')
const width = 25
const height = 6

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const getLayerSize = (width, height) => width * height

const getLayers = (input, width, height) => {
  let pointer = 0
  const parts = []
  const size = getLayerSize(width, height)

  while (pointer < input.length) {
    parts.push(input.slice(pointer, pointer + size))
    pointer += size
  }

  return parts
}

const getLayer = symbol => layers => {
  return layers
    .map(
      layer =>
        layer
          .split('')
          .filter(c => c === symbol)
          .reduce(sum => sum + 1, 0)
    )
    .reduce(
      (data, current, index) => {
        if (current < data.lowest) {
          data = {
            index,
            lowest: parseInt(current, 10)
          }
        }

        return data
      },
      {lowest: Infinity, index: 0}
    )
    .index
}

const countInts = str => {
  const map = new Map()

  str
    .split('')
    .forEach(c => {
      const current = map.get(c) || 0
      map.set(c, current + 1)
    })

  return map
}

const getColor = c => {
  switch (c) {
    case '0':
      return 'b'
    case '1':
      return 'w'
    case '2':
      return 't'
    default:
      return null
  }
}

const render = (layers, width) => {
  const pixels = Array.from({length: layers[0].length}, _ => '?')

  layers.forEach(layer => {
    layer.split('').forEach((letter, index) => {
      const current = pixels[index]

      switch (current) {
        case 'b':
          // do nothing
          break
        case 'w':
          // do nothing
          break
        case 't':
          pixels[index] = getColor(letter) || 't'
          break
        case '?':
        default:
          pixels[index] = getColor(letter) || '?'
          break
      }
    })
  })

  pixels.forEach((p, index) => {
    if (index % width === 0) {
      rl.write('\n')
    }
    rl.write(p === 'w' ? 'X' : ' ')
  })

  rl.write('\n')
  rl.close()
}

const layers = getLayers(input, width, height)

const lowestLayerIndex = getLayer('0')(layers)

const data = countInts(layers[lowestLayerIndex])

const part1 = (data.get('1') || 0) * (data.get('2') || 0)

console.log({part1})

render(layers, width)
