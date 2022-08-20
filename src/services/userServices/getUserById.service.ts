import { Connection } from "mysql2";
import connection from "../../infra/connection";

const db: Connection = connection;

function getUserById(id: number): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT id, name, email, fullName FROM user WHERE id = ?",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        if (Array.isArray(results) && results.length > 0) {
          //  vai verificar se retornou mais de 1 e pegar o 1
          resolve(results[0]);
        } else {
          resolve(false);
        }
      }
    );
  });
}

export { getUserById };
