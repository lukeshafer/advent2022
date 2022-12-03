import { readFile } from 'fs/promises';

const fileData = await readFile('Day3/input.txt', 'utf8');

const input = fileData
	.split('\n')
	.filter((str) => str.length > 0)
	.reduce((accum, str, index) => {
		if (index % 3 === 0) return [...accum, [str]]
		accum.at(-1).push(str)
		return accum
	}, [] as [string, string, string][])

const getCharPriority = (char: string) => {
	const code = char.charCodeAt(0);
	if (code < 97) return code - 65 + 27
	return code - 96
}

const score = input.reduce((total, [bag1, bag2, bag3]) => {
	let badge: string;
	for (let i of bag1) {
		if (bag2.includes(i) && bag3.includes(i))
			if (badge && i !== badge) throw new Error("Too many badges!!!")
			else badge = i
	}
	if (!badge) throw new Error("No badge found!!!")

	const priority = getCharPriority(badge)
	return total + priority
}, 0)

console.log(score)
