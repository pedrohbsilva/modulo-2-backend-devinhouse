const http = require('http')

const server = http.createServer((req, res) => {
    console.log(req.url)
    if(req.url === '/' && req.method === 'GET') {
        console.log('Método get')
        res.end(JSON.stringify({ message: 'Não deu' }))
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Rota não encontrada' }))
    }
})

const PORT =  process.env.PORT || 5000

server.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`))

module.exports = server;