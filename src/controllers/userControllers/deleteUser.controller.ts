import { Request, Response } from "express";
import { User } from "../../interfaces/User";
import * as UserService from "../../services/userServices/deleteUser.service";

import { getUserById } from "../../services/userServices/getUserById.service";

async function deleteUser(req: Request, res: Response): Promise<void> {
  const id: number = +req.params.id;

  const user: User = await getUserById(id);

  if (!user) {
    res.status(404).json({ error: `User(id ${id}) not found.` });
  } else {
    await UserService.deleteUser(id);
    res.status(200).json({
      message: `User id: ${id} successfuly deleted`,
    });
  }
}

export { deleteUser };
