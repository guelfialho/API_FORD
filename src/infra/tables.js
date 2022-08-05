const { genSaltSync, hashSync } = require('bcrypt');

class Tabelas {
	init(connection) {
		this.connection = connection;
		this.createUserTable();
		this.createVehicleTable();
		this.createVehicleDataTable();
		this.insertVehicle('Ranger', 222760, 25000, 22550);
		this.insertVehicle('Bronco', 145760, 70000, 27550);
		this.insertVehicleData(
			'2FRHDUYS2Y63NHD22454',
			'23344',
			'36,36,35,34',
			'on',
			'Ok',
			'76',
			'-12,2322',
			'-35,2314'
		);
		this.insertVehicleData(
			'5555DUYS2Y63NHD22454',
			'23344',
			'36,36,35,34',
			'on',
			'Ok',
			'76',
			'-12,2322',
			'-35,2314'
		);
		this.insertUser('admin', 'admin@ford.com', '123456', 'Admin');
		this.insertUser('teste', 'teste@ford.com', '123456', 'Teste');
	}

	createUserTable() {
		const USER_SCHEMA = `
        CREATE TABLE IF NOT EXISTS USER (
            id INTEGER PRIMARY KEY AUTO_INCREMENT, 
            name VARCHAR(30) NOT NULL , 
            email VARCHAR(255) NOT NULL UNIQUE, 
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(40) NOT NULL, 
            join_date TIMESTAMP DEFAULT current_timestamp
        )`;

		this.connection.query(USER_SCHEMA, (error) => {
			if (error) {
				console.log(error);
			} else {
				// console.log(`Tabela de usuário criada com sucesso`);
			}
		});
	}

	createVehicleTable() {
		const VEHICLE_SCHEMA = `
        CREATE TABLE IF NOT EXISTS VEHICLE (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            model VARCHAR(60) NOT NULL UNIQUE, 
            sold INTEGER NOT NULL,
            connected INTEGER NOT NULL,
            softwareUpdates INTEGER NOT NULL
        )`;

		this.connection.query(VEHICLE_SCHEMA, (error) => {
			if (error) {
				console.log(error);
			} else {
				// console.log(`Tabela de veículo criada com sucesso`);
			}
		});
	}

	createVehicleDataTable() {
		const VEHICLEDATA_SCHEMA = `
        CREATE TABLE IF NOT EXISTS VEHICLEDATA (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            vin VARCHAR(20) NOT NULL UNIQUE, 
            odometer VARCHAR(30) NOT NULL, 
            tirePressure VARCHAR(30) NOT NULL,
            status VARCHAR(30) NOT NULL,
            batteryStatus VARCHAR(30) NOT NULL,
            fuelLevel VARCHAR(30) NOT NULL,
            latitude VARCHAR(30) NOT NULL,
            longitude VARCHAR(30) NOT NULL
        )`;

		this.connection.query(VEHICLEDATA_SCHEMA, (error) => {
			if (error) {
				console.log(error);
			} else {
				// console.log(`Tabela de dados de veículo criada com sucesso`);
			}
		});
	}

	insertVehicle(model, sold, connected, softwareUpdates) {
		const INSERT_VEHICLE = `
		INSERT INTO VEHICLE (
			model, 
			sold,
			connected,
			softwareUpdates
		) SELECT '${model}', ${sold}, ${connected}, ${softwareUpdates} WHERE NOT EXISTS (SELECT * FROM VEHICLE WHERE model = '${model}')`;

		this.connection.query(INSERT_VEHICLE, (error) => {
			if (error) {
				console.log(error);
			} else {
				// console.log(`Veículo inserido com sucesso!`);
			}
		});
	}

	insertVehicleData(
		vin,
		odometer,
		tirePressure,
		status,
		batteryStatus,
		fuelLevel,
		latitude,
		longitude
	) {
		const INSERT_VEHICLEDATA = `
		INSERT INTO VEHICLEDATA (
			vin, 
			odometer, 
			tirePressure,
			status,
			batteryStatus,
			fuelLevel,
			latitude,
			longitude
		) SELECT '${vin}', '${odometer}', '${tirePressure}', '${status}', '${batteryStatus}', '${fuelLevel}', '${latitude}', '${longitude}' WHERE NOT EXISTS (SELECT * FROM VEHICLEDATA WHERE vin = '${vin}')
		`;

		this.connection.query(INSERT_VEHICLEDATA, (error) => {
			if (error) {
				console.log(error);
			} else {
				// console.log(`Dados de veículo inserido com sucesso`);
			}
		});
	}

	insertUser(name, email, password, full_name) {
		const salt = genSaltSync(10);
		password = hashSync(password, salt);

		const INSERT_USER = `
		INSERT INTO user (
    		name, 
    		email,
    		password,
    		full_name
		) SELECT '${name}', '${email}', '${password}', '${full_name}' WHERE NOT EXISTS (SELECT * FROM user WHERE name = '${name}')`;
		this.connection.query(INSERT_USER, (error) => {
			if (error) {
				console.log(error);
			} else {
				// console.log(`Usuário inserido com sucesso`);
			}
		});
	}
}

module.exports = new Tabelas();
