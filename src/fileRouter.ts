import path from 'path';
import fs from 'fs';
import { Express, Router } from 'express';
import type API from './classes/API';

type structure = { [index: string]: structure[] | string };
type router = { [index: string]: API };

/**
 *
 * @param {string} dir Directory location
 * @returns {structure[]} Builds a structure object which contains file names and directories
 */
function getFDir(dir: string): structure[] {
	if (!fs.existsSync(dir)) return [];

	const files = fs.readdirSync(dir, {
		withFileTypes: true,
		encoding: 'utf8',
	});

	let structure: structure[] = [];
	for (const file of files) {
		if (file.isDirectory()) {
			structure.push({
				[file.name]: getFDir(path.join(dir, file.name)),
			});
		} else {
			structure.push({
				[file.name]: path.join(dir, file.name),
			});
		}
	}

	return structure;
}

/**
 *
 * @param {structure[]} f The file structure created by getFDir
 * @returns {router[]} Array of express routers
 */
async function createRouters(f: structure[], bp: string = '') {
	let routers = new Array<router>();
	await f.forEach(async (file: structure) => {
		const baseRoute = Object.keys(file)[0];
		const modulePath = Object.values(file)[0];

		if (typeof modulePath === 'string')
			routers.push({
				[bp + '/' + baseRoute.split('.')[0]]: await import(modulePath),
			});
		else
			routers.push(
				...(await createRouters(
					modulePath,
					'/' + baseRoute.split('.')[0]
				))
			);
	});

	return routers;
}

enum RT {
	get = 'get',
	head = 'head',
	post = 'post',
	put = 'put',
	delete = 'delete',
	connect = 'connect',
	options = 'options',
	trace = 'trace',
	patch = 'patch',
	use = 'use',
}

function applyRouters(app: Express, r: router[]) {
	r.forEach((router) => {
		const path = Object.keys(router)[0];
		const mod = Object.values(router)[0];
		const r = Router();
		mod.handlers.forEach((handler) => {
			r[handler.type as RT](handler.path, handler.fn);
		});
		app.use(path, r);
	});
}

export { getFDir, createRouters, applyRouters };
