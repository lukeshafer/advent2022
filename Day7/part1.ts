import { readFile } from 'fs/promises';
console.time();
const fileData = await readFile('Day7/input.txt', 'utf8');
const consoleLines = fileData.split('\n').filter((str) => str !== '');

// parse the file tree

interface File {
	name: string;
	type: 'file';
	size: number;
}

interface Directory {
	name: string;
	type: 'dir';
	contents: Map<string, Directory | File>;
	parent?: Directory | undefined;
}

const root: Directory = {
	name: '/',
	type: 'dir',
	contents: new Map(),
};

let currentDir: Directory = root;

const handleCmd = (cmd: string, args: string[]) => {
	switch (cmd) {
		case 'cd':
			const dirName = args[0];
			if (dirName === '..') currentDir = currentDir.parent ?? currentDir;
			else if (dirName === '/') currentDir = root;
			else {
				const newDir = currentDir.contents.get(dirName);
				if (newDir.type === 'dir') currentDir = newDir;
				else console.log('error, cannot cd into file');
			}
			// change directory tp args[0]
			break;
		case 'ls':
			break;
	}
};

const parseLine = (line: string) => {
	const words = line.split(' ');
	//console.log(words);

	if (words[0] === '$') {
		// handle command
		const [, cmd, ...args] = words;
		handleCmd(cmd, args);
	} else if (words[0] === 'dir') {
		// add dir to fs
		const dirName = words[1];
		currentDir.contents.set(dirName, {
			name: dirName,
			type: 'dir',
			contents: new Map(),
			parent: currentDir,
		});
	} else if (Number(words[0]) !== NaN && words[0]) {
		// add file to fs
		const fileName = words[1];
		const fileSize = Number(words[0]);
		currentDir.contents.set(fileName, {
			name: fileName,
			type: 'file',
			size: fileSize,
		});
	}
};

consoleLines.forEach(parseLine);

const printDir = (dir: Directory, depth = 0) => {
	const log = (str: string) => console.log(' '.repeat(depth) + str);
	log(`- ${dir.name} (dir):`);
	depth += 2;
	[...dir.contents].map(([_, value]) => {
		if (value.type === 'file')
			log(`- ${value.name} (file, size=${value.size})`);
		else if (value.type === 'dir') printDir(value, depth);
	});
};

printDir(root);

let MAX_SIZE = 100000;
let totalOfDirsToSum = 0;

const getDirSize = (dir: Directory) => {
	let totalSize = 0;
	dir.contents.forEach((val) => {
		if (val.type === 'file') {
			totalSize += val.size;
		} else if (val.type === 'dir') {
			totalSize += getDirSize(val);
		}
	});

	if (totalSize <= MAX_SIZE) {
		console.log(dir.name, totalSize);
		totalOfDirsToSum += totalSize;
	}
	return totalSize;
};

getDirSize(root);
console.log(totalOfDirsToSum);

console.timeEnd('day 7, pt1');
