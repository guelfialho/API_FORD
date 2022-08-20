import { Request, Response } from "express";
import { Vehicle } from "../../interfaces/Vehicle";
import * as VehicleService from "../../services/vehicleServices/getVehicles.service";

async function getVehicles(req: Request, res: Response) {
  const VehiclesArray: Vehicle[] = [];

  const vehicles: Vehicle[] = await VehicleService.getVehicles();

  if (!vehicles) {
    res.status(404).json({ error: "No vehicles found" });
  } else {
    for (const i in vehicles) {
      VehiclesArray.push({
        id: vehicles[i].id,
        model: vehicles[i].model,
        sold: vehicles[i].sold,
        connected: vehicles[i].connected,
        softwareUpdates: vehicles[i].softwareUpdates,
      });
    }
    res.status(200).json({ Vehicles: VehiclesArray });
  }
}

export { getVehicles };
