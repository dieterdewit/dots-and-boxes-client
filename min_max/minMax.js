const print_board = require('../testing/board_visualization')

const EMPTY = 99
const N = 6

function calculate_points(board){
    let adder = 0
    let counter = 0
    let total_points = 0

    let board_side_lenght = board[0].length

    for (let init = 0; init < board_side_lenght; init++){
        if (((init + 1) % N) !== 0){
            if (board[0][init] !== EMPTY && board[0][init + 1] !== EMPTY && board[1][counter + adder] !== EMPTY && board[1][counter + adder + 1] !== EMPTY){
                total_points = total_points + 1
            }
            adder = adder + N
        }
        else {
            counter = counter + 1
            adder = 0
        }
    }
    //console.log("\nTotal Points: " + total_points + '\n')
    //print_board(child_board)
    return total_points
}

module.exports = function min_max(parent_board, child_board, myTurn) {
    let useful;
    let next_turn_mine;
    let parent_heuristic = calculate_points(parent_board)
    let child_heuristic = calculate_points(child_board)

    // Alpha-Beta Pruning for Max
    if (myTurn === true){
        if (child_heuristic > parent_heuristic){
            useful = "Yes"
            next_turn_mine = true
        }
        else if (child_heuristic === parent_heuristic){
            useful = "Maybe"
            next_turn_mine = false
        }
    }
    // Alpha-Beta Pruning for Min
    else {
        if (child_heuristic === parent_heuristic){
            useful = "Yes"
            next_turn_mine = true
        }
        else {
            useful = "Maybe"
            next_turn_mine = false
        }
    }
    return [parent_heuristic, child_heuristic, useful, next_turn_mine]
}