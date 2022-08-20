import { Request, Response } from "express";
import { Vehicle } from "../../interfaces/Vehicle";
import * as VehicleService from "../../services/vehicleServices/getVehicleById.service";

async function getVehicleById(req: Request, res: Response) {
  const id: number = +req.params.id;
  const vehicle: Vehicle = await VehicleService.getVehicleById(id);

  if (!vehicle) {
    res.status(404).json({ error: `Vehicle (id ${id}) not found.` });
  } else {
    res.status(200).json({ Vehicle: vehicle });
  }
}

export { getVehicleById };
