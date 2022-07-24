class Tabelas {
	init(connection) {
		this.connection = connection;
		this.createUserTable();
		this.createVehicleTable();
		this.createVehicleDataTable();
	}

	createUserTable() {
		const USER_SCHEMA = `
        CREATE TABLE IF NOT EXISTS USER (
            id INTEGER PRIMARY KEY AUTO_INCREMENT, 
            name VARCHAR(30) NOT NULL UNIQUE, 
            email VARCHAR(255) NOT NULL, 
            password VARCHAR(255) NOT NULL,
            full_name VARCHAR(40) NOT NULL, 
            join_date TIMESTAMP DEFAULT current_timestamp
        )`;

		this.connection.query(USER_SCHEMA, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log(`Tabela de usuário criada com sucesso`);
			}
		});
	}

	createVehicleTable() {
		const VEHICLE_SCHEMA = `
        CREATE TABLE IF NOT EXISTS VEHICLE (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            model VARCHAR(60) NOT NULL, 
            sold INTEGER NOT NULL,
            connected INTEGER NOT NULL,
            softwareUpdates INTEGER NOT NULL
        )`;

		this.connection.query(VEHICLE_SCHEMA, (error) => {
			if (error) {
				console.log(error);
			} else {
				console.log(`Tabela de veículo criada com sucesso`);
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
				console.log(`Tabela de dados de veículo criada com sucesso`);
			}
		});
	}
}

module.exports = new Tabelas();
