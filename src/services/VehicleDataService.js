db = require('../infra/connection');

module.exports = {
	getVehicleData: () => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				`SELECT id, 
                vin, 
                odometer, 
                tirePressure,
                status,
                batteryStatus,
                fuelLevel,
                latitude,
                longitude FROM vehicledata`,
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

	getVehicleDataById: (id) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				`SELECT id, vin, 
                odometer, 
                tirePressure,
                status,
                batteryStatus,
                fuelLevel,
                latitude,
                longitude FROM vehicledata WHERE id = ?`,
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

	insertVehicleData: (
		vin,
		odometer,
		tirePressure,
		status,
		batteryStatus,
		fuelLevel,
		latitude,
		longitude
	) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				`INSERT INTO vehicledata (vin,
					odometer,
					tirePressure,
					status,
					batteryStatus,
					fuelLevel,
					latitude,
					longitude) VALUES (?, ?, ?, ?, ? , ?, ?, ?)`,
				[
					vin,
					odometer,
					tirePressure,
					status,
					batteryStatus,
					fuelLevel,
					latitude,
					longitude,
				],
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

	modifyVehicleData: (
		id,
		vin,
		odometer,
		tirePressure,
		status,
		batteryStatus,
		fuelLevel,
		latitude,
		longitude
	) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'UPDATE vehicledata SET vin = ?, odometer = ?, tirePressure = ?, status = ?, batteryStatus = ?, fuelLevel= ?, latitude = ?, longitude = ? WHERE id = ?',
				[
					vin,
					odometer,
					tirePressure,
					status,
					batteryStatus,
					fuelLevel,
					latitude,
					longitude,
					id,
				],
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

	deleteVehicleData: (id) => {
		return new Promise((aceito, rejeitado) => {
			db.query(
				'DELETE FROM vehicledata WHERE id = ?',
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
