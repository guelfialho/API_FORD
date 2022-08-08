// db = require('../infra/connection');
import connection from '../infra/connection.js';
const db = connection;

function getUsers() {
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
}

function getUserById(id) {
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
}

function insertUser(name, email, password, full_name) {
	return new Promise((aceito, rejeitado) => {
		db.query(
			'INSERT INTO user (name, email, password, full_name) VALUES (?, ?, ?, ?)',
			[name, email, password, full_name],
			(error, results) => {
				if (error) {
					rejeitado(error);
					return;
				}
				aceito(results);
			}
		);
	});
}

function modifyUser(id, name, email, full_name) {
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
}

function deleteUser(id) {
	return new Promise((aceito, rejeitado) => {
		db.query('DELETE FROM user WHERE id = ?', [id], (error, results) => {
			if (error) {
				rejeitado(error);
				return;
			}
			aceito(results);
		});
	});
}

function getUserByEmail(email) {
	return new Promise((aceito, rejeitado) => {
		db.query(
			'SELECT * FROM user WHERE email = ?',
			[email],
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
}

export {
	getUsers,
	getUserById,
	insertUser,
	modifyUser,
	deleteUser,
	getUserByEmail,
};
