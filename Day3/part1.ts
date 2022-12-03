import { readFile } from 'fs/promises';

const fileData = await readFile('Day3/input.sample.txt', 'utf8');

const input = fileData
	.split('\n')
	.filter((str) => str.length > 0)
	.map((str) => [str.substring(0, str.length / 2), str.substring(str.length / 2, str.length)])

const getCharPriority = (char: string) => {
	const code = char.charCodeAt(0);
	if (code < 97) return code - 65 + 27
	return code - 96
}

const score = input.reduce((total, [c1, c2], index) => {
	const mistakes = new Set<string>()
	for (let i of c1) {
		if ( c2.includes(i) ) mistakes.add(i)
	}
	const priority = [ ...mistakes ].reduce((total,char) => total + getCharPriority(char), 0)
	console.log(priority)
	return total + priority
}, 0)

console.log(score)
