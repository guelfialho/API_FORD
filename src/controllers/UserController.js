const UserService = require('../services/UserService');

module.exports = {
	getUsers: async (req, res) => {
		let json = { error: '', Users: [] };

		let users = await UserService.getUsers();

		for (let i in users) {
			json.Users.push({
				id: users[i].id,
				name: users[i].name,
				email: users[i].email,
				full_name: users[i].full_name,
			});
		}

		res.json(json);
	},

	getUserById: async (req, res) => {
		let json = { error: '', User: {} };

		let id = req.params.id; //para pegar o parametro
		let user = await UserService.getUserById(id);

		if (user) {
			json.User = user; //se tiver nota ele joga no json
		} else {
			json.error = `Não foi possível localizar usuário com id: ${id}`;
		}

		res.json(json);
	},

	insertUser: async (req, res) => {
		let json = { error: '', result: {} };

		let name = req.body.name;
		let email = req.body.email;
		let full_name = req.body.full_name;
		let password = req.body.password;

		if (name && email && full_name && password) {
			let userId = await UserService.insertUser(
				name,
				email,
				password,
				full_name
			);
			json.result = {
				codigo: userId,
				name,
				email,
				full_name,
				password,
			};
		} else {
			json.error = 'Campos não enviados';
		}
		res.json(json);
	},

	modifyUser: async (req, res) => {
		let json = { error: '', result: {} };

		let id = req.params.id;
		let name = req.body.name;
		let email = req.body.email;
		let full_name = req.body.full_name;

		if (id && name && email && full_name) {
			await UserService.modifyUser(id, name, email, full_name);
			json.result = {
				id,
				name,
				email,
				full_name,
			};
		} else {
			json.error = 'Campos não enviados';
		}
		res.json(json);
	},

	deleteUser: async (req, res) => {
		let json = { error: '', result: {} };

		let id = req.params.id;

		let user = await UserService.getUserById(id);

		if (user) {
			json.result = user;
		}

		await UserService.deleteUser(req.params.id);

		res.json(json);
	},
};
