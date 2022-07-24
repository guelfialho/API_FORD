const User = require('../models/user.model');

module.exports = (app) => {
	app.get('/users', (req, res) =>
		res.send('Você está na rota de usuários e está realizando um GET')
	);

	app.post('/user/signup', (req, res) => {
		const user = req.body;

		User.addUser(user);
		res.send('Post User');
	});
};
