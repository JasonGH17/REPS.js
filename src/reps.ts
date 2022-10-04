import express, { Express, Router } from 'express';
import getStartDir from './helpers/getStartDir';
import { applyRouters, createRouters, getFDir } from './fileRouter';
import path from 'path';

const app: Express = express();

const files = getFDir(path.join(getStartDir(), 'src/api'));
createRouters(files, '').then((routers) => {
	applyRouters(app, routers);
	app.listen(process.env.PORT || 3000, () => {
		console.log(`Server listening on port: ${process.env.PORT || 3000}`);
	});
});
