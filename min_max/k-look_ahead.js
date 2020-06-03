const fs = require('fs')
const min_max = require('./minMax')

const EMPTY = 99


function board_translate(translated, board) {
    if (translated === false){
        return board[0].concat(board[1])
    }
    else {
        let half = Math.ceil(board.length / 2)
        return [
            board.slice(0, half),
            board.slice(half, board.length)
        ]
    }
}

function find_parent(translated_board_lenght, node2_count, parent_iters){
    for (let i = 1; i <= translated_board_lenght; i++){
        if (node2_count < (parent_iters * i)){
            return (i - 1)
        }
    }
}

module.exports = function look_ahead(k, board, turnId) {
    let translated_board = board_translate(false, board);
    const translated_board_lenght = translated_board.length

    let calculate_iterations = 0;

    for (let iters = 0; iters < translated_board_lenght; iters++){
        if (translated_board[iters] === EMPTY){
            calculate_iterations = calculate_iterations + 1;
        }
    }

    let k1_node = {}
    let k1_turn = {}
    let node_count = 0

    let k2_board = [];
    let k2_node = {}
    let k2_turn = {}
    let node2_count = 0
    let second_turn_mine;

    fs.unlink('data/Look_Ahead_1.json', function (err) {
        if (err) console.log("No such file, 'data/Look_Ahead_1.json'. File will be created...");
    });
    fs.unlink('data/Look_Ahead_2.json', function (err) {
        if (err) console.log("No such file, 'data/Look_Ahead_2.json'. File will be created...");
    });

    if (k >= 1){
        for (let k1 = 0; k1 < translated_board_lenght; k1++){
            if (translated_board[k1] === EMPTY){
                translated_board[k1] = 0
                k1_turn["Board"] = board_translate(true, translated_board)
                if (k1 < Math.ceil(translated_board_lenght / 2)){
                    k1_turn["Array"] = 0;
                }
                else {
                    k1_turn["Array"] = 1;
                }
                k1_node["Node" + node_count] = k1_turn
                if (k1 < Math.ceil(translated_board_lenght / 2)){
                    k1_turn["Position"] = k1
                }
                else {
                    k1_turn["Position"] = k1 - Math.ceil(translated_board_lenght / 2)
                }
                let minMax_values = min_max(board, board_translate(true, translated_board), true)
                k1_turn["Heuristic"] = minMax_values[1]
                k1_turn["Useful"] = minMax_values[2]
                second_turn_mine = minMax_values[3]
                k1_turn["Mine"] = true

                k2_board = translated_board
                translated_board = board_translate(false, board);
                node_count = node_count + 1;
                k1_turn = {}
            }

            if (k >= 2){
                let k2_board_iter = k2_board.concat()
                for (let k2 = 0; k2 < translated_board_lenght; k2++){
                    if (k2_board_iter[k2] === EMPTY){
                        k2_board_iter[k2] = 0
                        k2_turn["Board"] =  board_translate(true, k2_board_iter)
                        if (k2 < Math.ceil(translated_board_lenght / 2)){
                            k2_turn["Array"] = 0
                        }
                        else {
                            k2_turn["Array"] = 1
                        }
                        k2_node["Node" + node2_count] = k2_turn
                        let parent_iters = calculate_iterations - 1

                        k2_turn["Parent"] = "Node" + find_parent(translated_board_lenght, node2_count, parent_iters)
                        if (k2 < Math.ceil(translated_board_lenght / 2)){
                            k2_turn["Position"] = k2
                        }
                        else {
                            k2_turn["Position"] = k2 - Math.ceil(translated_board_lenght / 2)
                        }

                        let minMax2_values = min_max(board_translate(true, k2_board), board_translate(true, k2_board_iter), second_turn_mine)
                        k2_turn["Heuristic"] = minMax2_values[1]
                        k2_turn["Useful"] = minMax2_values[2]
                        k2_turn["Mine"] = second_turn_mine

                        k2_board_iter = k2_board.concat()
                        node2_count = node2_count + 1;
                        k2_turn = {}
                    }
                }
            }
        }
    }
    fs.appendFileSync('data/Look_Ahead_1.json', JSON.stringify(k1_node, null, 2), (err) => {
        if (err) throw err;
    })
    fs.appendFileSync('data/Look_Ahead_2.json', JSON.stringify(k2_node, null, 2), (err) => {
        if (err) throw err;
    })
}
