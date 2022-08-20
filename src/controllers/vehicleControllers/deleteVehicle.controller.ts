import { Request, Response } from "express";
import { Vehicle } from "../../interfaces/Vehicle";
import * as VehicleService from "../../services/vehicleServices/deleteVehicle.service";
import { getVehicleById } from "../../services/vehicleServices/getVehicleById.service";

async function deleteVehicle(req: Request, res: Response) {
  const id: number = +req.params.id;

  const vehicle: Vehicle = await getVehicleById(id);

  if (!vehicle) {
    res.status(404).json({ error: `Vehicle (id: ${id}) not found.` });
  } else {
    await VehicleService.deleteVehicle(id);
    res.status(200).json({
      message: `${vehicle.model} successfully deleted!`,
    });
  }
}

export { deleteVehicle };
