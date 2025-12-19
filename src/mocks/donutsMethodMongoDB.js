const donutsDB = require("./donutsDB")

const find = (id) => {
    if(!id) {
        console.log(donutsDB)
        return donutsDB
    }else{
        const donut = donutsDB.find(d => d.id == id)
        return donut
    }
}


const newDonutModel = (id, name, flavor, price ) => {
    donutsDB.push({
        id, name, flavor, price
    })
}


module.exports = { find, newDonutModel}