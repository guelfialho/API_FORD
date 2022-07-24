db = require('../infra/connection');

module.exports = {
	getUsers: () => {
		return new Promise((aceito, rejeitado) => {
			db.query('SELECT * FROM user', (error, results) => {
				if (error) {
					rejeitado(error);
					return;
				}
				aceito(results);
			});
		});
	},
};
