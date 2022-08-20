import { getVehicleDataByVin } from "../../services/vehicleDataServices/getVehicleDataByVin.service";
import { getVehicleDataById } from "../../services/vehicleDataServices/getVehicleDataById.service";
import { VehicleData } from "../../interfaces/VehicleData";
import * as VehicleDataService from "../../services/vehicleDataServices/updateVehicleData.service";
import { Request, Response } from "express";

async function updateVehicleData(req: Request, res: Response) {
  const id: number = +req.params.id;

  const {
    vin,
    odometer,
    tirePressure,
    status,
    batteryStatus,
    fuelLevel,
    latitude,
    longitude,
  } = req.body;

  let verifyVin = false;

  const vinAlreadyExists: VehicleData = await getVehicleDataByVin(vin);
  const vehicleDataExists: VehicleData = await getVehicleDataById(id);

  if (vinAlreadyExists) {
    if (!(vinAlreadyExists.id === id)) {
      verifyVin = true;
    }
  }

  if (!vehicleDataExists) {
    return res.status(404).json({
      error: `Vehicle (id: ${id}) not found`,
    });
  } else if (!vin) {
    return res.status(400).json({
      error: `Vin property is required and cannot be empty`,
    });
  } else if (verifyVin) {
    return res.status(400).json({
      error: `Vin already in use. Please enter a valid Vin.`,
    });
  } else if (!odometer) {
    return res.status(400).json({
      error: `Odometer property is required and cannot be empty`,
    });
  } else if (!tirePressure) {
    return res.status(400).json({
      error: `TirePressure property is required and cannot be empty`,
    });
  } else if (!status) {
    return res.status(400).json({
      error: `Status property is required and cannot be empty`,
    });
  } else if (!batteryStatus) {
    return res.status(400).json({
      error: `BatteryStatus property is required and cannot be empty`,
    });
  } else if (!fuelLevel) {
    return res.status(400).json({
      error: `FuelLevel property is required and cannot be empty`,
    });
  } else if (!latitude) {
    return res.status(400).json({
      error: `Latitude property is required and cannot be empty`,
    });
  } else if (!longitude) {
    return res.status(400).json({
      error: `Longitude property is required and cannot be empty`,
    });
  } else {
    await VehicleDataService.updateVehicleData({
      id,
      vin,
      odometer,
      tirePressure,
      status,
      batteryStatus,
      fuelLevel,
      latitude,
      longitude,
    });

    res.status(200).json({
      message: `Vehicle Data (id: ${id}) successfully updated`,
      VehicleData: {
        id,
        vin,
        odometer,
        tirePressure,
        status,
        batteryStatus,
        fuelLevel,
        latitude,
        longitude,
      },
    });
  }
}

export { updateVehicleData };
