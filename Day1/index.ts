import { readFile } from 'fs/promises'

const fileData = await readFile('Day1/data.txt', 'utf8')
const calInput = fileData.split('\n\n').map((str) => str.split('\n').map((str) => Number(str)))
const sum = (arr: number[]) => arr.reduce((a, b) => a + b)

// PART 1 SOLUTION
const mostCals = calInput.reduce((prev, cur) => (sum(prev) - sum(cur) < 0 ? cur : prev))
console.log(sum(mostCals))

// PART 2 SOLUTION
const topX = (input: number[][], X: number) => {
	const sortCals = input.sort((a, b) => (sum(b) - sum(a)))
	return sortCals.slice(0, X)
}
const result = topX(calInput, 3).map((arr) => sum(arr))
console.log(sum(result))
