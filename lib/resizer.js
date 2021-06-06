
//********************************************************//
// resize関数                                              //
// → 初期化時とディスプレイサイズ変更時にアスペクト比等を最適化     //
//********************************************************//
function resize(camera, renderer){
        camera.aspect =$(window).width() / $(window).height();          // カメラのアスペクト比(= 幅/高さ)を更新
        camera.updateProjectionMatrix();                                // カメラの射影行列を更新
        renderer.setSize($(window).width(), $(window).height());        // レンダラーの描画サイズを変更
        renderer.setPixelRatio(window.devicePixelRatio);                // レンダラーのピクセルレートを更新
}

