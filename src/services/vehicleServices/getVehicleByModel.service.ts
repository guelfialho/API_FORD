import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function getVehicleByModel(model: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM vehicle WHERE model = ?`,
      [model],
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

export { getVehicleByModel };
