import { User } from "../../interfaces/User";
import { genSaltSync, hashSync } from "bcrypt";
import { Connection } from "mysql2";
import { defaultUser1, defaultUser2 } from "../data/defaultUsers";

class InsertUsers {
  private connection: Connection;

  public init(connection: Connection): void {
    this.connection = connection;

    this.insertUser(defaultUser1);
    this.insertUser(defaultUser2);
  }

  private insertUser(user: User) {
    const salt = genSaltSync(10);
    user.password = hashSync(user.password, salt);

    const INSERT_USER = `
		INSERT INTO user (
    		name, 
    		email,
    		password,
    		fullName
		) SELECT '${user.name}', '${user.email}', '${user.password}', '${user.fullName}' FROM (SELECT 1) t WHERE NOT EXISTS (SELECT * FROM user WHERE name = '${user.name}')`;
    this.connection.query(INSERT_USER, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

const insertUsers = new InsertUsers();
export default insertUsers;
