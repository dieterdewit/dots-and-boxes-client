var tournamentID=12;
var user_name='Mochi';
var socket = require('socket.io-client')('http://127.0.0.1:51234');

socket.on('connect',function(){
    // Client has connected
    console.log("Conectado: " + user_name);
    // Signing signal
    socket.emit('signin', {
        user_name: user_name,
        tournament_id: tournamentID,
        user_role: 'player'
    });

});

socket.on('ready', function(data){
    // Client is about to move
    socket.emit('play', {
        player_turn_id: data.player_turn_id,
        tournament_id: tournamentID,
        game_id: data.game_id,
        movement: moverse_random(data.board, data.player_turn_id)
    });
});

socket.on('finish', function(data){
    // The game has finished
    console.log("Game " + data.game_id + " has finished");
    // Inform my students that there is no rematch attribute
    console.log("Ready to play again!");
    // Start again!
    socket.emit('player_ready', {

        tournament_id: tournamentID,
        game_id: data.game_id,
        player_turn_id: data.player_turn_id

    });
});


function moverse_random(board, turno){
    var retorno = [];
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