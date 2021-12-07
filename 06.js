const initial = [5,1,5,3,2,2,3,1,1,4,2,4,1,2,1,4,1,1,5,3,5,1,5,3,1,2,4,4,1,1,3,1,1,3,1,1,5,1,5,4,5,4,5,1,3,2,4,3,5,3,5,4,3,1,4,3,1,1,1,4,5,1,1,1,2,1,2,1,1,4,1,4,1,1,3,3,2,2,4,2,1,1,5,3,1,3,1,1,4,3,3,3,1,5,2,3,1,3,1,5,2,2,1,2,1,1,1,3,4,1,1,1,5,4,1,1,1,4,4,2,1,5,4,3,1,2,5,1,1,1,1,2,1,5,5,1,1,1,1,3,1,4,1,3,1,5,1,1,1,5,5,1,4,5,4,5,4,3,3,1,3,1,1,5,5,5,5,1,2,5,4,1,1,1,2,2,1,3,1,1,2,4,2,2,2,1,1,2,2,1,5,2,1,1,2,1,3,1,3,2,2,4,3,1,2,4,5,2,1,4,5,4,2,1,1,1,5,4,1,1,4,1,4,3,1,2,5,2,4,1,1,5,1,5,4,1,1,4,1,1,5,5,1,5,4,2,5,2,5,4,1,1,4,1,2,4,1,2,2,2,1,1,1,5,5,1,2,5,1,3,4,1,1,1,1,5,3,4,1,1,2,1,1,3,5,5,2,3,5,1,1,1,5,4,3,4,2,2,1,3]

function part1() {
  const state = [...initial]
  const days = 80
  let babies = []
  for (let i = 0; i < days; i++) {
    for (let j = 0; j < state.length; j++) {
      if (state[j] === 0) {
        babies.push(8)
        state[j] = 6
      } else {
        state[j] -= 1
      }
    }
    state.push(...babies)
    babies = []
  }

  return state.length
}

function updateState(state) {
  const zeros = state[0]
  for (let i = 0; i < 8; i++) {
    state[i] = state[i + 1]
  }
  state[6] += zeros
  state[8] = zeros
}

function part2() {
  let state = initial.reduce((prev, curr) => {
    prev[curr] += 1
    return prev
  }, [0, 0, 0, 0, 0, 0, 0, 0, 0])

  const days = 256
  for (let i = 0; i < days; i++) {
    updateState(state)
  }

  const sum = state.reduce((prev, curr) => prev + curr)
  return sum
}
