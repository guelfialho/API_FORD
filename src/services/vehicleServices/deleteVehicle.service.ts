import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function deleteVehicle(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM vehicle WHERE id = ?", [id], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

export { deleteVehicle };
