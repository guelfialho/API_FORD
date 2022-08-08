import { genSaltSync, hashSync } from 'bcrypt'; // DEFAULT USERS MUST ALSO HAVE THEIR PASSWORD ENCRYPTED.

class Tables {
	init(connection) {
		this.connection = connection;

		// CREATE TABLES
		// ---------------------------------------
		this.createUserTable();
		this.createVehicleTable();
		this.createVehicleDataTable();

		// INSERT DEFAULT USERS INTO USER TABLE
		// ---------------------------------------

		this.insertUser('Admin', 'admin@ford.com', '123456', 'Admin');
		this.insertUser('Miguel', 'miguel@ford.com', '123456', 'Miguel Fialho');

		// INSERT DEFAULT VEHICLES INTO VEHICLE TABLE
		// ---------------------------------------

		this.insertVehicle('Ranger', 145760, 70000, 27550);
		this.insertVehicle('Mustang', 1500, 500, 750);
		this.insertVehicle('Territory', 4560, 4000, 3050);
		this.insertVehicle('Bronco Sport', 7560, 4060, 2050);

		// INSERT DEFAULT VEHICLE DATA INTO VEHICLEDATA TABLE
		// ---------------------------------------
		this.insertVehicleData(
			'2FRHDUYS2Y63NHD22454',
			'23344',
			'36,36,35,34',
			'ON',
			'Ok',
			'76',
			'-12,2322',
			'-35,2314'
		);
		this.insertVehicleData(
			'2FRHTTTS2Y63NHD22455',
			'37344',
			'37,37,36,35',
			'ON',
			'Ok',
			'44',
			'-14,2322',
			'-25,2314'
		);
		this.insertVehicleData(
			'3MIGTSYS2Y63NHD22456',
			'46344',
			'38,38,36,35',
			'OFF',
			'Ok',
			'44',
			'-04,2322',
			'-65,2314'
		);
		this.insertVehicleData(
			'3MIGTPPP2Y63NHD22467',
			'98344',
			'39,39,36,35',
			'ON',
			'Ok',
			'44',
			'-02,2322',
			'-15,2314'
		);
		this.insertVehicleData(
			'4TICTPPP2Y63NHD22467',
			'21144',
			'40,40,37,36',
			'OFF',
			'Ok',
			'44',
			'-94,2322',
			'-05,2314'
		);
		this.insertVehicleData(
			'4TICTFFF2Y63NHD22467',
			'78954',
			'41,41,38,37',
			'ON',
			'Ok',
			'44',
			'-01,2322',
			'-07,2314'
		);
	}

	// ---------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------

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
			}
		});
	}

	// ---------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------

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
			}
		});
	}

	// ---------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------

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
			}
		});
	}

	// ---------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------

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
			}
		});
	}

	// ---------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------

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
			}
		});
	}

	// ---------------------------------------------------------------------------------
	// ---------------------------------------------------------------------------------

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
			}
		});
	}
}

// ---------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------

const table = new Tables();

export default table;
