
//********************************************************//
// createRenderer()関数                                   //
// → rendererを作成する                                  //
//********************************************************//
function createRenderer(canvas){
    const renderer = new THREE.WebGLRenderer({ canvas:canvas, antialias: true, alpha: true  });

    // 物理的に正しいライトを有効にする
    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    return renderer;
}