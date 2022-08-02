const app = require('./index');
const request = require('supertest');

let token;

beforeAll((done) => {
	request(app)
		.post('/api/user/login')
		.send({
			email: 'fialho@gmail.com',
			password: 'miguel',
		})
		.end((err, response) => {
			token = response.body.token; // save the token!
			done();
		});
});

describe('Test my GET /api/users response', () => {
	it('Response body should be instance of Object', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('Authorization', `Bearer ${token}`);

		expect(res.body).toBeInstanceOf(Object);
		expect(res.statusCode).toBe(200);
	});

	it('Response body should get properties', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('Authorization', `Bearer ${token}`);
		expect(res.body).toHaveProperty('Users');
	});

	it('Property Users should be a instance of Array', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('Authorization', `Bearer ${token}`);
		expect(res.body.Users).toBeInstanceOf(Array);
	});

	it('Element of Users array should have properties', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('Authorization', `Bearer ${token}`);
		expect(res.body.Users[0]).toHaveProperty('id');
		expect(res.body.Users[0]).toHaveProperty('name');
		expect(res.body.Users[0]).toHaveProperty('email');
		expect(res.body.Users[0]).toHaveProperty('full_name');
	});

	it('Elements of Users array should have properties', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('Authorization', `Bearer ${token}`);
		const users = res.body.Users;

		for (user of users) {
			expect(user).toHaveProperty('id');
			expect(user).toHaveProperty('name');
			expect(user).toHaveProperty('email');
			expect(user).toHaveProperty('full_name');
		}
	});

	it('Elements of Users array should not have their properties values empty', async () => {
		const res = await request(app)
			.get('/api/users')
			.set('Authorization', `Bearer ${token}`);
		const users = res.body.Users;

		for (user of users) {
			expect(user.id).not.toBe(null);
			expect(user.name).not.toBe(null);
			expect(user.email).not.toBe(null);
			expect(user.full_name).not.toBe(null);
		}
	});
});

describe('Test my GET /api/vehicles response', () => {
	it('Response body should be instance of Object', async () => {
		const res = await request(app).get('/api/vehicles');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Response body should get properties', async () => {
		const res = await request(app).get('/api/vehicles');
		expect(res.body).toHaveProperty('error');
		expect(res.body).toHaveProperty('Vehicles');
	});

	it('Property Vehicles should be a instance of Array', async () => {
		const res = await request(app).get('/api/vehicles');
		expect(res.body.Vehicles).toBeInstanceOf(Array);
	});

	it('Elements of Vehicles array should have properties', async () => {
		const res = await request(app).get('/api/vehicles');
		const vehicles = res.body.Vehicles;

		for (vehicle of vehicles) {
			expect(vehicle).toHaveProperty('id');
			expect(vehicle).toHaveProperty('model');
			expect(vehicle).toHaveProperty('sold');
			expect(vehicle).toHaveProperty('connected');
			expect(vehicle).toHaveProperty('softwareUpdates');
		}
	});

	it('Elements of Users array should not have their properties values empty', async () => {
		const res = await request(app).get('/api/vehicles');
		const vehicles = res.body.Vehicles;

		for (vehicle of vehicles) {
			expect(vehicle.id).not.toBe(null);
			expect(vehicle.name).not.toBe(null);
			expect(vehicle.email).not.toBe(null);
			expect(vehicle.full_name).not.toBe(null);
		}
	});
});

describe('Test my GET /api/vehicledata response', () => {
	it('Response body should be instance of Object', async () => {
		const res = await request(app).get('/api/vehiclesdata');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Response body should get properties', async () => {
		const res = await request(app).get('/api/vehiclesdata');
		// expect(res.body).toHaveProperty('error');
		expect(res.body).toHaveProperty('VehiclesData');
	});

	it('Property VehiclesData should be a instance of Array', async () => {
		const res = await request(app).get('/api/vehiclesdata');
		expect(res.body.VehiclesData).toBeInstanceOf(Array);
	});

	it('Elements of VehiclesData array should have properties', async () => {
		const res = await request(app).get('/api/vehiclesdata');
		const vehiclesData = res.body.VehiclesData;

		for (vehicleData of vehiclesData) {
			expect(vehicleData).toHaveProperty('id');
			expect(vehicleData).toHaveProperty('vin');
			expect(vehicleData).toHaveProperty('odometer');
			expect(vehicleData).toHaveProperty('tirePressure');
			expect(vehicleData).toHaveProperty('status');
			expect(vehicleData).toHaveProperty('fuelLevel');
			expect(vehicleData).toHaveProperty('latitude');
			expect(vehicleData).toHaveProperty('longitude');
		}
	});

	it('Elements of VehiclesData array should not have their properties values empty', async () => {
		const res = await request(app).get('/api/vehiclesdata');
		const vehiclesData = res.body.VehiclesData;

		for (vehicleData of vehiclesData) {
			expect(vehicleData.id).not.toBe(null);
			expect(vehicleData.vin).not.toBe(null);
			expect(vehicleData.odometer).not.toBe(null);
			expect(vehicleData.tirePressure).not.toBe(null);
			expect(vehicleData.status).not.toBe(null);
			expect(vehicleData.fuelLevel).not.toBe(null);
			expect(vehicleData.latitude).not.toBe(null);
			expect(vehicleData.longitude).not.toBe(null);
		}
	});
});

describe('Test my POST /api/vehicle response', () => {
	let id = '';
	afterAll(async () => {
		const response = await request(app).delete(`/api/vehicle/${id}`);
	});
	it('Testing insert vehicle', async () => {
		const vehicle = {
			model: 'F-1509',
			sold: '9517532',
			connected: '3579512',
			softwareUpdates: '1574532',
		};

		expect(vehicle.name).not.toBe(null);
		expect(vehicle.email).not.toBe(null);
		expect(vehicle.password).not.toBe(null);
		expect(vehicle.full_name).not.toBe(null);

		const res = await request(app).post('/api/vehicle').send(vehicle);

		id = res.body.result.id;

		expect(res.body).toBeInstanceOf(Object);
	});
});

describe('Test my POST /api/user response', () => {
	let id2 = '';
	afterAll(async () => {
		const response2 = await request(app).delete(`/api/user/${id2}`);
	});
	it('Testing insert user', async () => {
		const user = {
			name: 'JEST',
			email: 'fialhomig3@gmail.com.br',
			password: 'teste2',
			full_name: 'Miguel Fialho2',
		};

		expect(user.name).not.toBe(null);
		expect(user.email).not.toBe(null);
		expect(user.password).not.toBe(null);
		expect(user.full_name).not.toBe(null);

		const res = await request(app).post('/api/user').send(user);

		id2 = res.body.result.id;

		expect(res.body).toBeInstanceOf(Object);
	});
});

describe('Test my POST /api/vehicledata response', () => {
	let id3 = '';
	afterAll(async () => {
		const response3 = await request(app).delete(`/api/vehicledata/${id3}`);
	});
	it('Testing insert vehicledata', async () => {
		const vehicledata = {
			vin: '3MIGDUYS2Y63NHD22454',
			odometer: '9517532',
			tirePressure: '3579512',
			status: '1574532',
			baterryStatus: 'F-1502',
			fuelLevel: '9517532',
			latitude: '3579512',
			longitude: '1574532',
		};

		expect(vehicledata.vin).not.toBe(null);
		expect(vehicledata.email).not.toBe(null);
		expect(vehicledata.password).not.toBe(null);
		expect(vehicledata.full_name).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(vehicledata);

		id3 = res.body.result.id;

		expect(res.body).toBeInstanceOf(Object);
	});
});

describe('Test my PUT /api/user response', () => {
	const id4 = 4;
	let olderUser = '';
	afterAll(async () => {
		const responsee = await request(app)
			.put(`/api/user/${id4}`)
			.send(olderUser)
			.expect(200);
	});
	it('Testing modify user', async () => {
		const user = {
			name: 'JEST5',
			email: 'fialho55@gmail.com.br',
			full_name: 'Miguel Fialho5',
		};

		expect(user.name).not.toBe(null);
		expect(user.email).not.toBe(null);
		expect(user.full_name).not.toBe(null);

		const olderUserRes = await request(app).get(`/api/users/${id4}`);
		olderUser = olderUserRes.body.User;

		const res = await request(app)
			.put(`/api/user/${id4}`)
			.send(user)
			.expect(200);

		expect(res.body.result).toHaveProperty('name', user.name);
		expect(res.body.result).toHaveProperty('email', user.email);
		expect(res.body.result).toHaveProperty('full_name', user.full_name);
	});
});

describe('Test my PUT /api/vehicle response', () => {
	const id5 = 41;
	let olderVehicle = '';
	afterAll(async () => {
		const responsee = await request(app)
			.put(`/api/vehicle/${id5}`)
			.send(olderVehicle)
			.expect(200);
	});
	it('Testing modify vehicle', async () => {
		const vehicle = {
			model: 'F-2204',
			sold: '7777777',
			connected: '8565557',
			softwareUpdates: '1574532',
		};

		expect(vehicle.model).not.toBe(null);
		expect(vehicle.sold).not.toBe(null);
		expect(vehicle.connected).not.toBe(null);
		expect(vehicle.softwareUpdates).not.toBe(null);

		const olderVehicleRes = await request(app).get(`/api/vehicles/${id5}`);
		olderVehicle = olderVehicleRes.body.Vehicle;

		const res = await request(app)
			.put(`/api/vehicle/${id5}`)
			.send(vehicle)
			.expect(200);

		expect(res.body.result).toHaveProperty('model', vehicle.model);
		expect(res.body.result).toHaveProperty('sold', vehicle.sold);
		expect(res.body.result).toHaveProperty('connected', vehicle.connected);
		expect(res.body.result).toHaveProperty(
			'softwareUpdates',
			vehicle.softwareUpdates
		);
	});
});

describe('Test my PUT /api/vehicledata response', () => {
	const id6 = 3;
	let olderVehicleData = '';
	afterAll(async () => {
		const responsees = await request(app)
			.put(`/api/vehicledata/${id6}`)
			.send({ olderVehicleData })
			.expect(200);
	});
	it('Testing modify vehicle data', async () => {
		const vehicleData = {
			vin: '66HHDUYS2Y63MIG99999',
			odometer: '9517532',
			tirePressure: '3579512',
			status: '1574532',
			batteryStatus: 'F1502',
			fuelLevel: '9517532',
			latitude: '3579512',
			longitude: '1574532',
		};

		expect(vehicleData.vin).not.toBe(null);
		expect(vehicleData.odometer).not.toBe(null);
		expect(vehicleData.tirePressure).not.toBe(null);
		expect(vehicleData.status).not.toBe(null);
		expect(vehicleData.batteryStatus).not.toBe(null);
		expect(vehicleData.fuelLevel).not.toBe(null);
		expect(vehicleData.latitude).not.toBe(null);
		expect(vehicleData.longitude).not.toBe(null);

		const olderVehicledataRes = await request(app).get(
			`/api/vehiclesdata/${id6}`
		);

		olderVehicleData = olderVehicledataRes.body.VehicleData;
		// console.log(olderVehicleData);

		const res = await request(app)
			.put(`/api/vehicledata/${id6}`)
			.send(vehicleData)
			.expect(200);

		expect(res.body.result).toHaveProperty('vin', vehicleData.vin);
		expect(res.body.result).toHaveProperty(
			'odometer',
			vehicleData.odometer
		);
		expect(res.body.result).toHaveProperty(
			'tirePressure',
			vehicleData.tirePressure
		);
		expect(res.body.result).toHaveProperty('status', vehicleData.status);
		expect(res.body.result).toHaveProperty(
			'batteryStatus',
			vehicleData.batteryStatus
		);
		expect(res.body.result).toHaveProperty(
			'fuelLevel',
			vehicleData.fuelLevel
		);
		expect(res.body.result).toHaveProperty(
			'latitude',
			vehicleData.latitude
		);
		expect(res.body.result).toHaveProperty(
			'longitude',
			vehicleData.longitude
		);
	});
});
