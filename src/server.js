const express = require('express');

const app = express()
const {createFolder} = require('./utils')
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello world'})
})

app.post('/teste',  (req, res) => {
    const { folder, item } = req.body
    const existFolder = createFolder(folder)
    delete req.body.folder

    //Este if verifica se existe o arquivo input.json
    if (fs.lstatSync(folder+'/'+'input.json').isFile()) {
        //Neste result, retorna os dados do JSON de dentro do Input
        const result = JSON.parse(fs.readFileSync(folder+'/'+'input.json', 'utf8'));
        console.log(result)
    }
    //Nesta Linha de baixo, é criado o input.json e preenche o arquivo JSON de acordo com o que foi enviado no req.body
    fs.writeFileSync(folder+'/'+'input.json', JSON.stringify(req.body));

    res.status(201).json({message: 'Hello world'})
})

app.listen(3333, () => console.log('Executando'))