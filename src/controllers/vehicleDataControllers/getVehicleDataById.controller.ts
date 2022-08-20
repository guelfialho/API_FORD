import { Request, Response } from "express";
import { VehicleData } from "../../interfaces/VehicleData";
import * as VehicleDataService from "../../services/vehicleDataServices/getVehicleDataById.service";

async function getVehicleDataById(req: Request, res: Response) {
  const id: number = +req.params.id;
  const vehicleData: VehicleData = await VehicleDataService.getVehicleDataById(
    id
  );

  if (!vehicleData) {
    return res.status(404).json({
      message: `Vehicle (id: ${id}) not found`,
    });
  } else {
    return res.status(200).json({ VehicleData: vehicleData });
  }
}

export { getVehicleDataById };
