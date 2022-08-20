import { Request, Response } from "express";
import { User } from "../../interfaces/User";
import * as UserService from "../../services/userServices/getUserById.service";

async function getUserById(req: Request, res: Response) {
  const id: number = +req.params.id;
  const user: User = await UserService.getUserById(id);

  if (!user) {
    res.status(404).json({ error: `User(id ${id}) not found.` });
  } else {
    res.status(200).json({ User: user });
  }
}

export { getUserById };
