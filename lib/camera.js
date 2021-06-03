
//********************************************************//
// createCamera()関数                                      //
// → カメラを作成する                                        //
//********************************************************//
function createCamera(){
    const camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 3000);
    camera.position.set(60, 20, 50);
    return camera;
}

function createFirstPersonCamera(x, y, z){
    const camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 3000);
    camera.position.set(x, y, z+2);
    return camera;
}