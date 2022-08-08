import * as VehicleDataService from '../services/VehicleDataService.js';

async function getVehicleData(req, res) {
	let VehiclesData = [];

	let vehiclesData = await VehicleDataService.getVehicleData();

	if (!vehiclesData) {
		return res.status(400).json({
			error: `There aren't any vehicle data in the database`,
		});
	} else {
		for (let i in vehiclesData) {
			VehiclesData.push({
				id: vehiclesData[i].id,
				vin: vehiclesData[i].vin,
				odometer: vehiclesData[i].odometer,
				tirePressure: vehiclesData[i].tirePressure,
				status: vehiclesData[i].status,
				batteryStatus: vehiclesData[i].batteryStatus,
				fuelLevel: vehiclesData[i].fuelLevel,
				latitude: vehiclesData[i].latitude,
				longitude: vehiclesData[i].longitude,
			});
		}

		return res.status(200).json({ VehiclesData });
	}
}

async function getVehicleDataById(req, res) {
	let id = req.params.id;
	let vehicleData = await VehicleDataService.getVehicleDataById(id);

	if (!vehicleData) {
		return res.status(404).json({
			message: `Vehicle (id: ${id}) not found`,
		});
	} else {
		return res.status(200).json({ VehicleData: vehicleData });
	}
}

async function insertVehicleData(req, res) {
	let vin = req.body.vin;
	let odometer = req.body.odometer;
	let tirePressure = req.body.tirePressure;
	let status = req.body.status;
	let batteryStatus = req.body.batteryStatus;
	let fuelLevel = req.body.fuelLevel;
	let latitude = req.body.latitude;
	let longitude = req.body.longitude;

	let vinAlreadyExists = await VehicleDataService.getVehicleDataByVin(vin);

	if (!vin) {
		return res.status(400).json({
			error: `Vin property is required and cannot be empty`,
		});
	} else if (vinAlreadyExists) {
		return res.status(400).json({
			error: `Vin already in use. Please enter a valid Vin.`,
		});
	} else if (!odometer) {
		return res.status(400).json({
			error: `Odometer property is required and cannot be empty`,
		});
	} else if (!tirePressure) {
		return res.status(400).json({
			error: `TirePressure property is required and cannot be empty`,
		});
	} else if (!status) {
		return res.status(400).json({
			error: `Status property is required and cannot be empty`,
		});
	} else if (!batteryStatus) {
		return res.status(400).json({
			error: `BatteryStatus property is required and cannot be empty`,
		});
	} else if (!fuelLevel) {
		return res.status(400).json({
			error: `FuelLevel property is required and cannot be empty`,
		});
	} else if (!latitude) {
		return res.status(400).json({
			error: `Latitude property is required and cannot be empty`,
		});
	} else if (!longitude) {
		return res.status(400).json({
			error: `Longitude property is required and cannot be empty`,
		});
	} else {
		let VehicleDataId = await VehicleDataService.insertVehicleData(
			vin,
			odometer,
			tirePressure,
			status,
			batteryStatus,
			fuelLevel,
			latitude,
			longitude
		);
		res.status(200).json({
			message: `${vin} successfully inserted into database`,
			VehicleData: {
				id: VehicleDataId.insertId,
				vin,
				odometer,
				tirePressure,
				status,
				batteryStatus,
				fuelLevel,
				latitude,
				longitude,
			},
		});
	}
}

async function modifyVehicleData(req, res) {
	let id = req.params.id;
	let vin = req.body.vin;
	let odometer = req.body.odometer;
	let tirePressure = req.body.tirePressure;
	let status = req.body.status;
	let batteryStatus = req.body.batteryStatus;
	let fuelLevel = req.body.fuelLevel;
	let latitude = req.body.latitude;
	let longitude = req.body.longitude;
	let verifyVin = false;

	let vinAlreadyExists = await VehicleDataService.getVehicleDataByVin(vin);
	let vehicleDataExists = await VehicleDataService.getVehicleDataById(id);

	if (vinAlreadyExists) {
		if (!(vinAlreadyExists.id == id)) {
			verifyVin = true;
		}
	}

	if (!vehicleDataExists) {
		return res.status(404).json({
			error: `Vehicle (id: ${id}) not found`,
		});
	} else if (!vin) {
		return res.status(400).json({
			error: `Vin property is required and cannot be empty`,
		});
	} else if (verifyVin) {
		return res.status(400).json({
			error: `Vin already in use. Please enter a valid Vin.`,
		});
	} else if (!odometer) {
		return res.status(400).json({
			error: `Odometer property is required and cannot be empty`,
		});
	} else if (!tirePressure) {
		return res.status(400).json({
			error: `TirePressure property is required and cannot be empty`,
		});
	} else if (!status) {
		return res.status(400).json({
			error: `Status property is required and cannot be empty`,
		});
	} else if (!batteryStatus) {
		return res.status(400).json({
			error: `BatteryStatus property is required and cannot be empty`,
		});
	} else if (!fuelLevel) {
		return res.status(400).json({
			error: `FuelLevel property is required and cannot be empty`,
		});
	} else if (!latitude) {
		return res.status(400).json({
			error: `Latitude property is required and cannot be empty`,
		});
	} else if (!longitude) {
		return res.status(400).json({
			error: `Longitude property is required and cannot be empty`,
		});
	} else {
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

		res.status(200).json({
			message: `Vehicle Data (id: ${id}) successfully updated`,
			VehicleData: {
				id,
				vin,
				odometer,
				tirePressure,
				status,
				batteryStatus,
				fuelLevel,
				latitude,
				longitude,
			},
		});
	}
}

async function deleteVehicleData(req, res) {
	let id = req.params.id;

	let vehicleData = await VehicleDataService.getVehicleDataById(id);

	if (!vehicleData) {
		return res.status(404).json({
			error: `Vehicle data (id: ${id}) not found`,
		});
	} else {
		await VehicleDataService.deleteVehicleData(req.params.id);
		res.status(200).json({
			message: `${vehicleData.vin} successfully deleted!`,
		});
	}
}

export {
	getVehicleData,
	getVehicleDataById,
	insertVehicleData,
	modifyVehicleData,
	deleteVehicleData,
};
