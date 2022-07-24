// USING .ENV FILE ---------------------------------------

require('dotenv').config({ path: 'config.env' });

// IMPORTS ------------------------------------------------

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const connection = require('./infra/connection');
const Tabelas = require('./infra/tables');
// CONECTANDO AO BANCO DE DADOS MYSQL -----------------------

connection.connect((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`);

		Tabelas.init(connection);

		// APENAS RODA O SERVIDOR SE ESTIVER CONECTADO AO BANCO DE DADOS.

		const server = express();

		server.use(cors());
		server.use(bodyParser.json());

		server.use(`/api`, routes); // TODA ROTA TEM /api/ NA FRENTE

		server.listen(process.env.PORT, () => {
			console.log(
				`Servidor rodando em: http://localhost:${process.env.PORT}`
			);
		});
	}
});
