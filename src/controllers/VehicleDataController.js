const VehicleDataService = require('../services/VehicleDataService');

module.exports = {
	getVehicleData: async (req, res) => {
		let json = { error: '', VehiclesData: [] };

		let vehiclesData = await VehicleDataService.getVehicleData();

		for (let i in vehiclesData) {
			json.VehiclesData.push({
				id: vehiclesData[i].id,
				vin: vehiclesData[i].vin,
				odometer: vehiclesData[i].odometer,
				tirePressure: vehiclesData[i].tirePressure,
				status: vehiclesData[i].status,
				baterryStatus: vehiclesData[i].baterryStatus,
				fuelLevel: vehiclesData[i].fuelLevel,
				latitude: vehiclesData[i].latitude,
				longitude: vehiclesData[i].longitude,
			});
		}

		res.json(json);
	},

	getVehicleDataById: async (req, res) => {
		let json = { error: '', VehicleData: {} };

		let id = req.params.id; //para pegar o parametro
		let vehicleData = await VehicleDataService.getVehicleDataById(id);

		if (vehicleData) {
			json.VehicleData = vehicleData; //se tiver nota ele joga no json
		} else {
			json.error = `Não foi possível localizar (GET) dados de veículo com id : ${id}`;
		}

		res.json(json);
	},

	insertVehicleData: async (req, res) => {
		let json = { error: '', result: {} };

		let vin = req.body.vin;
		let odometer = req.body.odometer;
		let tirePressure = req.body.tirePressure;
		let status = req.body.status;
		let baterryStatus = req.body.baterryStatus;
		let fuelLevel = req.body.fuelLevel;
		let latitude = req.body.latitude;
		let longitude = req.body.longitude;

		if (
			vin &&
			odometer &&
			tirePressure &&
			status &&
			baterryStatus &&
			fuelLevel &&
			latitude &&
			longitude
		) {
			let VehicleDataId = await VehicleDataService.insertVehicleData(
				vin,
				odometer,
				tirePressure,
				status,
				baterryStatus,
				fuelLevel,
				latitude,
				longitude
			);
			json.result = {
				id: VehicleDataId.insertId,
				vin,
				odometer,
				tirePressure,
				status,
				baterryStatus,
				fuelLevel,
				latitude,
				longitude,
			};
		} else {
			json.error = 'Campos não enviados';
		}
		res.json(json);
	},

	modifyVehicleData: async (req, res) => {
		let json = { error: '', result: {} };

		let id = req.params.id;
		let vin = req.body.vin;
		let odometer = req.body.odometer;
		let tirePressure = req.body.tirePressure;
		let status = req.body.status;
		let batteryStatus = req.body.batteryStatus;
		let fuelLevel = req.body.fuelLevel;
		let latitude = req.body.latitude;
		let longitude = req.body.longitude;

		let idExists = await VehicleDataService.getVehicleDataById(id);

		if (
			idExists &&
			id &&
			vin &&
			odometer &&
			tirePressure &&
			status &&
			batteryStatus &&
			fuelLevel &&
			latitude &&
			longitude
		) {
			await VehicleDataService.modifyVehicleData(
				id,
				vin,
				odometer,
				tirePressure,
				status,
				batteryStatus,
				fuelLevel,
				latitude,
				longitude
			);
			json.result = {
				id,
				vin,
				odometer,
				tirePressure,
				status,
				batteryStatus,
				fuelLevel,
				latitude,
				longitude,
			};
		} else {
			json.error = `Não foi posível alterar (PUT) dados do veículo com id: ${id}, IDExist: ${!!idExists}, ID: ${!!id}, vin: ${!!vin}, odometer: ${!!odometer}, tirePressure: ${!!tirePressure},status: ${!!status}, baterryStatus: ${batteryStatus}, fuelLevel: ${!!fuelLevel}, latitude: ${!!latitude}, longitude: ${!!longitude}`;
		}
		res.json(json);
	},

	deleteVehicleData: async (req, res) => {
		let json = { error: '', result: {} };

		let id = req.params.id;

		let vehicleData = await VehicleDataService.getVehicleDataById(id);

		if (vehicleData) {
			json.result = `Vehicle data: ${vehicleData.vin} successfully deleted! `;
		} else {
			json.error = `Não foi possível localizar dados do veículo com id: ${id}`;
		}

		await VehicleDataService.deleteVehicleData(req.params.id);

		res.json(json);
	},
};
