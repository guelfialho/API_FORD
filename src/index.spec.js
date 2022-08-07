const app = require('./index');
const request = require('supertest');

const {
	VehicleSuccess,
	VehicleModelAlreadyExists,
	VehicleModelNull,
	VehicleSoldlNull,
	VehicleConnectedlNull,
	VehicleSoftwareUpdateslNull,
	VehicleToBeDeleted,
} = require('./test/vehicles/vehiclesConstants');

const {
	UserSuccess,
	UserEmailAlreadyExists,
	UserNameNull,
	UserEmailNull,
	UserPasswordNull,
	UserFullNameNull,
	updateUserSuccess,
	UserToBeDeleted,
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
	VD_ToBeDeleted,
} = require('./test/vehiclesData/vehiclesDataConstants');

let token;

const getUsers = function () {
	const res = request(app)
		.get('/api/users')
		.set('Authorization', `Bearer ${token}`);

	return res;
};

const getVehicles = function () {
	const res = request(app).get('/api/vehicles');
	return res;
};

const getVehicleData = function () {
	const res = request(app).get('/api/vehiclesdata');
	return res;
};

const addUser = function (user) {
	const res = request(app).post('/api/user').send(user);
	return res;
};

const addVehicle = function (vehicle) {
	const res = request(app).post('/api/vehicle').send(vehicle);
	return res;
};

const addVehicleData = function (vehicleData) {
	const res = request(app).post('/api/vehicledata').send(vehicleData);
	return res;
};

const updateUser = function (user) {};

const updateVehicle = function (vehicle) {};

const updateVehicleData = function (vehicleData) {};

const deleteVehicleData = function (id) {
	const response = request(app).delete(`/api/vehicledata/${id}`);
	return response;
};

const deleteVehicle = function (id) {
	const response = request(app).delete(`/api/vehicle/${id}`);
	return response;
};

const deleteUser = function (id) {
	const response = request(app).delete(`/api/user/${id}`);
	return response;
};

beforeAll((done) => {
	request(app)
		.post('/api/user/login')
		.send({
			email: 'admin@ford.com',
			password: '123456',
		})
		.end((err, response) => {
			token = response.body.token; // save the token!
			done();
		});
});

describe('Test my GET /api/users response', () => {
	it('Response body should be instance of Object', async () => {
		const res = await getUsers();
		expect(res.body).toBeInstanceOf(Object);
		expect(res.statusCode).toBe(200);
	});

	it('Response body should get properties', async () => {
		const res = await getUsers();

		expect(res.body).toHaveProperty('Users');
	});

	it('Property Users should be a instance of Array', async () => {
		const res = await getUsers();

		expect(res.body.Users).toBeInstanceOf(Array);
	});

	it('Element of Users array should have properties', async () => {
		const res = await getUsers();

		expect(res.body.Users[0]).toHaveProperty('id');
		expect(res.body.Users[0]).toHaveProperty('name');
		expect(res.body.Users[0]).toHaveProperty('email');
		expect(res.body.Users[0]).toHaveProperty('full_name');
	});

	it('Elements of Users array should have properties', async () => {
		const res = await getUsers();

		const users = res.body.Users;

		for (user of users) {
			expect(user).toHaveProperty('id');
			expect(user).toHaveProperty('name');
			expect(user).toHaveProperty('email');
			expect(user).toHaveProperty('full_name');
		}
	});

	it('Elements of Users array should not have their properties values empty', async () => {
		const res = await getUsers();

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
		const res = await getVehicles();
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Response body should get properties', async () => {
		const res = await getVehicles();

		expect(res.body).toHaveProperty('Vehicles');
	});

	it('Property Vehicles should be a instance of Array', async () => {
		const res = await getVehicles();
		expect(res.body.Vehicles).toBeInstanceOf(Array);
	});

	it('Elements of Vehicles array should have properties', async () => {
		const res = await getVehicles();
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
		const res = await getVehicles();
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
		const res = await getVehicleData();
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Response body should get properties', async () => {
		const res = await getVehicleData();

		expect(res.body).toHaveProperty('VehiclesData');
	});

	it('Property VehiclesData should be a instance of Array', async () => {
		const res = await getVehicleData();
		expect(res.body.VehiclesData).toBeInstanceOf(Array);
	});

	it('Elements of VehiclesData array should have properties', async () => {
		const res = await getVehicleData();
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
		const res = await getVehicleData();
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
		const response = await deleteVehicle(id);
	});
	it('Testing insert vehicle (SUCCESS)', async () => {
		const res = await addVehicle(VehicleSuccess);

		id = res.body.Vehicle.id;

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('Vehicle');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicle (Error: Model Already Exists)', async () => {
		const res = await addVehicle(VehicleModelAlreadyExists);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Model already exists. Please update it or insert a new one.`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicle (Error: Model is Empty)', async () => {
		const res = await addVehicle(VehicleModelNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Model property is required and cannot be empty`
		);
	});

	it('Testing insert vehicle (Error: Sold is Empty)', async () => {
		const res = await addVehicle(VehicleSoldlNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Sold property is required and cannot be empty`
		);
	});

	it('Testing insert vehicle (Error: Connected is Empty)', async () => {
		const res = await addVehicle(VehicleConnectedlNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Connected property is required and cannot be empty`
		);
	});

	it('Testing insert vehicle (Error: SoftwareUpdates is Empty)', async () => {
		const res = await addVehicle(VehicleSoftwareUpdateslNull);

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
		const response2 = await deleteUser(id);
	});
	it('Testing insert user (SUCCESS)', async () => {
		const res = await addUser(UserSuccess);

		id = res.body.User.id;

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('User');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert user (Error: Email Already Exists)', async () => {
		const res = await addUser(UserEmailAlreadyExists);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Email already in use. Please enter a valid email address`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert user (Error: Name is Null)', async () => {
		const res = await addUser(UserNameNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Name property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert user (Error: Email is Null)', async () => {
		const res = await addUser(UserEmailNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Email property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});
	it('Testing insert user (Error: Password is Null)', async () => {
		const res = await addUser(UserPasswordNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Password property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert user (Error: FullName is Null)', async () => {
		const res = await addUser(UserFullNameNull);

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
		const response = await deleteVehicleData(id);
	});
	it('Testing insert vehicledata (SUCCESS)', async () => {
		const res = await addVehicleData(VD_success);

		id = res.body.VehicleData.id;

		expect(res.statusCode).toBe(200);
		expect(res.body).toHaveProperty('VehicleData');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Vin Already Exists)', async () => {
		const res = await addVehicleData(VD_VinAlreadyExists);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Vin already in use. Please enter a valid Vin.`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Vin is Null)', async () => {
		const res = await addVehicleData(VD_VinNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Vin property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Odometer is Null)', async () => {
		const res = await addVehicleData(VD_OdometerNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Odometer property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: TirePressure is Null)', async () => {
		const res = await addVehicleData(VD_TirePressureNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`TirePressure property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Status is Null)', async () => {
		const res = await addVehicleData(VD_StatusNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Status property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: BatteryStatus is Null)', async () => {
		const res = await addVehicleData(VD_BatteryStatusNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`BatteryStatus property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: FuelLevel is Null)', async () => {
		const res = await addVehicleData(VD_FuelLevelNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`FuelLevel property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Latitude is Null)', async () => {
		const res = await addVehicleData(VD_LatitudeNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Latitude property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing insert vehicledata (Error: Longitude is Null)', async () => {
		const res = await addVehicleData(VD_LongitudeNull);

		expect(res.statusCode).toBe(400);
		expect(res.body).toHaveProperty(
			'error',
			`Longitude property is required and cannot be empty`
		);
		expect(res.body).toBeInstanceOf(Object);
	});
});

describe('Test my PUT /api/user response', () => {
	const id = 2;
	let olderUser = '';
	afterAll(async () => {
		const responsee = await request(app)
			.put(`/api/user/${id}`)
			.send(olderUser)
			.expect(200);
	});
	it('Testing modify user (SUCCESS)', async () => {
		expect(updateUserSuccess.name).not.toBe(null);
		expect(updateUserSuccess.email).not.toBe(null);
		expect(updateUserSuccess.full_name).not.toBe(null);

		const olderUserRes = await request(app).get(`/api/users/${id}`);
		olderUser = olderUserRes.body.User;

		const res = await request(app)
			.put(`/api/user/${id}`)
			.send(updateUserSuccess)
			.expect(200);

		expect(res.body.User).toHaveProperty('name', updateUserSuccess.name);
		expect(res.body.User).toHaveProperty('email', updateUserSuccess.email);
		expect(res.body.User).toHaveProperty(
			'full_name',
			updateUserSuccess.full_name
		);
	});

	it('Testing modify user (Error: Invalid ID)', async () => {
		idInvalid = 0;
		expect(UserSuccess.name).not.toBe(null);
		expect(UserSuccess.email).not.toBe(null);
		expect(UserSuccess.full_name).not.toBe(null);

		const res = await request(app)
			.put(`/api/user/${idInvalid}`)
			.send(UserSuccess)
			.expect(404);

		expect(res.body).toHaveProperty(
			'error',
			`User(id ${idInvalid}) not found.`
		);
	});

	it('Testing modify user (Error: Email Already Exists)', async () => {
		expect(UserEmailAlreadyExists.name).not.toBe(null);
		expect(UserEmailAlreadyExists.email).not.toBe(null);
		expect(UserEmailAlreadyExists.full_name).not.toBe(null);

		const res = await request(app)
			.put(`/api/user/${id}`)
			.send(UserEmailAlreadyExists)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Email already in use. Please enter a valid email address`
		);
	});

	it('Testing modify user (Error: Name is Null)', async () => {
		expect(UserNameNull).not.toHaveProperty('name');
		expect(UserNameNull.email).not.toBe(null);
		expect(UserNameNull.full_name).not.toBe(null);

		const res = await request(app)
			.put(`/api/user/${id}`)
			.send(UserNameNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Name property is required and cannot be empty`
		);
	});

	it('Testing modify user (Error: Email is Null)', async () => {
		expect(UserEmailNull.name).not.toBe(null);
		expect(UserEmailNull).not.toHaveProperty('email');
		expect(UserEmailNull.full_name).not.toBe(null);

		const res = await request(app)
			.put(`/api/user/${id}`)
			.send(UserEmailNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Email property is required and cannot be empty`
		);
	});

	it('Testing modify user (Error: Full_name is Null)', async () => {
		expect(UserFullNameNull.name).not.toBe(null);
		expect(UserFullNameNull.email).not.toBe(null);
		expect(UserFullNameNull).not.toHaveProperty('full_name');

		const res = await request(app)
			.put(`/api/user/${id}`)
			.send(UserFullNameNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Full_name property is required and cannot be empty`
		);
	});
});

describe('Test my PUT /api/vehicle response', () => {
	const id = 2;
	let olderVehicle = '';
	afterAll(async () => {
		const responsee = await request(app)
			.put(`/api/vehicle/${id}`)
			.send(olderVehicle)
			.expect(200);
	});
	it('Testing modify vehicle (SUCCESS)', async () => {
		expect(VehicleSuccess.model).not.toBe(null);
		expect(VehicleSuccess.sold).not.toBe(null);
		expect(VehicleSuccess.connected).not.toBe(null);
		expect(VehicleSuccess.softwareUpdates).not.toBe(null);

		const olderVehicleRes = await request(app).get(`/api/vehicles/${id}`);
		olderVehicle = olderVehicleRes.body.Vehicle;

		const res = await request(app)
			.put(`/api/vehicle/${id}`)
			.send(VehicleSuccess)
			.expect(200);

		expect(res.body.Vehicle).toHaveProperty('model', VehicleSuccess.model);
		expect(res.body.Vehicle).toHaveProperty('sold', VehicleSuccess.sold);
		expect(res.body.Vehicle).toHaveProperty(
			'connected',
			VehicleSuccess.connected
		);
		expect(res.body.Vehicle).toHaveProperty(
			'softwareUpdates',
			VehicleSuccess.softwareUpdates
		);
	});

	it('Testing modify vehicle (Error: ID Invalid)', async () => {
		let idInvalid = 0;
		expect(VehicleSuccess.model).not.toBe(null);
		expect(VehicleSuccess.sold).not.toBe(null);
		expect(VehicleSuccess.connected).not.toBe(null);
		expect(VehicleSuccess.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicle/${idInvalid}`)
			.send(VehicleSuccess)
			.expect(404);

		expect(res.body).toHaveProperty(
			'error',
			`Vehicle (id ${idInvalid}) not found.`
		);
	});

	it('Testing modify vehicle (Error: Model Already Exists)', async () => {
		expect(VehicleModelAlreadyExists.model).not.toBe(null);
		expect(VehicleModelAlreadyExists.sold).not.toBe(null);
		expect(VehicleModelAlreadyExists.connected).not.toBe(null);
		expect(VehicleModelAlreadyExists.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicle/${id}`)
			.send(VehicleModelAlreadyExists)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Model already exists. Please insert a new one.`
		);
	});

	it('Testing modify vehicle (Error: Model is Null)', async () => {
		expect(VehicleModelNull).not.toHaveProperty('model');
		expect(VehicleModelNull.sold).not.toBe(null);
		expect(VehicleModelNull.connected).not.toBe(null);
		expect(VehicleModelNull.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicle/${id}`)
			.send(VehicleModelNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Model property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle (Error: Sold is Null)', async () => {
		expect(VehicleSoldlNull.model).not.toBe(null);
		expect(VehicleSoldlNull).not.toHaveProperty('sold');
		expect(VehicleSoldlNull.connected).not.toBe(null);
		expect(VehicleSoldlNull.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicle/${id}`)
			.send(VehicleSoldlNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Sold property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle (Error: Connected is Null)', async () => {
		expect(VehicleConnectedlNull.model).not.toBe(null);
		expect(VehicleConnectedlNull.sold).not.toBe(null);
		expect(VehicleConnectedlNull).not.toHaveProperty('connected');
		expect(VehicleConnectedlNull.softwareUpdates).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicle/${id}`)
			.send(VehicleConnectedlNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Connected property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle (Error: SoftwareUpdates is Null)', async () => {
		expect(VehicleSoftwareUpdateslNull.model).not.toBe(null);
		expect(VehicleSoftwareUpdateslNull.sold).not.toBe(null);
		expect(VehicleSoftwareUpdateslNull.connected).not.toBe(null);
		expect(VehicleSoftwareUpdateslNull).not.toHaveProperty(
			'softwareUpdates'
		);

		const res = await request(app)
			.put(`/api/vehicle/${id}`)
			.send(VehicleSoftwareUpdateslNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`SoftwareUpdates property is required and cannot be empty`
		);
	});
});

describe('Test my PUT /api/vehicledata response', () => {
	const id = 2;
	let olderVehicleData = '';
	afterAll(async () => {
		const responsees = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(olderVehicleData)
			.expect(200);
	});
	it('Testing modify vehicle data (SUCCESS)', async () => {
		expect(VD_success.vin).not.toBe(null);
		expect(VD_success.odometer).not.toBe(null);
		expect(VD_success.tirePressure).not.toBe(null);
		expect(VD_success.status).not.toBe(null);
		expect(VD_success.batteryStatus).not.toBe(null);
		expect(VD_success.fuelLevel).not.toBe(null);
		expect(VD_success.latitude).not.toBe(null);
		expect(VD_success.longitude).not.toBe(null);

		const olderVehicledataRes = await request(app).get(
			`/api/vehiclesdata/${id}`
		);

		olderVehicleData = olderVehicledataRes.body.VehicleData;

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_success)
			.expect(200);

		expect(res.body.VehicleData).toHaveProperty('vin', VD_success.vin);
	});

	it('Testing modify vehicle data (Error: ID invalid)', async () => {
		let invalidID = 0;

		expect(VD_success.vin).not.toBe(null);
		expect(VD_success.odometer).not.toBe(null);
		expect(VD_success.tirePressure).not.toBe(null);
		expect(VD_success.status).not.toBe(null);
		expect(VD_success.batteryStatus).not.toBe(null);
		expect(VD_success.fuelLevel).not.toBe(null);
		expect(VD_success.latitude).not.toBe(null);
		expect(VD_success.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${invalidID}`)
			.send(VD_success)
			.expect(404);

		expect(res.body).toHaveProperty(
			'error',
			`Vehicle (id: ${invalidID}) not found`
		);
	});

	it('Testing modify vehicle data (Error: Vin Already Exists )', async () => {
		expect(VD_VinAlreadyExists.vin).not.toBe(null);
		expect(VD_VinAlreadyExists.odometer).not.toBe(null);
		expect(VD_VinAlreadyExists.tirePressure).not.toBe(null);
		expect(VD_VinAlreadyExists.status).not.toBe(null);
		expect(VD_VinAlreadyExists.batteryStatus).not.toBe(null);
		expect(VD_VinAlreadyExists.fuelLevel).not.toBe(null);
		expect(VD_VinAlreadyExists.latitude).not.toBe(null);
		expect(VD_VinAlreadyExists.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_VinAlreadyExists)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Vin already in use. Please enter a valid Vin.`
		);
	});

	it('Testing modify vehicle data (Error: Vin is Null )', async () => {
		expect(VD_VinNull).not.toHaveProperty('vin');
		expect(VD_VinNull.odometer).not.toBe(null);
		expect(VD_VinNull.tirePressure).not.toBe(null);
		expect(VD_VinNull.status).not.toBe(null);
		expect(VD_VinNull.batteryStatus).not.toBe(null);
		expect(VD_VinNull.fuelLevel).not.toBe(null);
		expect(VD_VinNull.latitude).not.toBe(null);
		expect(VD_VinNull.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_VinNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Vin property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Odometer is Null )', async () => {
		expect(VD_OdometerNull.vin).not.toBe(null);
		expect(VD_OdometerNull).not.toHaveProperty('odometer');
		expect(VD_OdometerNull.tirePressure).not.toBe(null);
		expect(VD_OdometerNull.status).not.toBe(null);
		expect(VD_OdometerNull.batteryStatus).not.toBe(null);
		expect(VD_OdometerNull.fuelLevel).not.toBe(null);
		expect(VD_OdometerNull.latitude).not.toBe(null);
		expect(VD_OdometerNull.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_OdometerNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Odometer property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Odometer is Null )', async () => {
		expect(VD_OdometerNull.vin).not.toBe(null);
		expect(VD_OdometerNull).not.toHaveProperty('odometer');
		expect(VD_OdometerNull.tirePressure).not.toBe(null);
		expect(VD_OdometerNull.status).not.toBe(null);
		expect(VD_OdometerNull.batteryStatus).not.toBe(null);
		expect(VD_OdometerNull.fuelLevel).not.toBe(null);
		expect(VD_OdometerNull.latitude).not.toBe(null);
		expect(VD_OdometerNull.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_OdometerNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Odometer property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: TirePressure is Null )', async () => {
		expect(VD_TirePressureNull.vin).not.toBe(null);
		expect(VD_TirePressureNull.odometer).not.toBe(null);
		expect(VD_TirePressureNull).not.toHaveProperty('tirePressure');
		expect(VD_TirePressureNull.status).not.toBe(null);
		expect(VD_TirePressureNull.batteryStatus).not.toBe(null);
		expect(VD_TirePressureNull.fuelLevel).not.toBe(null);
		expect(VD_TirePressureNull.latitude).not.toBe(null);
		expect(VD_TirePressureNull.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_TirePressureNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`TirePressure property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Status is Null )', async () => {
		expect(VD_StatusNull.vin).not.toBe(null);
		expect(VD_StatusNull.odometer).not.toBe(null);
		expect(VD_StatusNull.tirePressure).not.toBe(null);
		expect(VD_StatusNull).not.toHaveProperty('status');
		expect(VD_StatusNull.batteryStatus).not.toBe(null);
		expect(VD_StatusNull.fuelLevel).not.toBe(null);
		expect(VD_StatusNull.latitude).not.toBe(null);
		expect(VD_StatusNull.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_StatusNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Status property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: BatteryStatus is Null )', async () => {
		expect(VD_BatteryStatusNull.vin).not.toBe(null);
		expect(VD_BatteryStatusNull.odometer).not.toBe(null);
		expect(VD_BatteryStatusNull.tirePressure).not.toBe(null);
		expect(VD_BatteryStatusNull.status).not.toBe(null);
		expect(VD_BatteryStatusNull).not.toHaveProperty('batteryStatus');
		expect(VD_BatteryStatusNull.fuelLevel).not.toBe(null);
		expect(VD_BatteryStatusNull.latitude).not.toBe(null);
		expect(VD_BatteryStatusNull.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_BatteryStatusNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`BatteryStatus property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: FuelLevel is Null )', async () => {
		expect(VD_FuelLevelNull.vin).not.toBe(null);
		expect(VD_FuelLevelNull.odometer).not.toBe(null);
		expect(VD_FuelLevelNull.tirePressure).not.toBe(null);
		expect(VD_FuelLevelNull.batteryStatus).not.toBe(null);
		expect(VD_FuelLevelNull.fuelLevel).not.toBe(null);
		expect(VD_FuelLevelNull).not.toHaveProperty('fuelLevel');
		expect(VD_FuelLevelNull.latitude).not.toBe(null);
		expect(VD_FuelLevelNull.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_FuelLevelNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`FuelLevel property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Latitude is Null )', async () => {
		expect(VD_LatitudeNull.vin).not.toBe(null);
		expect(VD_LatitudeNull.odometer).not.toBe(null);
		expect(VD_LatitudeNull.tirePressure).not.toBe(null);
		expect(VD_LatitudeNull.batteryStatus).not.toBe(null);
		expect(VD_LatitudeNull.fuelLevel).not.toBe(null);
		expect(VD_LatitudeNull.fuelLevel).not.toBe(null);
		expect(VD_LatitudeNull).not.toHaveProperty('latitude');
		expect(VD_LatitudeNull.longitude).not.toBe(null);

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_LatitudeNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Latitude property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Longitude is Null )', async () => {
		expect(VD_LongitudeNull.vin).not.toBe(null);
		expect(VD_LongitudeNull.odometer).not.toBe(null);
		expect(VD_LongitudeNull.tirePressure).not.toBe(null);
		expect(VD_LongitudeNull.batteryStatus).not.toBe(null);
		expect(VD_LongitudeNull.fuelLevel).not.toBe(null);
		expect(VD_LongitudeNull.fuelLevel).not.toBe(null);
		expect(VD_LongitudeNull.latitude).not.toBe(null);
		expect(VD_LongitudeNull).not.toHaveProperty('longitude');

		const res = await request(app)
			.put(`/api/vehicledata/${id}`)
			.send(VD_LongitudeNull)
			.expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Longitude property is required and cannot be empty`
		);
	});
});

describe('Test my DELETE /api/user response', () => {
	let id = '';
	let invalidID = 0;
	beforeAll(async () => {
		const res = await request(app).post('/api/user').send(UserToBeDeleted);

		id = res.body.User.id;

		expect(id).not.toBe(null);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Testing delete user (SUCCESS)', async () => {
		const response = await deleteUser(id);
		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty(
			'message',
			`User id: ${id} successfuly deleted`
		);
	});

	it('Testing delete user (ERROR: INVALID ID) ', async () => {
		const verifyDelete = await deleteUser(invalidID);

		expect(verifyDelete.statusCode).toBe(404);
		expect(verifyDelete.body).toHaveProperty(
			'error',
			`User(id ${invalidID}) not found.`
		);
	});
});

describe('Test my DELETE /api/vehicle response', () => {
	let id = '';
	let invalidID = 0;
	beforeAll(async () => {
		const res = await request(app)
			.post('/api/vehicle')
			.send(VehicleToBeDeleted);

		id = res.body.Vehicle.id;

		expect(id).not.toBe(null);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Deleting vehicle (SUCCESS)', async () => {
		const response = await deleteVehicle(id);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty(
			'message',
			`${VehicleToBeDeleted.model} successfully deleted!`
		);
	});

	it('Deleting vehicle (ERROR: INVALID ID)', async () => {
		const response = await deleteVehicle(invalidID);

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty(
			'error',
			`Vehicle (id: ${invalidID}) not found.`
		);
	});
});

describe('Test my DELETE /api/vehicledata response', () => {
	let id = '';
	let invalidID = 0;
	beforeAll(async () => {
		const res = await request(app)
			.post('/api/vehicledata')
			.send(VD_ToBeDeleted);

		id = res.body.VehicleData.id;

		expect(id).not.toBe(null);
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Deleting vehicle data (SUCCESS)', async () => {
		const response = await deleteVehicleData(id);

		expect(response.statusCode).toBe(200);
		expect(response.body).toHaveProperty(
			'message',
			`${VD_ToBeDeleted.vin} successfully deleted!`
		);
	});

	it('Deleting vehicle data (ERROR: INVALID ID)', async () => {
		const response = await deleteVehicleData(invalidID);

		expect(response.statusCode).toBe(404);
		expect(response.body).toHaveProperty(
			'error',
			`Vehicle data (id: ${invalidID}) not found`
		);
	});
});
