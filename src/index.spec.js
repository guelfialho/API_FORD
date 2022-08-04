const app = require('./index');
const request = require('supertest');
const {
	VehicleSuccess,
	VehicleModelAlreadyExists,
	VehicleModelNull,
	VehicleSoldlNull,
	VehicleConnectedlNull,
	VehicleSoftwareUpdateslNull,
} = require('./test/vehicles/vehiclesConstants');

const {
	UserSuccess,
	UserEmailAlreadyExists,
	UserNameNull,
	UserEmailNull,
	UserPasswordNull,
	UserFullNameNull,
} = require('./test/users/userConstants');

const {
	VD_success,
	VD_VinAlreadyExists,
	VD_VinNull,
	VD_OdometerNull,
	VD_TirePressureNull,
	VD_StatusNull,
	VD_BatteryStatusNull,
	VD_FuelLevelNull,
	VD_LatitudeNull,
	VD_LongitudeNull,
} = require('./test/vehiclesData/vehiclesDataConstants');

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
	it('Testing insert vehicle (SUCCESS)', async () => {
		expect(VehicleSuccess.model).not.toBe(null);
		expect(VehicleSuccess.sold).not.toBe(null);
		expect(VehicleSuccess.connected).not.toBe(null);
		expect(VehicleSuccess.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicle')
			.send(VehicleSuccess);

		id = res.body.Vehicle.id;

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('Vehicle');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicle (Error: Model Already Exists)', async () => {
		expect(VehicleModelAlreadyExists.model).not.toBe(null);
		expect(VehicleModelAlreadyExists.sold).not.toBe(null);
		expect(VehicleModelAlreadyExists.connected).not.toBe(null);
		expect(VehicleModelAlreadyExists.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicle')
			.send(VehicleModelAlreadyExists);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Model already exists. Please update it or insert a new one.`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicle (Error: Model is Empty)', async () => {
		expect(VehicleModelNull).not.toHaveProperty('model');
		expect(VehicleModelNull.sold).not.toBe(null);
		expect(VehicleModelNull.connected).not.toBe(null);
		expect(VehicleModelNull.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicle')
			.send(VehicleModelNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Model property is required and cannot be empty`
		);
	});

	it('Testing insert vehicle (Error: Sold is Empty)', async () => {
		expect(VehicleSoldlNull.model).not.toBe(null);
		expect(VehicleSoldlNull).not.toHaveProperty('sold');
		expect(VehicleSoldlNull.connected).not.toBe(null);
		expect(VehicleSoldlNull.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicle')
			.send(VehicleSoldlNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Sold property is required and cannot be empty`
		);
	});

	it('Testing insert vehicle (Error: Connected is Empty)', async () => {
		expect(VehicleConnectedlNull.model).not.toBe(null);
		expect(VehicleConnectedlNull.sold).not.toBe(null);
		expect(VehicleConnectedlNull).not.toHaveProperty('connected');
		expect(VehicleConnectedlNull.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicle')
			.send(VehicleConnectedlNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Connected property is required and cannot be empty`
		);
	});

	it('Testing insert vehicle (Error: SoftwareUpdates is Empty)', async () => {
		expect(VehicleSoftwareUpdateslNull.model).not.toBe(null);
		expect(VehicleSoftwareUpdateslNull.sold).not.toBe(null);
		expect(VehicleSoftwareUpdateslNull.connected).not.toBe(null);
		expect(VehicleSoftwareUpdateslNull).not.toHaveProperty(
			'softwareUpdates'
		);

		const res = await request(app)
			.post('/api/vehicle')
			.send(VehicleSoftwareUpdateslNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`SoftwareUpdates property is required and cannot be empty`
		);
	});
});

describe('Test my POST /api/user response', () => {
	let id = '';
	afterAll(async () => {
		const response2 = await request(app).delete(`/api/user/${id}`);
	});
	it('Testing insert user (SUCCESS)', async () => {
		expect(UserSuccess.name).not.toBe(null);
		expect(UserSuccess.email).not.toBe(null);
		expect(UserSuccess.password).not.toBe(null);
		expect(UserSuccess.full_name).not.toBe(null);

		const res = await request(app).post('/api/user').send(UserSuccess);

		id = res.body.User.id;

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('User');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert user (Error: Email Already Exists)', async () => {
		expect(UserEmailAlreadyExists.name).not.toBe(null);
		expect(UserEmailAlreadyExists.email).not.toBe(null);
		expect(UserEmailAlreadyExists.password).not.toBe(null);
		expect(UserEmailAlreadyExists.full_name).not.toBe(null);

		const res = await request(app)
			.post('/api/user')
			.send(UserEmailAlreadyExists);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Email already in use. Please enter a valid email address`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert user (Error: Name is Null)', async () => {
		expect(UserNameNull).not.toHaveProperty('name');
		expect(UserNameNull.email).not.toBe(null);
		expect(UserNameNull.password).not.toBe(null);
		expect(UserNameNull.full_name).not.toBe(null);

		const res = await request(app).post('/api/user').send(UserNameNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Name property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert user (Error: Email is Null)', async () => {
		expect(UserEmailNull.name).not.toBe(null);
		expect(UserEmailNull).not.toHaveProperty('email');
		expect(UserEmailNull.password).not.toBe(null);
		expect(UserEmailNull.full_name).not.toBe(null);

		const res = await request(app).post('/api/user').send(UserEmailNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Email property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});
	it('Testing insert user (Error: Password is Null)', async () => {
		expect(UserPasswordNull.name).not.toBe(null);
		expect(UserPasswordNull.email).not.toBe(null);
		expect(UserPasswordNull).not.toHaveProperty('password');
		expect(UserPasswordNull.full_name).not.toBe(null);

		const res = await request(app).post('/api/user').send(UserPasswordNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Password property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert user (Error: FullName is Null)', async () => {
		expect(UserFullNameNull.name).not.toBe(null);
		expect(UserFullNameNull.email).not.toBe(null);
		expect(UserFullNameNull.password).not.toBe(null);
		expect(UserFullNameNull).not.toHaveProperty('full_name');

		const res = await request(app).post('/api/user').send(UserFullNameNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Full_name property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});
});

describe('Test my POST /api/vehicledata response', () => {
	let id = '';
	afterAll(async () => {
		const response = await request(app).delete(`/api/vehicledata/${id}`);
	});
	it('Testing insert vehicledata (SUCCESS)', async () => {
		expect(VD_success.vin).not.toBe(null);
		expect(VD_success.odometer).not.toBe(null);
		expect(VD_success.tirePressure).not.toBe(null);
		expect(VD_success.status).not.toBe(null);
		expect(VD_success.batteryStatus).not.toBe(null);
		expect(VD_success.fuelLevel).not.toBe(null);
		expect(VD_success.latitude).not.toBe(null);
		expect(VD_success.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_success);

		id = res.body.VehicleData.id;

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('VehicleData');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Vin Already Exists)', async () => {
		expect(VD_VinAlreadyExists.vin).not.toBe(null);
		expect(VD_VinAlreadyExists.odometer).not.toBe(null);
		expect(VD_VinAlreadyExists.tirePressure).not.toBe(null);
		expect(VD_VinAlreadyExists.status).not.toBe(null);
		expect(VD_VinAlreadyExists.batteryStatus).not.toBe(null);
		expect(VD_VinAlreadyExists.fuelLevel).not.toBe(null);
		expect(VD_VinAlreadyExists.latitude).not.toBe(null);
		expect(VD_VinAlreadyExists.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_VinAlreadyExists);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Vin already in use. Please enter a valid Vin.`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Vin is Null)', async () => {
		expect(VD_VinNull).not.toHaveProperty('vin');
		expect(VD_VinNull.odometer).not.toBe(null);
		expect(VD_VinNull.tirePressure).not.toBe(null);
		expect(VD_VinNull.status).not.toBe(null);
		expect(VD_VinNull.batteryStatus).not.toBe(null);
		expect(VD_VinNull.fuelLevel).not.toBe(null);
		expect(VD_VinNull.latitude).not.toBe(null);
		expect(VD_VinNull.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_VinNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Vin property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Odometer is Null)', async () => {
		expect(VD_OdometerNull.vin).not.toBe(null);
		expect(VD_OdometerNull).not.toHaveProperty('odometer');
		expect(VD_OdometerNull.tirePressure).not.toBe(null);
		expect(VD_OdometerNull.status).not.toBe(null);
		expect(VD_OdometerNull.batteryStatus).not.toBe(null);
		expect(VD_OdometerNull.fuelLevel).not.toBe(null);
		expect(VD_OdometerNull.latitude).not.toBe(null);
		expect(VD_OdometerNull.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_OdometerNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Odometer property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: TirePressure is Null)', async () => {
		expect(VD_TirePressureNull.vin).not.toBe(null);
		expect(VD_TirePressureNull.odometer).not.toBe(null);
		expect(VD_TirePressureNull).not.toHaveProperty('tirePressure');
		expect(VD_TirePressureNull.status).not.toBe(null);
		expect(VD_TirePressureNull.batteryStatus).not.toBe(null);
		expect(VD_TirePressureNull.fuelLevel).not.toBe(null);
		expect(VD_TirePressureNull.latitude).not.toBe(null);
		expect(VD_TirePressureNull.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_TirePressureNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`TirePressure property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Status is Null)', async () => {
		expect(VD_StatusNull.vin).not.toBe(null);
		expect(VD_StatusNull.odometer).not.toBe(null);
		expect(VD_StatusNull.tirePressure).not.toBe(null);
		expect(VD_StatusNull).not.toHaveProperty('status');
		expect(VD_StatusNull.batteryStatus).not.toBe(null);
		expect(VD_StatusNull.fuelLevel).not.toBe(null);
		expect(VD_StatusNull.latitude).not.toBe(null);
		expect(VD_StatusNull.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_StatusNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Status property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: BatteryStatus is Null)', async () => {
		expect(VD_BatteryStatusNull.vin).not.toBe(null);
		expect(VD_BatteryStatusNull.odometer).not.toBe(null);
		expect(VD_BatteryStatusNull.tirePressure).not.toBe(null);
		expect(VD_BatteryStatusNull.status).not.toBe(null);
		expect(VD_BatteryStatusNull).not.toHaveProperty('batteryStatus');
		expect(VD_BatteryStatusNull.fuelLevel).not.toBe(null);
		expect(VD_BatteryStatusNull.latitude).not.toBe(null);
		expect(VD_BatteryStatusNull.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_BatteryStatusNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`BatteryStatus property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: FuelLevel is Null)', async () => {
		expect(VD_FuelLevelNull.vin).not.toBe(null);
		expect(VD_FuelLevelNull.odometer).not.toBe(null);
		expect(VD_FuelLevelNull.tirePressure).not.toBe(null);
		expect(VD_FuelLevelNull.status).not.toBe(null);
		expect(VD_FuelLevelNull.batteryStatus).not.toBe(null);
		expect(VD_FuelLevelNull).not.toHaveProperty('fuelLevel');
		expect(VD_FuelLevelNull.latitude).not.toBe(null);
		expect(VD_FuelLevelNull.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_FuelLevelNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`FuelLevel property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Latitude is Null)', async () => {
		expect(VD_LatitudeNull.vin).not.toBe(null);
		expect(VD_LatitudeNull.odometer).not.toBe(null);
		expect(VD_LatitudeNull.tirePressure).not.toBe(null);
		expect(VD_LatitudeNull.status).not.toBe(null);
		expect(VD_LatitudeNull.batteryStatus).not.toBe(null);
		expect(VD_LatitudeNull.fuelLevel).not.toBe(null);
		expect(VD_LatitudeNull).not.toHaveProperty('latitude');
		expect(VD_LatitudeNull.longitude).not.toBe(null);

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_LatitudeNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Latitude property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Longitude is Null)', async () => {
		expect(VD_LongitudeNull.vin).not.toBe(null);
		expect(VD_LongitudeNull.odometer).not.toBe(null);
		expect(VD_LongitudeNull.tirePressure).not.toBe(null);
		expect(VD_LongitudeNull.status).not.toBe(null);
		expect(VD_LongitudeNull.batteryStatus).not.toBe(null);
		expect(VD_LongitudeNull.fuelLevel).not.toBe(null);
		expect(VD_LongitudeNull.latitude).not.toBe(null);
		expect(VD_LongitudeNull).not.toHaveProperty('longitude');

		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_LongitudeNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Longitude property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});
});

// describe('Test my PUT /api/user response', () => {
// 	const id4 = 4;
// 	let olderUser = '';
// 	afterAll(async () => {
// 		const responsee = await request(app)
// 			.put(`/api/user/${id4}`)
// 			.send(olderUser)
// 			.expect(200);
// 	});
// 	it('Testing modify user', async () => {
// 		const user = {
// 			name: 'JEST5',
// 			email: 'fialho55@gmail.com.br',
// 			full_name: 'Miguel Fialho5',
// 		};

// 		expect(user.name).not.toBe(null);
// 		expect(user.email).not.toBe(null);
// 		expect(user.full_name).not.toBe(null);

// 		const olderUserRes = await request(app).get(`/api/users/${id4}`);
// 		olderUser = olderUserRes.body.User;

// 		const res = await request(app)
// 			.put(`/api/user/${id4}`)
// 			.send(user)
// 			.expect(200);

// 		expect(res.body.result).toHaveProperty('name', user.name);
// 		expect(res.body.result).toHaveProperty('email', user.email);
// 		expect(res.body.result).toHaveProperty('full_name', user.full_name);
// 	});
// });

// describe('Test my PUT /api/vehicle response', () => {
// 	const id5 = 41;
// 	let olderVehicle = '';
// 	afterAll(async () => {
// 		const responsee = await request(app)
// 			.put(`/api/vehicle/${id5}`)
// 			.send(olderVehicle)
// 			.expect(200);
// 	});
// 	it('Testing modify vehicle', async () => {
// 		const vehicle = {
// 			model: 'F-2204',
// 			sold: '7777777',
// 			connected: '8565557',
// 			softwareUpdates: '1574532',
// 		};

// 		expect(vehicle.model).not.toBe(null);
// 		expect(vehicle.sold).not.toBe(null);
// 		expect(vehicle.connected).not.toBe(null);
// 		expect(vehicle.softwareUpdates).not.toBe(null);

// 		const olderVehicleRes = await request(app).get(`/api/vehicles/${id5}`);
// 		olderVehicle = olderVehicleRes.body.Vehicle;

// 		const res = await request(app)
// 			.put(`/api/vehicle/${id5}`)
// 			.send(vehicle)
// 			.expect(200);

// 		expect(res.body.result).toHaveProperty('model', vehicle.model);
// 		expect(res.body.result).toHaveProperty('sold', vehicle.sold);
// 		expect(res.body.result).toHaveProperty('connected', vehicle.connected);
// 		expect(res.body.result).toHaveProperty(
// 			'softwareUpdates',
// 			vehicle.softwareUpdates
// 		);
// 	});
// });

// describe('Test my PUT /api/vehicledata response', () => {
// 	const id6 = 3;
// 	let olderVehicleData = '';
// 	afterAll(async () => {
// 		const responsees = await request(app)
// 			.put(`/api/vehicledata/${id6}`)
// 			.send({ olderVehicleData })
// 			.expect(200);
// 	});
// 	it('Testing modify vehicle data', async () => {
// 		const vehicleData = {
// 			vin: '66HHDUYS2Y63MIG99999',
// 			odometer: '9517532',
// 			tirePressure: '3579512',
// 			status: '1574532',
// 			batteryStatus: 'F1502',
// 			fuelLevel: '9517532',
// 			latitude: '3579512',
// 			longitude: '1574532',
// 		};

// 		expect(vehicleData.vin).not.toBe(null);
// 		expect(vehicleData.odometer).not.toBe(null);
// 		expect(vehicleData.tirePressure).not.toBe(null);
// 		expect(vehicleData.status).not.toBe(null);
// 		expect(vehicleData.batteryStatus).not.toBe(null);
// 		expect(vehicleData.fuelLevel).not.toBe(null);
// 		expect(vehicleData.latitude).not.toBe(null);
// 		expect(vehicleData.longitude).not.toBe(null);

// 		const olderVehicledataRes = await request(app).get(
// 			`/api/vehiclesdata/${id6}`
// 		);

// 		olderVehicleData = olderVehicledataRes.body.VehicleData;
// 		// console.log(olderVehicleData);

// 		const res = await request(app)
// 			.put(`/api/vehicledata/${id6}`)
// 			.send(vehicleData)
// 			.expect(200);

// 		expect(res.body.result).toHaveProperty('vin', vehicleData.vin);
// 		expect(res.body.result).toHaveProperty(
// 			'odometer',
// 			vehicleData.odometer
// 		);
// 		expect(res.body.result).toHaveProperty(
// 			'tirePressure',
// 			vehicleData.tirePressure
// 		);
// 		expect(res.body.result).toHaveProperty('status', vehicleData.status);
// 		expect(res.body.result).toHaveProperty(
// 			'batteryStatus',
// 			vehicleData.batteryStatus
// 		);
// 		expect(res.body.result).toHaveProperty(
// 			'fuelLevel',
// 			vehicleData.fuelLevel
// 		);
// 		expect(res.body.result).toHaveProperty(
// 			'latitude',
// 			vehicleData.latitude
// 		);
// 		expect(res.body.result).toHaveProperty(
// 			'longitude',
// 			vehicleData.longitude
// 		);
// 	});
// });

// describe('Test my DELETE /api/user response', () => {
// 	let id = '';
// 	beforeAll(async () => {
// 		const user = {
// 			name: 'DELETE',
// 			email: 'deleteTeste@gmail.com.br',
// 			password: 'teste2',
// 			full_name: 'DELETE TEST',
// 		};

// 		expect(user.name).not.toBe(null);
// 		expect(user.email).not.toBe(null);
// 		expect(user.password).not.toBe(null);
// 		expect(user.full_name).not.toBe(null);

// 		const res = await request(app).post('/api/user').send(user);

// 		id = res.body.result.id;

// 		expect(id).not.toBe(null);
// 		expect(res.body).toBeInstanceOf(Object);
// 	});
// 	afterAll(async () => {
// 		const verify = await request(app).delete(`/api/user/${id}`);
// 		expect(verify.statusCode).toBe(404);
// 	});
// 	it('Testing delete user', async () => {
// 		const response = await request(app).delete(`/api/user/${id}`);
// 		expect(response.statusCode).toBe(200);
// 	});
// });

// describe('Test my DELETE /api/vehicle response', () => {
// 	let id = '';
// 	beforeAll(async () => {
// 		const vehicle = {
// 			model: 'T-DEL01',
// 			sold: '9517532',
// 			connected: '3579512',
// 			softwareUpdates: '1574532',
// 		};

// 		expect(vehicle.name).not.toBe(null);
// 		expect(vehicle.email).not.toBe(null);
// 		expect(vehicle.password).not.toBe(null);
// 		expect(vehicle.full_name).not.toBe(null);

// 		const res = await request(app).post('/api/vehicle').send(vehicle);

// 		id = res.body.result.id;

// 		expect(id).not.toBe(null);
// 		expect(res.body).toBeInstanceOf(Object);
// 	});
// 	afterAll(async () => {
// 		const verify = await request(app).delete(`/api/vehicle/${id}`);
// 		expect(verify.statusCode).toBe(404);
// 	});
// 	it('Deleting vehicle ', async () => {
// 		const response = await request(app).delete(`/api/vehicle/${id}`);
// 		expect(response.statusCode).toBe(200);
// 	});
// });
