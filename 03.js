import { readFile } from 'fs/promises'

async function part1() {
  const content = await readFile('./inputs/03.txt')
  const numbers = content.toString().trim().split('\n')

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

function splitNumbers(numbers, index) {
  const counts = [[], []]

  for (const number of numbers) {
    const bit = Number(number[index])
    counts[bit].push(number)
  }

  return counts
}

function oxygenRating(numbers, index) {
  if (numbers.length === 1) {
    return numbers[0]
  }
  const counts = splitNumbers(numbers, index)

  if (counts[0].length > counts[1].length) {
    return oxygenRating(counts[0], index + 1)
  }
  return oxygenRating(counts[1], index + 1)
}

function co2Rating(numbers, index) {
  if (numbers.length === 1) {
    return numbers[0]
  }
  const counts = splitNumbers(numbers, index)

  if (counts[0].length > counts[1].length) {
    return co2Rating(counts[1], index + 1)
  }
  return co2Rating(counts[0], index + 1)
}

async function part2() {
  const content = await readFile('./inputs/03.txt')
  const numbers = content.toString().trim().split('\n')

  const oxygen = parseInt(oxygenRating(numbers, 0), 2)
  const co2 = parseInt(co2Rating(numbers, 0), 2)

  return oxygen * co2
}
