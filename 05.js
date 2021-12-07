import { readFile } from 'fs/promises'

async function part1() {
  const data = await readFile('./inputs/05.txt')
  const coordinates = data.toString().trim().split('\n').map(line => line.split(' -> ').map(coord => coord.split(',').map(v => Number(v))))

  // Create empty "field"
  const field = Array.from({ length: 1000 }).map(row => Array.from({ length: 1000 }).map(cell => 0))

  for (const coordinate of coordinates) {
    if (coordinate[0][0] === coordinate[1][0]) {
      // loop on y
      const x = coordinate[0][0]
      const endpoints = [coordinate[0][1], coordinate[1][1]]
      const start = Math.min(...endpoints)
      const end = Math.max(...endpoints)
      for (let i = start; i <= end; i++) {
        field[i][x] += 1
      }
    } else if (coordinate[0][1] === coordinate[1][1]) {
      // loop on x
      const y = coordinate[0][1]
      const endpoints = [coordinate[0][0], coordinate[1][0]]
      const start = Math.min(...endpoints)
      const end = Math.max(...endpoints)
      for (let i = start; i <= end; i++) {
        field[y][i] += 1
      }
    }
  }
  const flatten = field.flat()
  const overlapPoints = flatten.filter(v => v > 1)

  return overlapPoints.length
}

async function part2() {
  const data = await readFile('./inputs/05.txt')
  const coordinates = data.toString().trim().split('\n').map(line => line.split(' -> ').map(coord => coord.split(',').map(v => Number(v))))

  // Create empty field
  const field = Array.from({ length: 1000 }).map(row => Array.from({ length: 1000 }).map(cell => 0))

  // Loop through coordinates and update field
  for (const coordinate of coordinates) {
    if (coordinate[0][0] === coordinate[1][0]) {
      // loop on y
      const x = coordinate[0][0]
      const endpoints = [coordinate[0][1], coordinate[1][1]]
      const start = Math.min(...endpoints)
      const end = Math.max(...endpoints)
      for (let i = start; i <= end; i++) {
        field[i][x] += 1
      }
    } else if (coordinate[0][1] === coordinate[1][1]) {
      // loop on x
      const y = coordinate[0][1]
      const endpoints = [coordinate[0][0], coordinate[1][0]]
      const start = Math.min(...endpoints)
      const end = Math.max(...endpoints)
      for (let i = start; i <= end; i++) {
        field[y][i] += 1
      }
    } else {
      // loop on both x and y for diagonals
      const [x1, x2] = [coordinate[0][0], coordinate[1][0]]
      const [y1, y2] = [coordinate[0][1], coordinate[1][1]]
      const diff = Math.abs(coordinate[0][0] - coordinate[1][0])
      const xDir = x1 < x2 ? 1 : -1
      const yDir = y1 < y2 ? 1 : -1
      for (let i = 0; i <= diff; i++) {
        field[y1 + i * yDir][x1 + i * xDir] += 1
      }
    }
  }
  const flatten = field.flat()
  const overlapPoints = flatten.filter(v => v > 1)

  return overlapPoints.length
}
