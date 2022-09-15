import express, { Express } from 'express';

const app: Express = express();

console.log(__dirname)

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server listening on port: ${process.env.PORT || 3000}`);
});
