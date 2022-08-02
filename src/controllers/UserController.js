const UserService = require('../services/UserService');
const { genSaltSync, hashSync, compareSync, compare } = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	getUsers: async (req, res) => {
		let UsersArray = [];

		let users = await UserService.getUsers();

		for (let i in users) {
			UsersArray.push({
				id: users[i].id,
				name: users[i].name,
				email: users[i].email,
				full_name: users[i].full_name,
			});
		}

		if (!users) {
			res.staus(404).json({ error: 'No users found' });
		} else {
			res.status(200).json({ Users: UsersArray });
		}
	},

	getUserById: async (req, res) => {
		let id = req.params.id; //para pegar o parametro
		let user = await UserService.getUserById(id);

		if (user) {
			res.status(200).json({ User: user });
		} else {
			res.status(404).json({
				error: `Não foi possível localizar usuário com id: ${id}`,
			});
		}
	},

	insertUser: async (req, res) => {
		let json = { error: '', result: {} };

		let name = req.body.name;
		let email = req.body.email;
		let full_name = req.body.full_name;
		const salt = genSaltSync(10);
		let password = hashSync(req.body.password, salt);

		if (name && email && full_name && password) {
			let userId = await UserService.insertUser(
				name,
				email,
				password,
				full_name
			);
			json.result = {
				id: userId.insertId,
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

	login: async (req, res) => {
		// let json = { error: '', result: {} };
		const body = req.body;

		if (body.password && body.email) {
			const user = await UserService.getUserByEmail(body.email);

			if (!user) {
				// json.error = 'Invalid email or password';
				return res
					.status(401)
					.send({ message: 'Invalid email or password' });
			} else {
				const authUser = compareSync(body.password, user.password);
				if (authUser) {
					user.password = undefined;
					const jsontoken = jwt.sign(
						{ result: user },
						process.env.TOKEN_SECRET,
						{ expiresIn: '1h' }
					);

					return res.status(200).send({
						message: ' Login Successfully',
						token: jsontoken,
					});
				} else {
					return res
						.status(401)
						.send({ message: 'Invalid email or password' });
				}
			}
		} else {
			return res
				.status(404)
				.send({ message: 'Email and password are required' });
		}
	},
};
