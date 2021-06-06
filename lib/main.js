'use strict';
const canvas = $('#canvas1')[0];
const world = new World(canvas);

window.onload = async function(){
    setInterval(() => {
        world.Animate();
    },1000/60);
};
