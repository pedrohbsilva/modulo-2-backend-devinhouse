const fileSystem = require('fs');

function getData(fileName){
    const result = JSON.parse(fileSystem.readFileSync('src/database/'+fileName, 'utf8'));
    return result
}

function createOrUpdateData(data){
    fileSystem.writeFileSync('src/database/'+'user.json', JSON.stringify(data));
}

module.exports = {
    getData,
    createOrUpdateData
}