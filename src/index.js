import './infra/config.js';
import app from './server.js';
import connection from './infra/connection.js';
import Tables from './infra/tables.js';

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

export default app;
