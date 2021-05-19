//********************************************************//
// createScene()関数                                      //
// → sceneを作成する                                     //
// → 引数にとった色を背景にする                          //
//********************************************************//
function createScene(color){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(color);
    return scene;
}