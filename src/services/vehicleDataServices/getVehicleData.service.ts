import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function getVehicleData(): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, 
                vin, 
                odometer, 
                tirePressure,
                status,
                batteryStatus,
                fuelLevel,
                latitude,
                longitude FROM vehicledata`,
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
export { getVehicleData };
