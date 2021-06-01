'use strict';
const socket = io();
const canvas = $('#canvas1')[0];
const world = new World(socket, canvas);

socket.on('connect', async () =>{
    world.Start();
    setInterval(() => {
        world.Animate();
    },1000/30);
});
