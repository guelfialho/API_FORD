import { Request, Response } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

function checkToken(req: Request, res: Response, next: Function) {
  const token: string = req.headers["x-access-token"] as string;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (error: VerifyErrors) => {
      if (error) {
        res.status(401).json({ message: "Invalid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      message: "Access denied! Unauthorized user.",
    });
  }
}

export default checkToken;
