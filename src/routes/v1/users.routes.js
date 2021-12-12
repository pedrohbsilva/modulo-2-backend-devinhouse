const express = require('express')
const usersRoutes = express.Router()
const userController = require('../../controllers/userController')

usersRoutes.get('/users', userController.index)
usersRoutes.get('/user/:id', userController.indexOne)
usersRoutes.get('/getUserByFilter', userController.getByFilter)
usersRoutes.post('/user', userController.create)
usersRoutes.patch('/user/:id', userController.updateOne)
usersRoutes.delete('/user/:id', userController.deleteOne)

module.exports = usersRoutes