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
	size?: number | undefined;
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
				//else console.log('error, cannot cd into file');
			}
			// change directory tp args[0]
			break;
		case 'ls':
			break;
	}
};

consoleLines.forEach((line: string) => {
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
});

const getDirSize = (dir: Directory) => {
	let totalSize = 0;
	dir.contents.forEach((item) => {
		if (item.type === 'file') {
			totalSize += item.size;
		} else if (item.type === 'dir') {
			totalSize += getDirSize(item);
		}
	});
	dir.size = totalSize;
	return totalSize;
};
getDirSize(root);

const CAPACITY = 70_000_000;
const SPACE_REQUIRED = 30_000_000;
const AVAILABLE_SPACE = CAPACITY - root.size;
const SPACE_TO_FREE = SPACE_REQUIRED - AVAILABLE_SPACE;

const getDirToDelete = (dir: Directory) => {
	const dirs = [...dir.contents]
		.map(([, item]) => item)
		.filter((item) => item.type === 'dir') as Directory[];
	const dirToDel = dirs.reduce((deleteDir, item) => {
		const checkDir = getDirToDelete(item);
		if (checkDir.size < deleteDir.size && checkDir.size >= SPACE_TO_FREE) {
			return item;
		}
		return deleteDir;
	}, dir);
	return dirToDel;
};

const getDirs = (dir: Directory): Directory[] => {
	const dirs = [...dir.contents]
		.map(([, item]) => item)
		.filter((item) => item.type === 'dir') as Directory[];
	if (dirs.length === 0) return [dir];
	const fullDirs = dirs.map((checkDir) => getDirs(checkDir)).flat();
	return [dir, ...fullDirs];
};

const dirToDel = getDirs(root)
	.sort((a, b) => a.size - b.size)
	.map((d) => d.size)
	.filter((d) => d >= SPACE_TO_FREE);
console.log(dirToDel);
//console.log(dirToDel.size);
//console.log(dirToDel.name);

const createLogger = () => {
	const logStrings: string[] = [];
	const writeLog = (str: string, depth: number) => {
		logStrings.push(' '.repeat(depth) + str);
		//console.log(' '.repeat(depth) + str);
	};
	const getLog = () => logStrings;
	return { writeLog, getLog };
};
const { writeLog, getLog } = createLogger();

const printDir = (dir: Directory, depth = 0) => {
	writeLog(`- ${dir.name} (dir, size=${dir.size}):`, depth);
	depth += 2;
	[...dir.contents].map(([_, value]) => {
		if (value.type === 'file')
			writeLog(`- ${value.name} (file, size=${value.size})`, depth);
		else if (value.type === 'dir') printDir(value, depth);
	});
	return getLog();
};

//printDir(root);
const finalLog = printDir(root);
//console.log('dir structure:');
finalLog.forEach((str) => {
	//console.log(str);
});

console.timeEnd();
