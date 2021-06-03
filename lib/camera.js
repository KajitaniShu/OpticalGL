
//********************************************************//
// createCamera()関数                                      //
// → カメラを作成する                                        //
//********************************************************//
function createCamera(){
    const camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 3000);
    camera.position.set(60, 20, 50);
    return camera;
}

function create2DCamera(){
    const camera = new THREE.PerspectiveCamera(45, $(window).width() / $(window).height() ,0.1, 3000);
    camera.position.set(0, 100, -50);
    return camera;
}