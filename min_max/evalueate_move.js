const fs = require('fs')
const look_ahead = require('./k-look_ahead')

function read_json(path){
    try {
        const jsonString = fs.readFileSync(path)
        return JSON.parse(jsonString)
    } catch(err) {
        console.log(err)
    }
}

module.exports = function movement(board, turnId) {
    look_ahead(2, board, turnId)

    let k1 = read_json('./data/Look_Ahead_1.json')
    let k2 = read_json('./data/Look_Ahead_2.json')
    let max = []
    let min = []
    let min_max_diff;

    for (let [key, value] of Object.entries(k1)) {
        let countKey = Object.keys(k1).length;
        for (let [k, v] of Object.entries(k2)) {
            if (value.Useful === 'Yes' && v.Useful === 'Yes' && v.Mine === true && key === v.Parent) {
                max.push([v.Heuristic, value.Array, value.Position])
                min_max_diff = 'max';
            }
            else if (value.Useful === 'Yes' && v.Useful === 'Maybe' && v.Mine === true && key === v.Parent) {
                max.push([v.Heuristic, value.Array, value.Position])
                min_max_diff = 'max';
            }
            else if (value.Useful === 'Maybe' && v.Useful === 'Yes' && v.Mine === false && key === v.Parent) {
                min.push([v.Heuristic, value.Array, value.Position])
                min_max_diff = 'min';
            }
            else if (value.Useful === 'Maybe' && v.Useful === 'Maybe' && v.Mine === false && key === v.Parent) {
                min.push([v.Heuristic, value.Array, value.Position])
                min_max_diff = 'min';
            }
        }
        if (countKey === 1){
            let array = value.Array
            let position = value.Position
            console.log([array, position])
            return [parseInt(array), parseInt(position)]
        }
    }
    if (min_max_diff === 'max'){
        let temp_max = []
        for (let i = 0; i < max.length; i++){
            temp_max.push(99 + max[i][0].toString() + max[i][1] + max[i][2])
        }
        let maximum = temp_max.indexOf(Math.max(...temp_max).toString())
        let array = max[maximum][1]

        let position = max[maximum][2]
        console.log([array, position])
        return [parseInt(array), parseInt(position)]
    }
    else if (min_max_diff === 'min'){
        let temp_min = []
        for (let i = 0; i < min.length; i++){
            temp_min.push(99 + min[i][0].toString() + min[i][1] + min[i][2])
        }
        let minimum = temp_min.indexOf(Math.min(...temp_min).toString())
        let array = min[minimum][1]

        let position = min[minimum][2]
        console.log([array, position])
        return [parseInt(array), parseInt(position)]
    }
    else {
        console.log("ERROR !!!")
    }
}