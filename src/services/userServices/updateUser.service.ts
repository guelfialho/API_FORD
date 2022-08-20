import connection from "../../infra/connection";
import { User } from "../../interfaces/User";
import { Connection } from "mysql2";

const db: Connection = connection;

function updateUser(user: User): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE user SET name = ?, email = ?, fullName = ? WHERE id = ?",
      [user.name, user.email, user.fullName, user.id],
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

export { updateUser };
