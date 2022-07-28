const app = require('./index');
const request = require('supertest');

afterAll((done) => {
	done();
});

describe('Test my /api/users response', () => {
	it('Response body should be instance of Object', async () => {
		const res = await request(app).get('/api/users');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Response body should get properties', async () => {
		const res = await request(app).get('/api/users');
		expect(res.body).toHaveProperty('error');
		expect(res.body).toHaveProperty('Users');
	});

	it('Property Users should be a instance of Array', async () => {
		const res = await request(app).get('/api/users');
		expect(res.body.Users).toBeInstanceOf(Array);
	});

	it('Element of Users array should have properties', async () => {
		const res = await request(app).get('/api/users');
		console.log(res.body.Users[0]);
		expect(res.body.Users[0]).toHaveProperty('id');
		expect(res.body.Users[0]).toHaveProperty('name');
		expect(res.body.Users[0]).toHaveProperty('email');
		expect(res.body.Users[0]).toHaveProperty('full_name');
	});

	it('Elements of Users array should have properties', async () => {
		const res = await request(app).get('/api/users');
		const users = res.body.Users;

		for (user of users) {
			expect(user).toHaveProperty('id');
			expect(user).toHaveProperty('name');
			expect(user).toHaveProperty('email');
			expect(user).toHaveProperty('full_name');
		}
	});

	it('Elements of Users array should not have their properties values empty', async () => {
		const res = await request(app).get('/api/users');
		const users = res.body.Users;

		for (user of users) {
			expect(user.id).not.toBe(null);
			expect(user.name).not.toBe(null);
			expect(user.email).not.toBe(null);
			expect(user.full_name).not.toBe(null);
		}
	});
});

describe('Test my /api/vehicles response', () => {
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

describe('Test my /api/vehicledata response', () => {
	it('Response body should be instance of Object', async () => {
		const res = await request(app).get('/api/vehiclesdata');
		expect(res.body).toBeInstanceOf(Object);
	});

	it('Response body should get properties', async () => {
		const res = await request(app).get('/api/vehiclesdata');
		expect(res.body).toHaveProperty('error');
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
