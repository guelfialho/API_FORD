const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const VehicleController = require('./controllers/VehicleController');

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

module.exports = router;
