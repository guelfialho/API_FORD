import { Request, Response } from "express";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { getUserByEmail } from "../../services/userServices/getUserByEmail.service";
import { User } from "../../interfaces/User";

async function login(req: Request, res: Response): Promise<any> {
  const password: string = req.body.password;
  const email: string = req.body.email;

  if (!password || !email) {
    return res.status(404).send({ message: "Email and password are required" });
  } else {
    const user: User = await getUserByEmail(email);

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    } else {
      const authUser: boolean = compareSync(password, user.password);
      if (!authUser) {
        return res.status(401).send({ message: "Invalid email or password" });
      } else {
        user.password = undefined;
        user.joinDate = undefined;
        const jsontoken: string = jwt.sign(user, process.env.TOKEN_SECRET, {
          expiresIn: "1h",
        });
        res.set("x-access-token", jsontoken);

        return res.status(200).send({
          message: " Login Successfully",
          token: jsontoken,
        });
      }
    }
  }
}
export { login };
