const express = require('express');
const app = express();
const userController = require('../controllers/user.controller');

// all get post apis
app.post('/registerUser', userController.regUser);
app.post('/login', userController.login);
app.post('/forgotPassword',userController.authentication, userController.forgotPassword);
app.post('/updatePassword',userController.authentication, userController.updateNewPassword);
app.post('/formData',userController.authentication, userController.postFormData);
app.post('/googleSignIn',userController.googleSignIn);
//All get apis
app.get('/getAll',userController.authentication, userController.getUsers);
app.get('/uniqueUser/:email',userController.authentication,userController.getUniqueUser);

// All delete api
app.delete('/deleteUser/:userId',userController.authentication, userController.deleteUsers);






module.exports = app;

