require('dotenv').config({ path: 'config.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const server = express();
const connection = require('./infra/connection');
const Tables = require('./infra/tables');

connection.connect((erro) => {
	if (erro) {
		console.log(erro);
	} else {
		console.log(`Conectado ao banco ${process.env.DB_NAME}`);
		Tables.init(connection);

		server.use(cors());
		server.use(cors());
		server.use(bodyParser.json());

		server.use(`/api`, routes);

		server.listen(process.env.PORT, () => {
			console.log(
				`Servidor rodando em: http://localhost:${process.env.PORT}`
			);
		});
	}
});
