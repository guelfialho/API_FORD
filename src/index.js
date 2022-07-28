require('dotenv').config({ path: 'config.env' });

const connection = require('./infra/connection');
const Tables = require('./infra/tables');
const app = require('./server');

connection.connect((erro) => {
	if (erro) {
		console.log(erro);
	} else {
		console.log(`Conectado ao banco ${process.env.DB_NAME}`);
		Tables.init(connection);

		app.listen(process.env.PORT, () => {
			console.log(
				`Servidor rodando em: http://localhost:${process.env.PORT}`
			);
		});
	}
});

module.exports = app;
