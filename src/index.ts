import express, { Express } from 'express';
import getStartDir from './helpers/getStartDir';
import getFDir from './fileRouter';
import path from 'path';

const app: Express = express();

console.log(getFDir(path.join(getStartDir(), 'src')));

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});
