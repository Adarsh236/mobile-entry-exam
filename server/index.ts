import express from 'express';
import { json } from 'body-parser';
import routes from './src/routes';
import { PORT } from './src/utils/constants';

const app = express();

app.use(json());

app.use((_, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', '*');
	next();
});

// all routes
app.use(routes());

// 404
app.use(function (req, res) {
	res.status(404).json({
		status: 'Page does not exist',
	});
});

app.listen(PORT);
console.log('Listening on port', PORT);
