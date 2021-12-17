const companyService = require('../services/company.service')
const { getData, createOrUpdateData } = require('../utils/functions')
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
    },
    async create(req, res){
        const {
            name, age, employees, owner, state
        } = req.body
        const companies = getData('company.json')

        if(!name || !age || !employees || !owner || !state){
            return res.status(400).send(
                {message: 'É obrigatório preencher todos os campos.'}
            )
        }
        const id = companies.length + 1

        const createNewCompany = [
            ...companies, {
                id: id,
                name: name, 
                age: age, 
                employees: employees, 
                owner: owner, 
                state: state
            }
        ]

        createOrUpdateData('company.json', createNewCompany)


        return res.status(200).send({message: 'Empresa criada com sucesso.'})
    },
    async update(req, res){
        const { id } = req.params
        const dataForUpdate = req.body
        const companies = getData('company.json')

        try {
            const existCompany = companies.find((company) => company.id === Number(id))

            if(!existCompany){
                throw new Error('Não existe empresa com este ID')
            }

            const companyUpdate = companies.map((item)=>{
                if(item.id === Number(id)){
                    return {...item, ...dataForUpdate}
                }
                return {...item}
            })

            createOrUpdateData('company.json', companyUpdate)


            return res.status(200).send({message: 'Empresa atualizada com sucesso.'})
        } catch (error) {
            return res.status(400).send({error: error.message})
        }
    }
}