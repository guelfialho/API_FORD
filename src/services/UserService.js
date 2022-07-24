db = require('../infra/connection');

module.exports = {
	getUsers: () => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'SELECT id, name, email, full_name FROM user',
				(error, results) => {
					if (error) {
						rejeitado(error);
						return;
					}
					aceito(results);
				}
			);
		});
	},

	getUserById: (id) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'SELECT id, name, email, full_name FROM user WHERE id = ?',
				[id],
				(error, results) => {
					if (error) {
						rejeitado(error);
						return;
					}
					if (results.length > 0) {
						//vai verificar se retornou mais de 1 e pegar o 1
						aceito(results[0]);
					} else {
						aceito(false);
					}
				}
			);
		});
	},

	insertUser: (name, email, password, full_name) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'INSERT INTO user (name, email, password, full_name) VALUES (?, ?, ?, ?)',
				[name, email, password, full_name],
				(error, results) => {
					if (error) {
						rejeitado(error);
						return;
					}
					aceito(results); //insertId
				}
			);
		});
	},

	modifyUser: (id, name, email, full_name) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'UPDATE user SET name = ?, email = ?, full_name = ? WHERE id = ?',
				[name, email, full_name, id],
				(error, results) => {
					if (error) {
						rejeitado(error);
						return;
					}
					aceito(results);
				}
			);
		});
	},

	deleteUser: (id) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'DELETE FROM user WHERE id = ?',
				[id],
				(error, results) => {
					if (error) {
						rejeitado(error);
						return;
					}
					aceito(results);
				}
			);
		});
	},
};
