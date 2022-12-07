import { readFile } from 'fs/promises';

const startTime = Date.now();

const fileData = await readFile('Day4/input.txt', 'utf8');
const inputData = fileData
	.split('\n')
	.filter((str) => str !== '')
	.map((str) =>
		str.split(',').map((str) => str.split('-').map((char) => Number(char)))
	);

const results = inputData.filter(([[startA, endA], [startB, endB]]) => {
	const widthA = endA - startA;
	const widthB = endB - startB;
	const widthDif = Math.abs(widthA - widthB);
	const startDif = Math.abs(startA - startB);
	const endDif = Math.abs(endA - endB);
	const difTotal = startDif + endDif;

	return widthDif === difTotal;
});

console.log(results.length);
const endTime = Date.now();
console.log('Time passed: ', endTime - startTime);
