const connection = require('../infra/connection');

class User {
	addUser(user) {
		const insertUser = `INSERT INTO user SET ?`;

		connection.query(insertUser, user, (error, result) => {
			if (error) {
				console.log(error);
			} else {
				console.log(result);
			}
		});
	}
}

module.exports = new User();
