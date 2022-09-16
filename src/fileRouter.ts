import path from 'path';
import fs from 'fs';

type structure = { [index: string]: structure[] | string };

function getFDir(dir: string): structure[] {
	const files = fs.readdirSync(dir, {
		withFileTypes: true,
		encoding: 'utf8',
	});

	let structure: structure[] = [];
	for (const file of files) {
		if (file.isDirectory()) {
			structure.push({ [file.name]: getFDir(path.join(dir, file.name)) });
		} else {
			structure.push({
				[file.name]: path.join(dir, file.name),
			});
		}
	}

	return structure;
}

export default getFDir;