import { Request, Response, NextFunction } from 'express';

type Handler = {
	type: string;
	path: string;
	fn: (req: Request, res: Response, next?: NextFunction) => void | any;
};

type HandlerFN = (
	path: string,
	handler: (req: Request, res: Response, next?: NextFunction) => void | any
) => any;

class API {
	handlers: Handler[] = [];

	get: HandlerFN = this.newHandler('get');
	head: HandlerFN = this.newHandler('head');
	post: HandlerFN = this.newHandler('post');
	put: HandlerFN = this.newHandler('put');
	delete: HandlerFN = this.newHandler('delete');
	connect: HandlerFN = this.newHandler('connect');
	options: HandlerFN = this.newHandler('options');
	trace: HandlerFN = this.newHandler('trace');
	patch: HandlerFN = this.newHandler('patch');
	use: HandlerFN = this.newHandler('use');

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

	constructor() {}
}

export type { Handler };
export default API;
