const { verify } = require('jsonwebtoken');

module.exports = {
	checkToken: (req, res, next) => {
		let token = req.headers['x-access-token'];
		// let token = req.get('x-access-token');
		if (token) {
			// token = token.slice(7);
			verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
				if (error) {
					res.status(401).json({ message: 'Invalid token' });
				} else {
					next();
				}
			});
		} else {
			res.status(401).json({
				message: 'Access denied! Unauthorized user.',
			});
		}
	},
};
