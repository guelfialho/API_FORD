import { Request, Response } from "express";
import { VehicleData } from "../../interfaces/VehicleData";
import * as VehicleDataService from "../../services/vehicleDataServices/getVehicleData.service";

async function getVehicleData(req: Request, res: Response) {
  const VehiclesData: VehicleData[] = [];

  const vehiclesData: VehicleData[] = await VehicleDataService.getVehicleData();

  if (!vehiclesData) {
    return res.status(400).json({
      error: `There aren't any vehicle data in the database`,
    });
  } else {
    for (const i in vehiclesData) {
      VehiclesData.push({
        id: vehiclesData[i].id,
        vin: vehiclesData[i].vin,
        odometer: vehiclesData[i].odometer,
        tirePressure: vehiclesData[i].tirePressure,
        status: vehiclesData[i].status,
        batteryStatus: vehiclesData[i].batteryStatus,
        fuelLevel: vehiclesData[i].fuelLevel,
        latitude: vehiclesData[i].latitude,
        longitude: vehiclesData[i].longitude,
      });
    }

    return res.status(200).json({ VehiclesData });
  }
}

export { getVehicleData };
