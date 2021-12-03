import { readFile } from 'fs/promises'

async function part1() {
  const content = await readFile('./inputs/01.txt')
  const depths = content.toString().split('\n')
  let previous = null
  let total = 0

  for (const depth of depths) {
    const current = Number(depth)
    if (previous !== null && previous < current) {
      total += 1
    }
    previous = current
  }
  return total
}

async function part2() {
  const content = await readFile('./inputs/01.txt')
  const depths = content.toString().split('\n')
  let previous = null
  let total = 0

  for (let i = 0; i < depths.length - 2; i += 1) {
    const current = Number(depths[i]) + Number(depths[i+1]) + Number(depths[i+2])
    if (previous !== null && previous < current) {
      total += 1
    }
    previous = current
  }
  return total
}
