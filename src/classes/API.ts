import { Request, Response, NextFunction } from 'express';

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
const rt = Object.keys(RT) as Array<keyof typeof RT>;

type Handler = {
	type: string;
	path: string;
	fn: (req: Request, res: Response, next?: NextFunction) => void | any;
};

class API {
	[property: string]:
		| ((
				path: string,
				handler: (
					req: Request,
					res: Response,
					next?: NextFunction
				) => void | any
		  ) => any)
		| undefined
		| Handler[];
	handlers: Handler[] = [];

	newHandler(type: string) {
		return (
			path: string,
			handler: (
				req: Request,
				res: Response,
				next?: NextFunction
			) => void | any
		) => {
			this.handlers.push({ type: type, fn: handler, path: path });
		};
	}

	constructor() {
		rt.forEach((type) => {
			this[type] = this.newHandler(type);
		});
	}
}

export type { Handler };
export default API;
