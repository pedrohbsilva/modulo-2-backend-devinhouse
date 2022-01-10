const express = require('express');

const app = express()
const fileSystem = require('fs')
const {createFolder} = require('./utils')
app.use(express.json())

//EXERCÍCIO 1

app.patch('/changePosition/:name',  (req, res) => {

    if (fileSystem.lstatSync('src/'+'user.json').isFile()) {
        const { name } = req.params
        const users = JSON.parse(fileSystem.readFileSync('src/'+'user.json', 'utf8'));
        const findUser = users.find((user)=> user.name === name)
        if(!findUser){
            return res.status(400).send({message: 'Não existe usuário com esse nome'})   
        }
        const [firstUser] = users
        const reOrderUsers = users.map((item)=>{
            if(item.id === findUser.id) return firstUser
            if(item.id === firstUser.id) return findUser
            return {...item}
        })
        fileSystem.writeFileSync('src/'+'user.json', JSON.stringify(reOrderUsers));

        return res.status(200).send({users: reOrderUsers})
    }
})

//EXERCÍCIO 2

app.get('/getDays/:month',  (req, res) => {

    const { month } = req.params
    const numberMonth = Number(month)
    if(numberMonth > 12 || numberMonth < 1){
        return res.status(200).send({message: 'Mês inválido'})
    }
    const daysOfMonthWithoutWeekday = []
    const actualYear = new Date().getFullYear()
    const firstDayOfMonth = new Date(actualYear, numberMonth-1, 1);
    while (firstDayOfMonth.getMonth()+1 === numberMonth){
        if(firstDayOfMonth.getDay() > 0 && firstDayOfMonth.getDay() < 6){
            daysOfMonthWithoutWeekday.push(
                new Date(actualYear, numberMonth-1, firstDayOfMonth.getDate())
                .toLocaleDateString()
                )
        }
        firstDayOfMonth.setDate(firstDayOfMonth.getDate()+1)
    }
    return res.status(200).send({days: daysOfMonthWithoutWeekday})
})

//EXERCÍCIO 3

app.post('/createData',  (req, res) => {
    if (fileSystem.lstatSync('src/'+'user.json').isFile()) {
        const newUser = req.body
        if(!newUser){
            return res.status(400).send({message: 'Tem que enviar os dados para criação do usuário'})   
        }
        const users = JSON.parse(fileSystem.readFileSync('src/'+'user.json', 'utf8'));

        fileSystem.writeFileSync('src/'+'user.json', JSON.stringify(
            [...users, {
                id: users.length +1,
                ...newUser
            }]
        ));

        return res.status(200).send({users: 'Dados criados com sucesso.'})
    }
})

//EXERCÍCIO 5 

app.get('/filter',  (req, res) => {

    //Este if verifica se existe o arquivo user.json
    if (fileSystem.lstatSync('src/'+'user.json').isFile()) {
        //Neste result, retorna os dados do JSON de dentro do user
        const users = JSON.parse(fileSystem.readFileSync('src/'+'user.json', 'utf8'));

        const { job, state, ageMin, ageMax } = req.query
        
        if((ageMin && ageMax) && ageMax < ageMin){
            return res.status(400).send({message: 'O ageMax não pode ser menor que ageMin'})
        }

        let filterUsers = users

        if(ageMin || ageMax){
            filterUsers = filterUsers.filter((item) => {
                const existAgeMax = ageMax ? item.age <= Number(ageMax) : item.age >= Number(ageMin)
                const existAgeMin = ageMin ? item.age >= Number(ageMin) : item.age <= Number(ageMax)
                return existAgeMax && existAgeMin            
            })
        }
        if(state){
            filterUsers = filterUsers.filter((item) => item.state === state)
        }
        if(job){
            filterUsers = filterUsers.filter((item) => item.job === job)
        }

        return res.status(200).send({users: filterUsers})
    }
    //Nesta Linha de baixo, é criado o user.json e preenche o arquivo JSON de acordo com o que foi enviado no req.body
    fileSystem.writeFileSync('src/'+'user.json', JSON.stringify(req.body));

    return res.status(201).json({message: 'Hello world'})
})

//EXERCÍCIO 6

app.post('/createList',  (req, res) => {
    const { number } = req.body

    if(!Number.isInteger(number) || number <= 0){
        return res.status(400).send({result: 'Número não inteiro ou igual e/ou menor que 0'})
    }

    const result = []
    Array(number).fill().map((element, index) => {
        result.push({item: index+1})
    })

    fileSystem.writeFileSync('src/'+`numbers.json`, JSON.stringify(result));
    
    return res.status(200).send({result: 'Arquivo criado com sucesso.'})
})

//EXERCÍCIO 8

app.get('/fatorial',  (req, res) => {
    const numberByTest = Number(req.query.number)
    if(!numberByTest){
        return res.status(400).send({result: 'Somente pode enviar um número'})
    }
    const listResult = []
    Array(numberByTest).fill().map((element, index) => {
        const newIndex = index +1
        if(index === 0){ 
            listResult.push(
                {
                    number: newIndex, 
                    form: `${newIndex} * ${newIndex} = ${newIndex}`
                })
        }
        else{
            const result = listResult[index-1].number * newIndex

            listResult.push({
                number: listResult[index-1].number * newIndex, 
                form: `${listResult[index-1].number} * ${newIndex} = ${result}`
            })
        }
    })
    return res.status(200).send({result: listResult})
})

//EXERCÍCIO 10

app.post('/convert',  (req, res) => {
    const { item } = req.body
    const messageUpdated = item.split('').map((char)=>{
        if(char === char.toLowerCase()){
            return char.toUpperCase()
        }else{
            return char.toLowerCase()
        }
    }).join('')
    
    return res.status(200).send({item: messageUpdated})
})

app.listen(3333, () => console.log('Executando'))