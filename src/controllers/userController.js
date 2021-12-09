const { getData, createOrUpdateData, parseData } = require('../utils/functions')
const { translate } = require('../utils/constants')
module.exports = {
    async index(req, res){

        const users = getData()
        
        return res.status(200).json({users: users})
    },
    
    async indexOne(req, res){
        const { id } = req.params
        const users = getData()
        try {
            const user = users.filter((item) => item.id === Number(id))
        
            if(user.length === 0){
                throw new Error('Não tem usuário na lista com esse id')
            }
            return res.status(200).json({user: user})

        } catch (error) {
            console.log(error.message)
            return res.status(400).json({error: error.message})
        }
    },

    async create(req, res){
        const { name, age, job, state } = req.body;
        const existKeyValue = Object.keys(req.body).filter((item) => !req.body[item])
        const translateOptions = existKeyValue.map((item) => translate[item])
        
        if(existKeyValue.length >= 1){
            return res.status(400).send(
                {message: `É necessário enviar o(s) seguinte(s) ${translateOptions.join(', ')}`}
                )
        }

        const users = getData()
        const createNewUser = [
            ...users, {
                id: users.length + 1,
                name: name,
                age: age,
                job: job,
                state: state
            }
        ]
        createOrUpdateData(createNewUser)
        return res.status(201).send({message: 'Usuário salvo com sucesso.'})
    },

    async updateOne(req, res){
        const { id } = req.params
        const users = getData()
        
        const existUser = users.filter((item) => item.id === Number(id))
        const [ user ] = existUser
        if(!user){
            return res.status(400).send({message: "Usuário não encontrado"})
        }

        const findOptionForUpdate = Object.keys(req.body).map((item) => {
            return {
                [item]: req.body[item]
            }
        })
        const arrayToObject = Object.assign({}, ...findOptionForUpdate)

        const updateUsersList = users.map((item)=>{
            if(item.id === Number(id)){
                return {id: id, ...parseData(arrayToObject, item)}
            }
            else{
                return {...item}
            }
        })
        createOrUpdateData(updateUsersList)
        return res.status(200).send({message: "Usuário encontrado"})
    },

    async deleteOne(req, res) {
        const { id } = req.params
        const users = getData('user.json')
        const removeOneUserFromUsers = users.filter((item)=> item.id !== Number(id))
        createOrUpdateData('user.json', removeOneUserFromUsers)
        return res.status(200).send({message: "Usuário deletado com sucesso!"});
    },
}