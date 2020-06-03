const EMPTY = 99

module.exports = function print_board(board) {
    let board_result = ""
    let adder = 0
    const board_cube_lenght = board[0].length / 5

    for (let tile = 0; tile < board_cube_lenght; tile++){
        if (board[0][tile] === EMPTY){
            board_result = board_result + '*   '
        }
        else {
            board_result = board_result + '* - '
        }
        if (board[0][tile + 6] === EMPTY) {
            board_result = board_result + '*   '
        }
        else {
            board_result = board_result + '* - '
        }
        if (board[0][tile + 12] === EMPTY) {
            board_result = board_result + '*   '
        }
        else {
            board_result = board_result + '* - '
        }
        if (board[0][tile + 18] === EMPTY) {
            board_result = board_result + '*   '
        }
        else {
            board_result = board_result + '* - '
        }
        if (board[0][tile + 24] === EMPTY) {
            board_result = board_result + '*   *\n'
        }
        else {
            board_result = board_result + '* - *\n'
        }

        if (tile !== 5) {
            for (let j = 0; j < board_cube_lenght; j++) {
                if (board[1][j + adder] === EMPTY) {
                    board_result = board_result + '    '
                }
                else {
                    board_result = board_result + '|   '
                }
            }
            adder = adder + 6
            board_result = board_result + '\n'
        }
    }
    console.log(board_result)
}