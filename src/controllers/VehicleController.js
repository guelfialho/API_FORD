const VehicleService = require('../services/VehicleService');

module.exports = {
	getVehicle: async (req, res) => {
		let json = { error: '', Vehicles: [] };

		let vehicle = await VehicleService.getVehicle();

		for (let i in vehicle) {
			json.Vehicles.push({
				id: vehicle[i].id,
				model: vehicle[i].model,
				sold: vehicle[i].sold,
				connected: vehicle[i].connected,
				softwareUpdates: vehicle[i].softwareUpdates,
			});
		}

		res.json(json);
	},

	getVehicleById: async (req, res) => {
		let json = { error: '', Vehicle: {} };

		let id = req.params.id; //para pegar o parametro
		let vehicle = await VehicleService.getVehicleById(id);

		if (vehicle) {
			json.Vehicle = vehicle; //se tiver nota ele joga no json
		} else {
			json.error = `Não foi possível localizar veículo com id: ${id}`;
		}

		res.json(json);
	},

	insertVehicle: async (req, res) => {
		let json = { error: '', result: {} };

		let model = req.body.model;
		let sold = req.body.sold;
		let connected = req.body.connected;
		let softwareUpdates = req.body.softwareUpdates;

		if (model && sold && connected && softwareUpdates) {
			let VehicleId = await VehicleService.insertVehicle(
				model,
				sold,
				connected,
				softwareUpdates
			);
			json.result = {
				id: VehicleId,
				model,
				sold,
				connected,
				softwareUpdates,
			};
		} else {
			json.error = 'Campos não enviados';
		}
		res.json(json);
	},

	modifyVehicle: async (req, res) => {
		let json = { error: '', result: {} };

		let id = req.params.id;
		let model = req.body.model;
		let sold = req.body.sold;
		let connected = req.body.connected;
		let softwareUpdates = req.body.softwareUpdates;

		let idExists = await VehicleService.getVehicleById(id);

		if (idExists && id && model && sold && connected && softwareUpdates) {
			await VehicleService.modifyVehicle(
				id,
				model,
				sold,
				connected,
				softwareUpdates
			);
			json.result = {
				id,
				model,
				sold,
				connected,
				softwareUpdates,
			};
		} else {
			json.error = `Não foi posível localizar veículo com id: ${id}`;
		}
		res.json(json);
	},

	deleteVehicle: async (req, res) => {
		let json = { error: '', result: {} };

		let id = req.params.id;

		let vehicle = await VehicleService.getVehicleById(id);

		if (vehicle) {
			json.result = `Vehicle: ${vehicle.model} successfully deleted! `;
		} else {
			json.error = `Não foi possível localizar veículo com id: ${id}`;
		}

		await VehicleService.deleteVehicle(req.params.id);

		res.json(json);
	},
};
