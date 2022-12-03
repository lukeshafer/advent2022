import { readFile } from 'fs/promises';

const fileData = await readFile('Day2/input.txt', 'utf8');

type OpponentChoice = 'A' | 'B' | 'C';
type PlayerChoice = 'X' | 'Y' | 'Z';
const input = fileData
	.split('\n')
	.map((str) => str.split(' '))
	.filter((arr) => arr.length > 1) as [[OpponentChoice, PlayerChoice]];

enum RPS {
	ROCK = 1,
	PAPER = 2,
	SCISSORS = 3,
}

const opponent = {
	A: RPS.ROCK,
	B: RPS.PAPER,
	C: RPS.SCISSORS,
};

const player = {
	X: RPS.ROCK,
	Y: RPS.PAPER,
	Z: RPS.SCISSORS,
};

const total = input.reduce((total, [o, p]) => {
	const oppChoice = opponent[o];
	const playChoice = player[p];
	const score = ((playChoice - oppChoice + 4) % 3) * 3 + playChoice;
	return score + total;
}, 0);

console.log(total);
