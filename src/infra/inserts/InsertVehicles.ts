import { Connection } from "mysql2";
import { Vehicle } from "../../interfaces/Vehicle";
import {
  defaultVehicle1,
  defaultVehicle2,
  defaultVehicle3,
  defaultVehicle4,
} from "../data/defaultVehicle";

class InsertVehicles {
  private connection: Connection;
  public init(connection: Connection): void {
    this.connection = connection;

    this.insertVehicle(defaultVehicle1);
    this.insertVehicle(defaultVehicle2);
    this.insertVehicle(defaultVehicle3);
    this.insertVehicle(defaultVehicle4);
  }

  private insertVehicle(vehicle: Vehicle) {
    const INSERT_VEHICLE = `
		INSERT INTO VEHICLE (
			model, 
			sold,
			connected,
			softwareUpdates
		) SELECT '${vehicle.model}', ${vehicle.sold}, ${vehicle.connected}, ${vehicle.softwareUpdates} WHERE NOT EXISTS (SELECT * FROM VEHICLE WHERE model = '${vehicle.model}')`;

    this.connection.query(INSERT_VEHICLE, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

const insertVehicles = new InsertVehicles();
export default insertVehicles;
