// USING .ENV FILE ---------------------------------------
require('dotenv').config({ path: 'config.env' });

// IMPORTS ------------------------------------------------

const customExpress = require('./config/customExpress');
const connection = require('./infra/connection');
const Tabelas = require('./infra/tables');

// CONECTANDO AO BANCO DE DADOS MYSQL -----------------------

connection.connect((error) => {
	if (error) {
		console.log(error);
	} else {
		console.log(`Conectado ao banco de dados ${process.env.DB_NAME}`);

		Tabelas.init(connection);

		const app = customExpress(); // APENAS RODA O SERVIDOR SE ESTIVER CONECTADO AO BANCO DE DADOS.

		app.listen(process.env.PORT, () => {
			console.log(
				`Servidor rodando em: http://localhost:${process.env.PORT}`
			);
		});
	}
});
