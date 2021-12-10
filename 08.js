import { readFile } from 'fs/promises'

async function part1() {
  const data = await readFile('./inputs/08.txt')
  const formatted = data.toString().trim().split('\n').map(line => line.split(' | '))

  const result = formatted.reduce((prev, [_, curr]) => {
    return prev + curr.split(' ').filter(code => [2, 3, 4, 7].includes(code.length)).length
  }, 0)
  return result
}
