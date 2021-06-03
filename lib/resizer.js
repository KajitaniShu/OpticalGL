function resize(camera, renderer){
        camera.aspect =$(window).width() / $(window).height();
        camera.updateProjectionMatrix();
        renderer.setSize($(window).width(), $(window).height());
        renderer.setPixelRatio(window.devicePixelRatio);
}

