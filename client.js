const socket = require('socket.io-client')('http://127.0.0.1:51234');
const tournamentID = 12;
const user_name = 'Dieter de Wit';
const current_time = new Date();
let tree_trained = false;

socket.on('connect',function(){
    // Client has connected to server
    console.log("User " + user_name + " connected.");
    socket.emit('signin', {
        user_name: user_name,
        tournament_id: tournamentID,
        user_role: 'player'
    });
});

socket.on('ready', function(data){
    // Client waiting to be assigned
    //console.log(data.board);
    //console.log("Last Move: " + current_time.getHours() + ":" + current_time.getMinutes() + ":" + current_time.getSeconds())
    socket.emit('play', {
        player_turn_id: data.player_turn_id,
        tournament_id: tournamentID,
        game_id: data.game_id,
        movement: moverse_random(data.board, data.player_turn_id)
    });
});

socket.on('finish', function(data){
    // Game has finished
    console.log("----- Game " + data.game_id + " has finished -----");
    console.log("Ready to play again!");
    // Start again!
    socket.emit('player_ready', {
        tournament_id: tournamentID,
        game_id: data.game_id,
        player_turn_id: data.player_turn_id
    });
});


function moverse_random(board, turno){
    if (tree_trained === false && turno === 1){
        console.log(construct_trained_tree(board));
        tree_trained = true;
    }
    var arrayLength = board.length;
    for(var i = 0; i < arrayLength; i++){
        var secondArray = board[i];

        var secondLenght = secondArray.length;
        for(var j = 0; j < secondLenght; j++){
            if(secondArray[j] === 99){
                return [i, j]
            }
        }
    }
}

function construct_trained_tree(board){
    let iter_tree = {}
    let train_board = board
    let row = board[0];
    let column = board[1];

    /*
    for(let y = 0; y <= row.length; y++){
        if (row[y] === 99){
            row[y] = 0;
        }
        for(let x = 0; x <= column.length; x++){
            if (column[x] === 99){
                column[x] = 0;
            }
        }
    }
    console.log([row, column])
    return [row, column]
     */
    return "Training..."
}

