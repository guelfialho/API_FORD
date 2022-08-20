import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function getUsers(): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query("SELECT id, name, email, fullName FROM user", (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

export { getUsers };
