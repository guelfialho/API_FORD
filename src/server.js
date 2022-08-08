const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const app = express();

const corsOptions = {
	exposedHeaders: ['x-access-token'],
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(`/api`, routes);

module.exports = app;
