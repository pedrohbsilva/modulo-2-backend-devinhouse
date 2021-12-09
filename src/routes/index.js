const express = require('express');
const userController = require('../controllers/userController');
const companyController = require('../controllers/companyController');
const routes = express.Router();

routes.get('/users', userController.index);
routes.get('/user/:id', userController.indexOne);
routes.post('/users', userController.create);
routes.patch('/user/:id', userController.updateOne);
routes.delete('/user/:id', userController.deleteOne);

routes.get('/companies', companyController.index);
routes.get('/company/:id', companyController.indexOne);
routes.post('/companies', companyController.create);
routes.patch('/company/:id', companyController.updateOne);
routes.delete('/company/:id', companyController.deleteOne);

module.exports = routes;

