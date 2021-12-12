const express = require('express')
const companiesRoutes = express.Router()
const companyController = require('../../controllers/companyController')

companiesRoutes.get('/companies', companyController.index)

module.exports = companiesRoutes