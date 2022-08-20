const USER_SCHEMA = `
        CREATE TABLE IF NOT EXISTS USER (
            id INTEGER PRIMARY KEY AUTO_INCREMENT, 
            name VARCHAR(30) NOT NULL , 
            email VARCHAR(255) NOT NULL UNIQUE, 
            password VARCHAR(255) NOT NULL,
            fullName VARCHAR(40) NOT NULL, 
            joinDate TIMESTAMP DEFAULT current_timestamp
        )`;

export default USER_SCHEMA;
