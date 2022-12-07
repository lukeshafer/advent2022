import { readFile } from 'fs/promises';
const startTime = Date.now();
const fileData = await readFile('Day6/input.txt', 'utf8');

const MARKERLEN = 14;
let marker = '';
let count = 0;
for (let i of fileData) {
	count++;
	const index = marker.indexOf(i);
	marker = marker.slice(index + 1) + i;

	if (marker.length === MARKERLEN) break;
}
console.log(count);

const endTime = Date.now();
console.log('Time passed: ', endTime - startTime);
