const express = require('express')
const routes = express.Router()
const userController = require('../controllers/userController')
const companyController = require('../controllers/companyController')

routes.get('/users', userController.index)
routes.get('/user/:id', userController.indexOne)
routes.post('/user', userController.create)
routes.patch('/user/:id', userController.updateOne)
routes.delete('/user/:id', userController.deleteOne)

//////////////////////////////////

routes.get('/companies', companyController.index)

module.exports = routes