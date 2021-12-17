const express = require('express')
const companiesRoutes = express.Router()
const companyController = require('../../controllers/companyController')

companiesRoutes.get('/v1/companies', companyController.index)
companiesRoutes.get('/v1/company/:id', companyController.indexOne)
companiesRoutes.post('/v1/companies', companyController.create)
companiesRoutes.patch('/v1/company/:id', companyController.update)

module.exports = companiesRoutes