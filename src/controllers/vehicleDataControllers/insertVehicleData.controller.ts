import { Request, Response } from "express";
import { getVehicleDataByVin } from "../../services/vehicleDataServices/getVehicleDataByVin.service";
import * as VehicleDataService from "../../services/vehicleDataServices/insertVehicleData.service";

async function insertVehicleData(req: Request, res: Response) {
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

  const vinAlreadyExists = await getVehicleDataByVin(vin);

  if (!vin) {
    return res.status(400).json({
      error: `Vin property is required and cannot be empty`,
    });
  } else if (vinAlreadyExists) {
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
    const VehicleDataId = await VehicleDataService.insertVehicleData({
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
      message: `${vin} successfully inserted into database`,
      VehicleData: {
        id: VehicleDataId.insertId,
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

export { insertVehicleData };
