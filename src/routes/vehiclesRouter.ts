import express from "express";
import { getVehicles } from "../controllers/vehicleControllers/getVehicles.controller";
import { getVehicleById } from "../controllers/vehicleControllers/getVehicleById.controller";
import { insertVehicle } from "../controllers/vehicleControllers/insertVehicle.controller";
import { updateVehicle } from "../controllers/vehicleControllers/updateVehicle.controller";
import { deleteVehicle } from "../controllers/vehicleControllers/deleteVehicle.controller";

import checkToken from "../auth/tokenValidator";

const vehiclesRouter = express.Router();

// --------------  ROTAS DE VEICULOS -------------------

vehiclesRouter.get("/", checkToken, getVehicles); // TESTED
vehiclesRouter.get("/:id", checkToken, getVehicleById);
vehiclesRouter.post("/", checkToken, insertVehicle); // TESTED
vehiclesRouter.put("/:id", checkToken, updateVehicle); // TESTED
vehiclesRouter.delete("/:id", checkToken, deleteVehicle); // TESTED

export { vehiclesRouter };
