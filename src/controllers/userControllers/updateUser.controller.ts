import { Request, Response } from "express";
import { User } from "../../interfaces/User";
import * as UserService from "../../services/userServices/updateUser.service";
import { getUserByEmail } from "../../services/userServices/getUserByEmail.service";
import { getUserById } from "../../services/userServices/getUserById.service";

async function updateUser(req: Request, res: Response) {
  const id: number = +req.params.id;
  const { name, email, fullName }: User = req.body;

  let verifyEmail = false;

  const emailAlreadyExists = await getUserByEmail(email);
  const user = await getUserById(id);

  if (emailAlreadyExists) {
    if (!(emailAlreadyExists.id === id)) {
      verifyEmail = true;
      // Another user cannot modify his own email if someone else has it already
    }
  }

  if (!user) {
    res.status(404).json({ error: `User(id ${id}) not found.` });
  } else if (!name) {
    return res.status(400).json({
      error: `Name property is required and cannot be empty`,
    });
  } else if (!email) {
    return res.status(400).json({
      error: `Email property is required and cannot be empty`,
    });
  } else if (verifyEmail) {
    return res.status(400).json({
      error: `Email already in use. Please enter a valid email address`,
    });
  } else if (!fullName) {
    return res.status(400).json({
      error: `FullName property is required and cannot be empty`,
    });
  } else {
    await UserService.updateUser({ id, name, email, fullName });
    res.status(200).json({
      message: `User (id: ${id} successfully updated)`,
      User: {
        id,
        name,
        email,
        fullName,
      },
    });
  }
}

export { updateUser };
