const express = require('express');
const app = express();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../models/authToken');


// all get post apis
app.post('/registerUser', userController.regUser);
app.post('/login', userController.login);
app.post('/forgotPassword', userController.forgotPassword);
app.post('/updatePassword', userController.updateNewPassword);
app.post('/formData', userController.postFormData);


//All get apis
app.get('/getAll', userController.getUsers);
app.get('/uniqueUser/:email',userController.getUniqueUser);

// All delete api
app.delete('/deleteUser/:userId', userController.deleteUsers);






module.exports = app;

