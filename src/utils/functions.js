const fileSystem = require('fs')

function getData(){
    const result = JSON.parse(fileSystem.readFileSync('src/database/'+'user.json', 'utf8'));
    return result
}

function createOrUpdateData(data){
    fileSystem.writeFileSync('src/database/'+'user.json', JSON.stringify(data));
}

function parseData(updateItem, oldItem){
    return{
        name: updateItem.name ? updateItem.name : oldItem.name,
        age: updateItem.age ? updateItem.age : oldItem.age,
        job: updateItem.job ? updateItem.job : oldItem.job,
        state:updateItem.state ? updateItem.state : oldItem.state
    }
}

module.exports = {
    getData,
    createOrUpdateData,
    parseData
}