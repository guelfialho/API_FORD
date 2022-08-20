import { getUserByEmail } from "../../services/userServices/getUserByEmail.service";
import * as UserService from "../../services/userServices/insertUser.service";
import { genSaltSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import { User } from "../../interfaces/User";

async function insertUser(req: Request, res: Response): Promise<any> {
  let { name, email, fullName, password }: User = req.body;

  const emailAlreadyExists: User = await getUserByEmail(email);

  if (!name) {
    return res.status(400).json({
      error: `Name property is required and cannot be empty`,
    });
  } else if (!email) {
    return res.status(400).json({
      error: `Email property is required and cannot be empty`,
    });
  } else if (emailAlreadyExists) {
    return res.status(400).json({
      error: `Email already in use. Please enter a valid email address`,
    });
  } else if (!fullName) {
    return res.status(400).json({
      error: `FullName property is required and cannot be empty`,
    });
  } else if (!password) {
    return res.status(400).json({
      error: `Password property is required and cannot be empty`,
    });
  } else {
    const salt = genSaltSync(10);
    password = hashSync(password, salt);
    const userId = await UserService.insertUser({
      name,
      email,
      password,
      fullName,
    });
    res.status(200).json({
      message: `${name} successfully inserted into database`,
      User: {
        id: userId.insertId,
        name,
        email,
        fullName,
      },
    });
  }
}

export { insertUser };
