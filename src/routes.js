// const express = require('express');
// const UserController = require('./controllers/UserController');
// const VehicleController = require('./controllers/VehicleController');
// const VehicleDataController = require('./controllers/VehicleDataController');
// const { checkToken } = require('./auth/token_validator');

import * as UserController from './controllers/UserController.js';
import * as VehicleController from './controllers/VehicleController.js';
import * as VehicleDataController from './controllers/VehicleDataController.js';
import checkToken from './auth/token_validator.js';
import express from 'express';

const router = express.Router();

// --------------  ROTAS DE USUÁRIOS -------------------
router.get('/users', checkToken, UserController.getUsers); // TESTED
router.get('/users/:id', UserController.getUserById);
router.post('/user', UserController.insertUser); // TESTED
router.put('/user/:id', UserController.modifyUser); // TESTED
router.delete('/user/:id', UserController.deleteUser); // TESTED
router.post('/user/login', UserController.login);

// --------------  ROTAS DE VEICULOS -------------------
router.get('/vehicles', VehicleController.getVehicles); // TESTED
router.get('/vehicles/:id', VehicleController.getVehicleById);
router.post('/vehicle', VehicleController.insertVehicle); // TESTED
router.put('/vehicle/:id', VehicleController.modifyVehicle); // TESTED
router.delete('/vehicle/:id', VehicleController.deleteVehicle); // TESTED

// --------------  ROTAS DE VEICULOS -------------------
router.get('/vehiclesdata', VehicleDataController.getVehicleData); // TESTED
router.get('/vehiclesdata/:id', VehicleDataController.getVehicleDataById);
router.post('/vehicledata', VehicleDataController.insertVehicleData); // TESTED
router.put('/vehicledata/:id', VehicleDataController.modifyVehicleData); // TESTED
router.delete('/vehicledata/:id', VehicleDataController.deleteVehicleData); // TESTED

export default router;
