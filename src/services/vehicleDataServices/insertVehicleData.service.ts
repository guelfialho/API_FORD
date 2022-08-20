import { VehicleData } from "./../../interfaces/VehicleData";
import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function insertVehicleData(vehicleData: VehicleData): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO vehicledata (vin,
					odometer,
					tirePressure,
					status,
					batteryStatus,
					fuelLevel,
					latitude,
					longitude) VALUES (?, ?, ?, ?, ? , ?, ?, ?)`,
      [
        vehicleData.vin,
        vehicleData.odometer,
        vehicleData.tirePressure,
        vehicleData.status,
        vehicleData.batteryStatus,
        vehicleData.fuelLevel,
        vehicleData.latitude,
        vehicleData.longitude,
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

export { insertVehicleData };
