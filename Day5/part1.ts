import { readFile } from 'fs/promises';

const startTime = Date.now();

const fileData = await readFile('Day5/input.txt', 'utf8');

const [cratesRaw, instructionsRaw] = fileData
	.split('\n\n')
	.map((str) => str.split('\n').filter((str) => str !== ''));

const crates = cratesRaw.reverse().reduce((accum, str, rowIndex) => {
	const row = str
		.match(/.{1,4}/g)
		.map((str) => str.trim().replaceAll(/[\[\]]/g, ''));

	row.map((el, colIndex) => {
		if (rowIndex === 0) accum.push([]);
		//console.log(colIndex);
		else if (el) accum[colIndex].push(el);
	});
	return accum;
}, [] as string[][]);

instructionsRaw.forEach((instruction) => {
	const [, moveAmt, , fromIndexP1, , toIndexP1] = instruction
		.split(' ')
		.map((str) => +str);
	const fromIndex = fromIndexP1 - 1;
	const toIndex = toIndexP1 - 1;

	for (let i = 0; i < moveAmt; i++) {
		const movingCrate = crates.at(fromIndex).pop();
		if (movingCrate) crates.at(toIndex).push(movingCrate);
	}
});

const topCrates = crates.map((crate) => crate.at(-1));
console.log(topCrates.join(''));

const endTime = Date.now();
console.log('Time passed: ', endTime - startTime);
