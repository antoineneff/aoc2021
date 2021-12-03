import { readFile } from 'fs/promises'

async function part1() {
  const content = await readFile('./inputs/02.txt')
  const moves = content.toString().split('\n')

  let x = 0
  let y = 0

  for (const move of moves) {
    const [type, length] = move.split(' ')
    if (type === 'down') {
      y += Number(length)
    } else if (type === 'up') {
      y -= Number(length)
    } else if (type === 'forward') {
      x += Number(length)
    }
  }
  return x * y
}

async function part2() {
  const content = await readFile('./inputs/02.txt')
  const moves = content.toString().split('\n')

  let x = 0
  let y = 0
  let aim = 0

  for (const move of moves) {
    const [type, length] = move.split(' ')
    if (type === 'down') {
      aim += Number(length)
    } else if (type === 'up') {
      aim -= Number(length)
    } else if (type === 'forward') {
      x += Number(length)
      y += aim * Number(length)
    }
  }
  return x * y
}
