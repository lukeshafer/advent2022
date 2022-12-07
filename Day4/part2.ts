import { readFile } from 'fs/promises';

const startTime = Date.now();

const fileData = await readFile('Day4/input.txt', 'utf8');
const inputData = fileData
	.split('\n')
	.filter((str) => str !== '')
	.map((str) =>
		str.split(',').map((str) => str.split('-').map((char) => Number(char)))
	);

const results = inputData.filter(([[startA, endA], [startB, endB]], index) => {
	const widthA = endA - startA;
	const widthB = endB - startB;
	const widthTotal = widthA + widthB;
	const endDif = Math.abs(endA - endB);
	const startDif = Math.abs(startA - startB);
	const difTotal = startDif + endDif;

	//console.log(index);
	//console.log({ widthA, widthB, startDif, endDif }, '\n');
	const result = widthTotal >= difTotal;
	//console.log(result);
	return result;
});

console.log(results.length);
const endTime = Date.now();
console.log('Time passed: ', endTime - startTime);
