const fileSystem = require('fs')

function createFolder(folderName){
    if(!fileSystem.existsSync(folderName)){
        fileSystem.mkdirSync(folderName)
        return folderName + ' - criado com sucesso!'
    }
    return folderName + ' - não foi possível criar!'
}

module.exports = {
    createFolder
}