const socket = require('socket.io-client')('http://127.0.0.1:51234');
const movement = require('./min_max/evalueate_move')
const tournamentID = 12;
const user_name = 'Pascalito';
const current_time = new Date();


const board = [
    [
        0,  0,  0,  0,  0,  0,  0,  0,  0,
        0,  0,  0,  0, 99, 99, 99, 99, 99,
        99, 99, 99, 99, 99, 99, 99, 99, 99,
        99, 99, 99
    ],
    [
        0, 99, 99,  0,  0,  0,  0, 99,  0,
        0, 99, 99, 99, 99, 99, 99, 99, 99,
        99, 99, 99, 99, 99, 99, 99, 99, 99,
        99, 99, 99
    ]
]


movement(board, 1)



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
    console.log("Last Move: " + current_time.getHours() + ":" + current_time.getMinutes() + ":" + current_time.getSeconds())
    console.log(data.board)
    socket.emit('play', {
        player_turn_id: data.player_turn_id,
        tournament_id: tournamentID,
        game_id: data.game_id,
        movement: movement(data.board, data.player_turn_id)
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

