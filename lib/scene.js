//********************************************************//
// createScene()関数                                      //
// → sceneを作成する                                       //
// → 引数にとった色を背景にする                               //
//********************************************************//
function createScene(color){
    const scene = new THREE.Scene();                // シーンを作成
    scene.background = new THREE.Color(color);      // シーンの背景色を設定

    scene.add(new THREE.AxesHelper(500));           // xyz座標を表示
    scene.add(new THREE.GridHelper(1000, 100));     // マス目を表示
    
    return scene;
}