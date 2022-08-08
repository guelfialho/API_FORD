// db = require('../infra/connection');
import connection from '../infra/connection.js';
const db = connection;

function getVehicleData() {
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
}

function getVehicleDataById(id) {
	return new Promise((aceito, rejeitado) => {
		db.query(
			`SELECT * FROM vehicledata WHERE id = ?`,
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

function insertVehicleData(
	vin,
	odometer,
	tirePressure,
	status,
	batteryStatus,
	fuelLevel,
	latitude,
	longitude
) {
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
}

function modifyVehicleData(
	id,
	vin,
	odometer,
	tirePressure,
	status,
	batteryStatus,
	fuelLevel,
	latitude,
	longitude
) {
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
}

function deleteVehicleData(id) {
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
}

function getVehicleDataByVin(vin) {
	return new Promise((aceito, rejeitado) => {
		db.query(
			`SELECT * FROM vehicledata WHERE vin = ?`,
			[vin],
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
	getVehicleData,
	getVehicleDataById,
	insertVehicleData,
	modifyVehicleData,
	deleteVehicleData,
	getVehicleDataByVin,
};
