const { getData } = require('../utils/functions')
const userService = require('../services/user.service')

module.exports = {
    async index(req, res){
        const companies = getData('company.json')
        const companiesWithUsers = companies.map(async(item)=> {
            const employees = await Promise.all(item.employees.map((data)=> userService.getUserById(data.id)))
            const owner = await userService.getUserById(item.owner.id)

            return { ...item, employees: employees, owner: owner }
        })
        
        const response = await Promise.all(companiesWithUsers)
        return res.status(200).send(response)
    }
}