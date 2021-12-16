const express = require('express')
const routes = express.Router()
const companiesRoutes = require('./v1/companies.routes')
const usersRoutes = require('./v1/users.routes')

routes.use([companiesRoutes, usersRoutes])


module.exports = routes