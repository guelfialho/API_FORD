import { Request, Response } from "express";
import { Vehicle } from "../../interfaces/Vehicle";
import { getVehicleByModel } from "../../services/vehicleServices/getVehicleByModel.service";
import * as VehicleService from "../../services/vehicleServices/insertVehicle.service";

async function insertVehicle(req: Request, res: Response) {
  const { model, sold, connected, softwareUpdates }: Vehicle = req.body;

  const vehicleModelExists: Vehicle = await getVehicleByModel(model);

  if (!model) {
    return res.status(400).json({
      error: `Model property is required and cannot be empty`,
    });
  } else if (vehicleModelExists) {
    return res.status(400).json({
      error: `Model already exists. Please update it or insert a new one.`,
    });
  } else if (!sold) {
    return res.status(400).json({
      error: `Sold property is required and cannot be empty`,
    });
  } else if (!connected) {
    return res.status(400).json({
      error: `Connected property is required and cannot be empty`,
    });
  } else if (!softwareUpdates) {
    return res.status(400).json({
      error: `SoftwareUpdates property is required and cannot be empty`,
    });
  } else {
    const VehicleId = await VehicleService.insertVehicle({
      model,
      sold,
      connected,
      softwareUpdates,
    });

    res.status(200).json({
      message: `${model} successfully inserted into database`,
      Vehicle: {
        id: VehicleId.insertId,
        model,
        sold,
        connected,
        softwareUpdates,
      },
    });
  }
}

export { insertVehicle };
