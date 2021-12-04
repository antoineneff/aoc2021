import { readFile } from 'fs/promises'

async function part1() {
  const content = await readFile('./inputs/03.txt')
  const numbers = content.toString().split('\n')

  let counts = null

  for (const number of numbers) {
    const bits = number.split('').map(bit => Number(bit))
    if (!counts) {
      counts = bits.map(bit => [0, 0])
    }
    for (let i = 0; i < bits.length; i += 1) {
      counts[i][bits[i]] += 1
    }
  }

  let gamma = parseInt(counts.map(count => count[0] > count[1] ? 0 : 1).join(''), 2)
  let epsilon = parseInt(counts.map(count => count[0] > count[1] ? 1 : 0).join(''), 2)

  return gamma * epsilon
}
