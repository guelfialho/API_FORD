import { Request, Response } from "express";
import { Vehicle } from "../../interfaces/Vehicle";
import { getVehicleById } from "../../services/vehicleServices/getVehicleById.service";
import { getVehicleByModel } from "../../services/vehicleServices/getVehicleByModel.service";
import * as VehicleService from "../../services/vehicleServices/updateVehicle.service";

async function updateVehicle(req: Request, res: Response) {
  const id: number = +req.params.id;
  const { model, sold, connected, softwareUpdates }: Vehicle = req.body;

  const idExists: Vehicle = await getVehicleById(id);
  const vehicleModelExists: Vehicle = await getVehicleByModel(model);

  let verifyModel: boolean = false;

  if (vehicleModelExists) {
    if (!(vehicleModelExists.id === id)) {
      verifyModel = true;
    }
  }

  if (!idExists) {
    res.status(404).json({ error: `Vehicle (id ${id}) not found.` });
  } else if (!model) {
    return res.status(400).json({
      error: `Model property is required and cannot be empty`,
    });
  } else if (verifyModel) {
    return res.status(400).json({
      error: `Model already exists. Please insert a new one.`,
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
    await VehicleService.updateVehicle({
      id,
      model,
      sold,
      connected,
      softwareUpdates,
    });
    res.status(200).json({
      message: `${model} successfully updated!`,
      Vehicle: {
        id,
        model,
        sold,
        connected,
        softwareUpdates,
      },
    });
  }
}

export { updateVehicle };
