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
export default VEHICLEDATA_SCHEMA;
