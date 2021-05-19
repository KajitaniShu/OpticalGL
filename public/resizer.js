function resize(camera, camera2D, renderer, is2D){
    if(is2D){
        camera2D.aspect =$(window).width() / $(window).height();
        camera2D.updateProjectionMatrix();
        renderer.setSize($(window).width(), $(window).height());
        renderer.setPixelRatio(window.devicePixelRatio);
    }else{
        camera.aspect =$(window).width() / $(window).height();
        camera.updateProjectionMatrix();
        renderer.setSize($(window).width(), $(window).height());
        renderer.setPixelRatio(window.devicePixelRatio);
    }
    
}

