const express = require('express')
const routes = express.Router()
const companies = require('./v1/companies.routes')
const users = require('./v1/users.routes')

//users
routes.use(users)
//companies
routes.use(companies)

module.exports = routes