const print_board = require('../testing/board_visualization')

const test_board = [
    [0, 0, 0, 99, 99, 99, 99, 99, 99, 0, 0, 0, 0, 0, 0, 0, 99, 99, 99, 99, 99, 99, 99, 99, 99, 0, 0, 0, 0, 0],
    [0, 0, 0, 99, 99, 99, 99, 99, 99, 0, 0, 0, 0, 0, 0, 0, 99, 99, 99, 99, 99, 99, 99, 99, 99, 0, 0, 0, 0, 0]
]

const EMPTY = 99
const N = 6
let adder = 0
let counter = 0
let total_points = 0

function calculate_points(board){
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
    //print_board(test_board)
    return total_points
}
