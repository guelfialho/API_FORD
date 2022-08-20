import connection from "../../infra/connection";
import { User } from "../../interfaces/User";
import { Connection } from "mysql2";
const db: Connection = connection;

function insertUser(user: User): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO user (name, email, password, fullName) VALUES (?, ?, ?, ?)",
      [user.name, user.email, user.password, user.fullName],
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

export { insertUser };
