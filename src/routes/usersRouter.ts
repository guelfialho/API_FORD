import express from "express";
import { deleteUser } from "../controllers/userControllers/deleteUser.controller";
import { getUserById } from "../controllers/userControllers/getUserById.controller";
import { getUsers } from "../controllers/userControllers/getUsers.controller";
import { insertUser } from "../controllers/userControllers/inserUser.controller";
import { updateUser } from "../controllers/userControllers/updateUser.controller";
import { login } from "../controllers/userControllers/userLogin.controller";
import checkToken from "../auth/tokenValidator";

const usersRouter = express.Router();

// --------------  ROTAS DE USUÁRIOS -------------------

usersRouter.get("/", checkToken, getUsers); // TESTED
usersRouter.get("/:id", checkToken, getUserById);
usersRouter.post("/", checkToken, insertUser); // TESTED
usersRouter.put("/:id", checkToken, updateUser); // TESTED
usersRouter.delete("/:id", checkToken, deleteUser); // TESTED
usersRouter.post("/login", login);

export { usersRouter };
