const input = require('./input.js')

const parseInput = input => input.split('\n').map(line => line.split(')'))

const node = (parent, id) => {
  return {parent, id}
}

const buildTree = inputs => {
  const map = new Map()

  inputs.forEach(([parentId, id]) => {
    let p = map.get(parentId)

    if (!p) {
      p = node(null, parentId)
      map.set(parentId, p)
    }

    const c = node(parentId, id)
    map.set(id, c)
  })

  return map
}

const countLinks = map => {
  let total = 0
  const i = map.values()
  let current = i.next()

  while (!current.done) {
    let childTotal = 0
    let n = current.value

    while (n.parent !== null) {
      childTotal++
      n = map.get(n.parent)
    }

    current = i.next()
    total += childTotal
  }

  return total
}

const findCommonPoint = (map, a, b) => {
  const aPoints = []
  const bPoints = []

  let current = map.get(a)

  while (current.parent) {
    aPoints.push(current.parent)
    current = map.get(current.parent)
  }

  current = map.get(b)

  while (current.parent) {
    bPoints.push(current.parent)
    current = map.get(current.parent)
  }

  let commonRoute = aPoints.reduce(
    (result, current) => {
      if (!bPoints.includes(current)) {
        result.points.push(current)
      } else if (!result.foundCommon) {
        result.points.push(current)
        result.foundCommon = true
      }

      return result
    },
    {
      points: [],
      foundCommon: false
    }
  ).points

  for (let i = 0; i < bPoints.length; i++) {
    const p = bPoints[i]

    if (!commonRoute.includes(p)) {
      commonRoute.push(p)
    } else {
      return commonRoute // found common route so return
    }
  }

  return [] // we should not arrive here
}

const i = parseInput(input)
const tree = buildTree(i)
const part1 = countLinks(tree)

const commonRoute = findCommonPoint(tree, 'YOU', 'SAN')
const part2 = commonRoute.length - 1

console.log({part1, part2})
