const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/user', UserController.insertUser);
router.put('/user/:id', UserController.modifyUser);
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;
