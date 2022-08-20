const VEHICLE_SCHEMA = `
        CREATE TABLE IF NOT EXISTS VEHICLE (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            model VARCHAR(60) NOT NULL UNIQUE, 
            sold INTEGER NOT NULL,
            connected INTEGER NOT NULL,
            softwareUpdates INTEGER NOT NULL
        )`;

export default VEHICLE_SCHEMA;
