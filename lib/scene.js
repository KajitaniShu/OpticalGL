//********************************************************//
// createScene()関数                                      //
// → sceneを作成する                                     //
// → 引数にとった色を背景にする                          //
//********************************************************//
function createScene(color){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(color);
    scene.add(new THREE.AxesHelper(500));
    scene.add(new THREE.GridHelper(1000, 100));
    return scene;
}