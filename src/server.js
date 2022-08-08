import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes.js';

const app = express();
const corsOptions = {
	exposedHeaders: ['x-access-token'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(`/api`, routes);

export default app;
