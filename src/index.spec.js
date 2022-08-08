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
	insertVehicleUpdate,
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
	insertUpdateUser,
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
	VD_insertToUpdate,
} = require('./test/vehiclesData/vehiclesDataConstants');

let token;

const getUsers = function () {
	const res = request(app).get('/api/users').set('x-access-token', token);

	return res;
};

const getVehicles = function () {
	const res = request(app).get('/api/vehicles').set('x-access-token', token);
	return res;
};

const getVehicleData = function () {
	const res = request(app)
		.get('/api/vehiclesdata')
		.set('x-access-token', token);
	return res;
};

const addUser = function (user) {
	const res = request(app)
		.post('/api/user')
		.send(user)
		.set('x-access-token', token);
	return res;
};

const addVehicle = function (vehicle) {
	const res = request(app)
		.post('/api/vehicle')
		.send(vehicle)
		.set('x-access-token', token);
	return res;
};

const addVehicleData = function (vehicleData) {
	const res = request(app)
		.post('/api/vehicledata')
		.send(vehicleData)
		.set('x-access-token', token);
	return res;
};

const updateUser = function (user, id) {
	const res = request(app)
		.put(`/api/user/${id}`)
		.send(user)
		.set('x-access-token', token);
	return res;
};

const updateVehicle = function (vehicle, id) {
	const res = request(app)
		.put(`/api/vehicle/${id}`)
		.send(vehicle)
		.set('x-access-token', token);
	return res;
};

const updateVehicleData = function (vehicleData, id) {
	const res = request(app)
		.put(`/api/vehicledata/${id}`)
		.send(vehicleData)
		.set('x-access-token', token);
	return res;
};

const deleteVehicleData = function (id) {
	const response = request(app)
		.delete(`/api/vehicledata/${id}`)
		.set('x-access-token', token);
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
	let id = '';

	beforeAll(async () => {
		const newUpdateUser = await addUser(insertUpdateUser);
		id = newUpdateUser.body.User.id;
	});

	afterAll(async () => {
		const deleteNewUser = await deleteUser(id);
	});
	it('Testing modify user (SUCCESS)', async () => {
		const res = await updateUser(updateUserSuccess, id).expect(200);

		expect(res.body).toHaveProperty(
			'message',
			`User (id: ${id} successfully updated)`
		);
		expect(res.body).toHaveProperty('User');
	});

	it('Testing modify user (Error: Invalid ID)', async () => {
		idInvalid = 0;

		const res = await updateUser(UserSuccess, idInvalid).expect(404);

		expect(res.body).toHaveProperty(
			'error',
			`User(id ${idInvalid}) not found.`
		);
	});

	it('Testing modify user (Error: Email Already Exists)', async () => {
		expect(UserEmailAlreadyExists.name).not.toBe(null);
		expect(UserEmailAlreadyExists.email).not.toBe(null);
		expect(UserEmailAlreadyExists.full_name).not.toBe(null);

		const res = await updateUser(UserEmailAlreadyExists, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Email already in use. Please enter a valid email address`
		);
	});

	it('Testing modify user (Error: Name is Null)', async () => {
		const res = await updateUser(UserNameNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Name property is required and cannot be empty`
		);
	});

	it('Testing modify user (Error: Email is Null)', async () => {
		const res = await updateUser(UserEmailNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Email property is required and cannot be empty`
		);
	});

	it('Testing modify user (Error: Full_name is Null)', async () => {
		const res = await updateUser(UserFullNameNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Full_name property is required and cannot be empty`
		);
	});
});

describe('Test my PUT /api/vehicle response', () => {
	let id = '';
	let olderVehicle = '';
	beforeAll(async () => {
		const insertNewVehicle = await addVehicle(insertVehicleUpdate).expect(
			200
		);
		id = insertNewVehicle.body.Vehicle.id;
	});

	afterAll(async () => {
		const deleteNewVehicle = await deleteVehicle(id);
	});
	it('Testing modify vehicle (SUCCESS)', async () => {
		const res = await updateVehicle(VehicleSuccess, id).expect(200);

		expect(res.body).toHaveProperty('Vehicle');
	});

	it('Testing modify vehicle (Error: ID Invalid)', async () => {
		let idInvalid = 0;

		const res = await updateVehicle(VehicleSuccess, idInvalid).expect(404);

		expect(res.body).toHaveProperty(
			'error',
			`Vehicle (id ${idInvalid}) not found.`
		);
	});

	it('Testing modify vehicle (Error: Model Already Exists)', async () => {
		const res = await updateVehicle(VehicleModelAlreadyExists, id).expect(
			400
		);

		expect(res.body).toHaveProperty(
			'error',
			`Model already exists. Please insert a new one.`
		);
	});

	it('Testing modify vehicle (Error: Model is Null)', async () => {
		const res = await updateVehicle(VehicleModelNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Model property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle (Error: Sold is Null)', async () => {
		const res = await updateVehicle(VehicleSoldlNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Sold property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle (Error: Connected is Null)', async () => {
		const res = await updateVehicle(VehicleConnectedlNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Connected property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle (Error: SoftwareUpdates is Null)', async () => {
		const res = await updateVehicle(VehicleSoftwareUpdateslNull, id).expect(
			400
		);

		expect(res.body).toHaveProperty(
			'error',
			`SoftwareUpdates property is required and cannot be empty`
		);
	});
});

describe('Test my PUT /api/vehicledata response', () => {
	let id = '';
	beforeAll(async () => {
		const insertNewVehicleData = await addVehicleData(VD_insertToUpdate);
		id = insertNewVehicleData.body.VehicleData.id;
	});

	afterAll(async () => {
		const deleteNewVehicleData = await deleteVehicleData(id);
	});
	it('Testing modify vehicle data (SUCCESS)', async () => {
		const res = await updateVehicleData(VD_success, id).expect(200);

		expect(res.body.VehicleData).toHaveProperty('vin', VD_success.vin);
	});

	it('Testing modify vehicle data (Error: ID invalid)', async () => {
		let invalidID = 0;

		const res = await updateVehicleData(VD_success, invalidID).expect(404);

		expect(res.body).toHaveProperty(
			'error',
			`Vehicle (id: ${invalidID}) not found`
		);
	});

	it('Testing modify vehicle data (Error: Vin Already Exists )', async () => {
		const res = await updateVehicleData(VD_VinAlreadyExists, id).expect(
			400
		);

		expect(res.body).toHaveProperty(
			'error',
			`Vin already in use. Please enter a valid Vin.`
		);
	});

	it('Testing modify vehicle data (Error: Vin is Null )', async () => {
		const res = await updateVehicleData(VD_VinNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Vin property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Odometer is Null )', async () => {
		const res = await updateVehicleData(VD_OdometerNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Odometer property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: TirePressure is Null )', async () => {
		const res = await updateVehicleData(VD_TirePressureNull, id).expect(
			400
		);

		expect(res.body).toHaveProperty(
			'error',
			`TirePressure property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Status is Null )', async () => {
		const res = await updateVehicleData(VD_StatusNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Status property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: BatteryStatus is Null )', async () => {
		const res = await updateVehicleData(VD_BatteryStatusNull, id).expect(
			400
		);

		expect(res.body).toHaveProperty(
			'error',
			`BatteryStatus property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: FuelLevel is Null )', async () => {
		const res = await updateVehicleData(VD_FuelLevelNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`FuelLevel property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Latitude is Null )', async () => {
		const res = await updateVehicleData(VD_LatitudeNull, id).expect(400);

		expect(res.body).toHaveProperty(
			'error',
			`Latitude property is required and cannot be empty`
		);
	});

	it('Testing modify vehicle data (Error: Longitude is Null )', async () => {
		const res = await updateVehicleData(VD_LongitudeNull, id).expect(400);

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
