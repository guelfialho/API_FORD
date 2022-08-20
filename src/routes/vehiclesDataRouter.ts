import express from "express";
import checkToken from "../auth/tokenValidator";
import { deleteVehicleData } from "../controllers/vehicleDataControllers/deleteVehicleData.controller";
import { getVehicleData } from "../controllers/vehicleDataControllers/getVehicleData.controller";
import { getVehicleDataById } from "../controllers/vehicleDataControllers/getVehicleDataById.controller";
import { insertVehicleData } from "../controllers/vehicleDataControllers/insertVehicleData.controller";
import { updateVehicleData } from "../controllers/vehicleDataControllers/updateVehicleData.controller";

const vehicleDataRouter = express.Router();

// --------------  ROTAS DE VEICULOS -------------------
vehicleDataRouter.get("/", checkToken, getVehicleData); // TESTED
vehicleDataRouter.get("/:id", checkToken, getVehicleDataById);
vehicleDataRouter.post("/", checkToken, insertVehicleData); // TESTED
vehicleDataRouter.put("/:id", checkToken, updateVehicleData); // TESTED
vehicleDataRouter.delete("/:id", checkToken, deleteVehicleData); // TESTED

export { vehicleDataRouter };
