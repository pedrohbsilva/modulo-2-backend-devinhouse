const express = require('express');

const app = express()
const fileSystem = require('fs')
const { createFolder } = require('./utils')
app.use(express.json())
const multer = require('multer')

app.get('/', (req, res) => {
   return res.status(200).json({message: 'Hello world'})
})

// const destinyFolder = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, 'src/folder')
//     },
//     filename: (req, file, callback) => {
//         callback(null, Date.now()+file.originalname)
//     }
// })

multer({dest: 'src/folder'})
const upload = multer()


app.post('/', upload.single('file'),  (req, res) => {
    const { folder, item } = req.body
    
    // const { job } = req.query
    // const existFolder = createFolder(folder)
    fileSystem.writeFileSync('src/folder/'+req.file.originalname, req.file.buffer)
    return res.status(201).json({message: 'Hello world'})
})

app.listen(3333, () => console.log('Executando'))