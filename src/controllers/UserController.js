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
				password: users[i].password,
				full_name: users[i].full_name,
			});
		}

		res.json(json);
	},
};
