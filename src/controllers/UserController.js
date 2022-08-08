const UserService = require('../services/UserService');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	getUsers: async (req, res) => {
		let UsersArray = [];

		let users = await UserService.getUsers();

		if (!users) {
			res.staus(404).json({ error: 'No users found' });
		} else {
			for (let i in users) {
				UsersArray.push({
					id: users[i].id,
					name: users[i].name,
					email: users[i].email,
					full_name: users[i].full_name,
				});
			}
			res.status(200).json({ Users: UsersArray });
		}
	},

	getUserById: async (req, res) => {
		let id = req.params.id;
		let user = await UserService.getUserById(id);

		if (!user) {
			res.status(404).json({ error: `User(id ${id}) not found.` });
		} else {
			res.status(200).json({ User: user });
		}
	},

	insertUser: async (req, res) => {
		let name = req.body.name;
		let email = req.body.email;
		let full_name = req.body.full_name;
		let password = req.body.password;

		const emailAlreadyExists = await UserService.getUserByEmail(email);

		if (!name) {
			return res.status(400).json({
				error: `Name property is required and cannot be empty`,
			});
		} else if (!email) {
			return res.status(400).json({
				error: `Email property is required and cannot be empty`,
			});
		} else if (emailAlreadyExists) {
			return res.status(400).json({
				error: `Email already in use. Please enter a valid email address`,
			});
		} else if (!full_name) {
			return res.status(400).json({
				error: `Full_name property is required and cannot be empty`,
			});
		} else if (!password) {
			return res.status(400).json({
				error: `Password property is required and cannot be empty`,
			});
		} else {
			const salt = genSaltSync(10);
			password = hashSync(password, salt);
			let userId = await UserService.insertUser(
				name,
				email,
				password,
				full_name
			);
			res.status(200).json({
				message: `${name} successfully inserted into database`,
				User: {
					id: userId.insertId,
					name,
					email,
					full_name,
				},
			});
		}
	},

	modifyUser: async (req, res) => {
		let id = req.params.id;
		let name = req.body.name;
		let email = req.body.email;
		let full_name = req.body.full_name;
		let verifyEmail = false;

		const emailAlreadyExists = await UserService.getUserByEmail(email);
		const user = await UserService.getUserById(id);

		if (emailAlreadyExists) {
			if (!(emailAlreadyExists.id == id)) {
				verifyEmail = true;
				// Another user cannot modify his own email if someone else has it already
			}
		}

		if (!user) {
			res.status(404).json({ error: `User(id ${id}) not found.` });
		} else if (!name) {
			return res.status(400).json({
				error: `Name property is required and cannot be empty`,
			});
		} else if (!email) {
			return res.status(400).json({
				error: `Email property is required and cannot be empty`,
			});
		} else if (verifyEmail) {
			return res.status(400).json({
				error: `Email already in use. Please enter a valid email address`,
			});
		} else if (!full_name) {
			return res.status(400).json({
				error: `Full_name property is required and cannot be empty`,
			});
		} else {
			await UserService.modifyUser(id, name, email, full_name);
			res.status(200).json({
				message: `User (id: ${id} successfully updated)`,
				User: {
					id,
					name,
					email,
					full_name,
				},
			});
		}
	},

	deleteUser: async (req, res) => {
		let id = req.params.id;

		let user = await UserService.getUserById(id);

		if (!user) {
			res.status(404).json({ error: `User(id ${id}) not found.` });
		} else {
			await UserService.deleteUser(id);
			res.status(200).json({
				message: `User id: ${id} successfuly deleted`,
			});
		}
	},

	login: async (req, res) => {
		const body = req.body;

		if (!body.password || !body.email) {
			return res
				.status(404)
				.send({ message: 'Email and password are required' });
		} else {
			const user = await UserService.getUserByEmail(body.email);

			if (!user) {
				return res
					.status(401)
					.send({ message: 'Invalid email or password' });
			} else {
				const authUser = compareSync(body.password, user.password);
				if (!authUser) {
					return res
						.status(401)
						.send({ message: 'Invalid email or password' });
				} else {
					user.password = undefined;
					user.join_date = undefined;
					const jsontoken = jwt.sign(user, process.env.TOKEN_SECRET, {
						expiresIn: '1h',
					});
					res.set('x-access-token', jsontoken);

					return res.status(200).send({
						message: ' Login Successfully',
						token: jsontoken,
					});
				}
			}
		}
	},
};
