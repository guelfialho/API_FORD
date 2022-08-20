import { Connection } from "mysql2";
import USER_SCHEMA from "./schemas/userSchema";
import VEHICLEDATA_SCHEMA from "./schemas/vehicleDataSchema";
import VEHICLE_SCHEMA from "./schemas/vehicleSchema";

class Tables {
  private connection: Connection;
  public init(connection: Connection): void {
    this.connection = connection;

    // CREATE TABLES

    this.createUserTable();
    this.createVehicleTable();
    this.createVehicleDataTable();
  }

  private createUserTable() {
    this.connection.query(USER_SCHEMA, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  private createVehicleTable() {
    this.connection.query(VEHICLE_SCHEMA, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }

  private createVehicleDataTable() {
    this.connection.query(VEHICLEDATA_SCHEMA, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

const table = new Tables();

export default table;
