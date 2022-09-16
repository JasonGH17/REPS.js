import path from 'path';
import fs from 'fs';

function getStartDir(): string {
	return fs.realpathSync(path.resolve('.'));
}

export default getStartDir;
