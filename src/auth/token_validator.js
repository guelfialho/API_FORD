import jwt from 'jsonwebtoken';

function checkToken(req, res, next) {
	let token = req.headers['x-access-token'];

	if (token) {
		jwt.verify(token, process.env.TOKEN_SECRET, (error, decoded) => {
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
}

export default checkToken;
