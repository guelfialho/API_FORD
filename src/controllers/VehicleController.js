const VehicleService = require('../services/VehicleService');

module.exports = {
	getVehicles: async (req, res) => {
		let VehiclesArray = [];

		let vehicles = await VehicleService.getVehicles();

		if (!vehicles) {
			res.staus(404).json({ error: 'No vehicles found' });
		} else {
			for (let i in vehicles) {
				VehiclesArray.push({
					id: vehicles[i].id,
					model: vehicles[i].model,
					sold: vehicles[i].sold,
					connected: vehicles[i].connected,
					softwareUpdates: vehicles[i].softwareUpdates,
				});
			}
			res.status(200).json({ Vehicles: VehiclesArray });
		}
	},

	getVehicleById: async (req, res) => {
		let id = req.params.id;
		let vehicle = await VehicleService.getVehicleById(id);

		if (!vehicle) {
			res.status(404).json({ error: `Vehicle (id ${id}) not found.` });
		} else {
			res.status(200).json({ Vehicle: vehicle });
		}
	},

	insertVehicle: async (req, res) => {
		let model = req.body.model;
		let sold = req.body.sold;
		let connected = req.body.connected;
		let softwareUpdates = req.body.softwareUpdates;

		const vehicleModelExists = await VehicleService.getVehicleByModel(
			model
		);

		if (!model) {
			return res.status(400).json({
				error: `Model property is required and cannot be empty`,
			});
		} else if (vehicleModelExists) {
			return res.status(400).json({
				error: `Model already exists. Please update it or insert a new one.`,
			});
		} else if (!sold) {
			return res.status(400).json({
				error: `Sold property is required and cannot be empty`,
			});
		} else if (!connected) {
			return res.status(400).json({
				error: `Connected property is required and cannot be empty`,
			});
		} else if (!softwareUpdates) {
			return res.status(400).json({
				error: `SoftwareUpdates property is required and cannot be empty`,
			});
		} else {
			let VehicleId = await VehicleService.insertVehicle(
				model,
				sold,
				connected,
				softwareUpdates
			);

			res.status(200).json({
				message: `${model} successfully inserted into database`,
				Vehicle: {
					id: VehicleId.insertId,
					model,
					sold,
					connected,
					softwareUpdates,
				},
			});
		}
	},

	modifyVehicle: async (req, res) => {
		let id = req.params.id;
		let model = req.body.model;
		let sold = req.body.sold;
		let connected = req.body.connected;
		let softwareUpdates = req.body.softwareUpdates;

		let idExists = await VehicleService.getVehicleById(id);

		if (!idExists) {
			res.status(404).json({ error: `Vehicle (id ${id}) not found.` });
		} else if (!model) {
			return res.status(400).json({
				error: `Model property is required and cannot be empty`,
			});
		} else if (!sold) {
			return res.status(400).json({
				error: `Sold property is required and cannot be empty`,
			});
		} else if (!connected) {
			return res.status(400).json({
				error: `Connected property is required and cannot be empty`,
			});
		} else if (!softwareUpdates) {
			return res.status(400).json({
				error: `SoftwareUpdates property is required and cannot be empty`,
			});
		} else {
			await VehicleService.modifyVehicle(
				id,
				model,
				sold,
				connected,
				softwareUpdates
			);
			res.status(200).json({
				message: `${model} successfully updated!`,
				Vehicle: {
					id,
					model,
					sold,
					connected,
					softwareUpdates,
				},
			});
		}
	},

	deleteVehicle: async (req, res) => {
		let id = req.params.id;

		let vehicle = await VehicleService.getVehicleById(id);

		if (!vehicle) {
			res.status(404).json({ error: `Vehicle (id: ${id}) not found.` });
		} else {
			await VehicleService.deleteVehicle(req.params.id);
			res.status(200).json({
				message: `${vehicle.model} successfully deleted!`,
			});
		}
	},
};
