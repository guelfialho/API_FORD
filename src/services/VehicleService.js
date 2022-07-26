db = require('../infra/connection');

module.exports = {
	getVehicle: () => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				`SELECT id, model, sold, connected, softwareUpdates FROM vehicle`,
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

	getVehicleById: (id) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				`SELECT id, model, sold, connected, softwareUpdates FROM vehicle WHERE id = ?`,
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

	insertVehicle: (model, sold, connected, softwareUpdates) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				`INSERT INTO vehicle (model, sold, connected, softwareUpdates) VALUES (?, ?, ?, ?)`,
				[model, sold, connected, softwareUpdates],
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

	modifyVehicle: (id, model, sold, connected, softwareUpdates) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'UPDATE vehicle SET model = ?, sold = ?, connected = ?, softwareUpdates = ? WHERE id = ?',
				[model, sold, connected, softwareUpdates, id],
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

	deleteVehicle: (id) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'DELETE FROM vehicle WHERE id = ?',
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
