const { getData, createOrUpdateData } = require('../utils/functions')

module.exports = {
    async index(req, res) {
        const companies = getData('company.json')
        
        return res.status(200).send({companies: companies});
    },

    async indexOne(req, res) {
        const { id } = req.params
        const companies = getData('company.json')
        const company = companies.filter((item)=> item.id === Number(id))
    
        return res.status(200).send({company: company});
    },

    async create(req, res) {
        const { id, name, age, employees, owner, state } = req.body
        const companies = getData('company.json')
        const createNewCompany = [...companies, {
            id, 
            name, 
            age, 
            employees,
            owner, 
            state
        }]
        createOrUpdateData('company.json',createNewCompany)
        return res.status(200).send({message: "Empresa salva com sucesso!"});
    },

    async updateOne(req, res) {
        const { id } = req.params
        const { name, age, job, state} = req.body
        const companies = getData('company.json')
        const updateCompaniesList = companies.map((item)=>{
            if(item.id === Number(id)){
                return {
                    id: id !== undefined ? id : item.id,
                    name: name !== undefined ? name : item.name,
                    age: age !== undefined ? age : item.age,
                    job: job !== undefined ? job : item.job,
                    state: state !== undefined ? state : item.state                   
                }
            }
            else{
                return {...item}
            }
        })
        createOrUpdateData('company.json', updateCompaniesList)
        return res.status(200).send({message: "Empresa atualizada com sucesso!"});
    },

    async deleteOne(req, res) {
        const { id } = req.params
        const companies = getData('company.json')
        const removeOneCompanyFromUsers = companies.filter((item)=> item.id !== Number(id))
        createOrUpdateData('company.json', removeOneCompanyFromUsers)
        return res.status(200).send({message: "Empresa deletada com sucesso!"});
    },
}

