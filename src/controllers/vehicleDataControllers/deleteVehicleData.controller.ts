import { Request, Response } from "express";
import { VehicleData } from "../../interfaces/VehicleData";
import { getVehicleDataById } from "../../services/vehicleDataServices/getVehicleDataById.service";
import * as VehicleDataService from "../../services/vehicleDataServices/deleteVehicleData.service";

async function deleteVehicleData(req: Request, res: Response) {
  const id: number = +req.params.id;

  const vehicleData: VehicleData = await getVehicleDataById(id);

  if (!vehicleData) {
    return res.status(404).json({
      error: `Vehicle data (id: ${id}) not found`,
    });
  } else {
    await VehicleDataService.deleteVehicleData(id);
    res.status(200).json({
      message: `${vehicleData.vin} successfully deleted!`,
    });
  }
}

export { deleteVehicleData };
