import { Connection } from "mysql2";
import { VehicleData } from "../../interfaces/VehicleData";
import {
  defaultVehicleData1,
  defaultVehicleData2,
  defaultVehicleData3,
  defaultVehicleData4,
  defaultVehicleData5,
  defaultVehicleData6,
} from "../data/defaultVehicleData";

class InsertVehiclesData {
  private connection: Connection;
  public init(connection: Connection): void {
    this.connection = connection;

    this.insertVehiclesData(defaultVehicleData1);
    this.insertVehiclesData(defaultVehicleData2);
    this.insertVehiclesData(defaultVehicleData3);
    this.insertVehiclesData(defaultVehicleData4);
    this.insertVehiclesData(defaultVehicleData5);
    this.insertVehiclesData(defaultVehicleData6);
  }

  private insertVehiclesData(vehicleData: VehicleData) {
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
		) SELECT '${vehicleData.vin}', '${vehicleData.odometer}', '${vehicleData.tirePressure}', '${vehicleData.status}', '${vehicleData.batteryStatus}', '${vehicleData.fuelLevel}', '${vehicleData.latitude}', '${vehicleData.longitude}' WHERE NOT EXISTS (SELECT * FROM VEHICLEDATA WHERE vin = '${vehicleData.vin}')
		`;

    this.connection.query(INSERT_VEHICLEDATA, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

const insertVehiclesData = new InsertVehiclesData();
export default insertVehiclesData;
