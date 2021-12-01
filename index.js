const http = require('http')
const fileSystem = require('fs')

const server = http.createServer((req, res) => {
    if(req.url === '/' && req.method === 'POST') {
        function createFolder(folder){
            if(!fileSystem.existsSync(folder)){
                fileSystem.mkdirSync(folder)
                return 'Criou a pasta'
            }
            return 'Não criou a pasta'
        }
        const folder = 'repositorio'
        const file = 'text.txt'
        fileSystem.writeFileSync(folder+'/'+file, 'Deu certo')
        try {
            const newFolder = createFolder(folder)
            res.end(JSON.stringify({ message: newFolder }))

        } catch (error) {
            res.end(JSON.stringify({ message: 'Deu algum erro', error }))
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Rota não encontrada' }))
    }
})

const PORT =  process.env.PORT || 3333

server.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))

module.exports = server;