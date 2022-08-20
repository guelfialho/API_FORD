import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function getVehicles(): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, model, sold, connected, softwareUpdates FROM vehicle`,
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

export { getVehicles };
