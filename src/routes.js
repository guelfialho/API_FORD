const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const VehicleController = require('./controllers/VehicleController');
const VehicleDataController = require('./controllers/VehicleDataController');

// --------------  ROTAS DE USUÁRIOS -------------------
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/user', UserController.insertUser);
router.put('/user/:id', UserController.modifyUser);
router.delete('/user/:id', UserController.deleteUser);

// --------------  ROTAS DE VEICULOS -------------------
router.get('/vehicles', VehicleController.getVehicle);
router.get('/vehicles/:id', VehicleController.getVehicleById);
router.post('/vehicle', VehicleController.insertVehicle);
router.put('/vehicle/:id', VehicleController.modifyVehicle);
router.delete('/vehicle/:id', VehicleController.deleteVehicle);

// --------------  ROTAS DE VEICULOS -------------------
router.get('/vehiclesdata', VehicleDataController.getVehicleData);
router.get('/vehiclesdata/:id', VehicleDataController.getVehicleDataById);
router.post('/vehicledata', VehicleDataController.insertVehicleData);
router.put('/vehicledata/:id', VehicleDataController.modifyVehicleData);
router.delete('/vehicledata/:id', VehicleDataController.deleteVehicleData);

module.exports = router;
