import { Request, Response } from "express";
import { User } from "../../interfaces/User";
import * as UserService from "../../services/userServices/getUsers.service";

async function getUsers(req: Request, res: Response) {
  const UsersArray: User[] = [];

  const users: User = await UserService.getUsers();

  if (!users) {
    res.status(404).json({ error: "No users found" });
  } else {
    for (const i in users) {
      UsersArray.push({
        id: users[i].id,
        name: users[i].name,
        email: users[i].email,
        fullName: users[i].fullName,
      });
    }
    res.status(200).json({ Users: UsersArray });
  }
}

export { getUsers };
