import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function getVehicleById(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT id, model, sold, connected, softwareUpdates FROM vehicle WHERE id = ?`,
      [id],
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (Array.isArray(results) && results.length > 0) {
          resolve(results[0]);
        } else {
          resolve(false);
        }
      }
    );
  });
}

export { getVehicleById };
