import { Connection } from "mysql2";
import connection from "../../infra/connection";
import { VehicleData } from "../../interfaces/VehicleData";

const db: Connection = connection;

function updateVehicleData(vehicleData: VehicleData): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE vehicledata SET vin = ?, odometer = ?, tirePressure = ?, status = ?, batteryStatus = ?, fuelLevel= ?, latitude = ?, longitude = ? WHERE id = ?",
      [
        vehicleData.vin,
        vehicleData.odometer,
        vehicleData.tirePressure,
        vehicleData.status,
        vehicleData.batteryStatus,
        vehicleData.fuelLevel,
        vehicleData.latitude,
        vehicleData.longitude,
        vehicleData.id,
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

export { updateVehicleData };
