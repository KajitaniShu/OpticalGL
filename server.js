'use strict';

const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

//********************************************************//
// Playerクラス                                           //
//********************************************************//
class Player{
    constructor(socketID, type, x, y){
        this.id = socketID;
        this.type = type;
        this.width = 80;
        this.heiht = 80;
        this.x = x;
        this.y = y;
        this.oldX = x;
        this.oldY = y;
        this.angle = 270;
    }
    
    setPosition(x, y){
        this.x = x;
        this.y = y;
    }

    setAngle(angle){
        this.angle = angle;
    }
};

let players = {};       // プレイヤー一覧

// 接続を確認したとき
io.on('connection', function(socket){
    let player = null;
    
    // 開始時
    socket.on('start', function(type, x, y) { 
        player = new Player(socket.id, type, x, y);
        players[socket.id] = player;
    });

    // 移動
    socket.on('move', function(x, y, angle) {
        player.setPosition(x, y);
        player.setAngle(angle);
    });

    // 通信が終了したとき
    socket.on('disconnect', () => {
        if(!player){return;}
        delete players[player.id];
        player = null;
    });
});


setInterval(function() {
    io.sockets.emit('update', players);
}, 1000/30);

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/public/index.html'));
});

// サーバーを起動
const PORT_NO  = process.env.PORT || 8080;
server.listen(PORT_NO, () => {
});