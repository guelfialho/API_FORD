import { Vehicle } from "../../interfaces/Vehicle";
import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function insertVehicle(vehicle: Vehicle): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO vehicle (model, sold, connected, softwareUpdates) VALUES (?, ?, ?, ?)`,
      [vehicle.model, vehicle.sold, vehicle.connected, vehicle.softwareUpdates],
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

export { insertVehicle };
