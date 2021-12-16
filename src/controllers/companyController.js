const companyService = require('../services/company.service')

module.exports = {
    async index(req, res){
        const response = await companyService.resolvePromisesForCompanies()
        return res.status(200).send({companies: response})
    },

    async indexOne(req, res){
        const { id } = req.params

        try {
            const company = await companyService.resolvePromisesForCompanies(id)

            if(!company){
                throw new Error('Não tem companhia na lista com esse id')
            }

            return res.status(200).json({company: company})

        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    }
}