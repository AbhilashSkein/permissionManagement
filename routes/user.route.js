const express = require('express');
const app = express();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../models/authToken');

app.post('/user', userController.regUser);
app.post('/permission', userController.userGet);
app.get('/getAll', userController.getUsers);
app.delete('/deleteUser/:userId', userController.deleteUsers);

//login api
app.post('/login', userController.login);



module.exports = app;

