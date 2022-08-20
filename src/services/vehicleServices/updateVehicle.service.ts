import { Connection } from "mysql2";
import connection from "../../infra/connection";
import { Vehicle } from "../../interfaces/Vehicle";

const db: Connection = connection;

function updateVehicle(vehicle: Vehicle): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE vehicle SET model = ?, sold = ?, connected = ?, softwareUpdates = ? WHERE id = ?",
      [
        vehicle.model,
        vehicle.sold,
        vehicle.connected,
        vehicle.softwareUpdates,
        vehicle.id,
      ],
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

export { updateVehicle };
