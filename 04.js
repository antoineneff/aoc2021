import { readFile } from 'fs/promises'

const numbers = [79,9,13,43,53,51,40,47,56,27,0,14,33,60,61,36,72,48,83,42,10,86,41,75,16,80,15,93,95,45,68,96,84,11,85,63,18,31,35,74,71,91,39,88,55,6,21,12,58,29,69,37,44,98,89,78,17,64,59,76,54,30,65,82,28,50,32,77,66,24,1,70,92,23,8,49,38,73,94,26,22,34,97,25,87,19,57,7,2,3,46,67,90,62,20,5,52,99,81,4]

async function inputToObj() {
  const data = await readFile('./inputs/04.txt')
  const boards = data.toString().trim().split('\n\n')

  for (let i = 0; i < boards.length; i++) {
    boards[i] = boards[i].split('\n').map(line => line.trim().split(/\s+/).map(v => Number(v)))
  }
  return boards
}

function markBoards(boards, number) {
  return boards.map(board => board.map(row => row.map(value => value === number ? null : value)))
}

function checkBingo(boards) {
  const completed = []
  for (const [index, board] of boards.entries()) {
    // Check rows
    for (const row of board) {
      if (row.every(value => value === null)) {
        completed.push(index)
        break
      }
    }
    // Check columns
    const columns = board.reduce((prev, curr) => {
      for (let i = 0; i < curr.length; i++) {
        if (!prev[i]) {
          prev[i] = []
        }
        prev[i].push(curr[i])
      }
      return prev
    }, [])
    for (const col of columns) {
      if (col.every(value => value === null)) {
        completed.push(index)
        break
      }
    }
  }
  return [...new Set(completed)]
}

function getSum(board) {
  const leftNumbers = board.reduce((numbers, row) => {
    return numbers.concat(row.filter(value => value !== null))
  }, [])
  const sum = leftNumbers.reduce((sum, value) => sum + value, 0)
  return sum
}

async function part1() {
  let boards = await inputToObj()
  let bingo = []

  for (const number of numbers) {
    // Mark boards with picked number
    boards = markBoards(boards, number)
    // Check boards for bingo
    bingo = checkBingo(boards)
    if (bingo.length > 0) {
      const sum = getSum(boards[bingo[0]])
      return sum * number
    }
  }
}

async function part2() {
  let boards = await inputToObj()
  let bingo = []

  for (const number of numbers) {
    // Mark boards with picked number
    boards = markBoards(boards, number)
    // Check boards for bingo
    bingo = checkBingo(boards)
    if (bingo.length > 0) {
      for (const index of bingo) {
        if (boards.length === 1) {
          const sum = getSum(boards[0])
          return sum * number
        }
        // Remove board and continue
        boards.splice(index, 1)
      }
    }
  }
}

part2()
