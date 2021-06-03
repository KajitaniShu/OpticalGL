
class World{
    constructor(canvas){
        // 描画
        this.canvas         = canvas;
        this.renderer       = createRenderer(this.canvas);
        this.scene3D        = createScene(0xd3e0ea);
        this.scene2D        = createScene(0xd3e0ea);
        this.is2D           = false;
        // アニメーション関連
        this.count          = 0;
        this.clock          = new THREE.Clock();
        // カメラ
        this.camera3D         = createCamera();
        this.camera2D       = create2DCamera();
        // キャラクター
        this.type           = Math.floor( Math.random() * (11 - 1) ) + 1 ;
        this.myInfo         = new MyInfo(this, this.scene3D, this.type, this.camera3D, this.modalManager);
        // ユーザー操作
        this.input          = new InputManager(this, this.myInfo, this.camera3D, this.canvas);
        // 要素
        const {ambientLight, mainLight} = createLight('white', 'white', 20, 500, 20);       // ライト
        this.scene3D.add(ambientLight, mainLight);
        
        // 光学系
        this.opticalEleents = new THREE.Group();
        this.opticalEleents.scale.set(2, 2, 2);
        this.laser1          = new Laser(this.scene, this.opticalEleents);
        this.lens1           = new Lens(this.scene, this.opticalEleents);
        this.mirror1         = new Mirror(this.scene, this.opticalEleents);
        this.screen1         = new Screen(this.scene, this.opticalEleents);

        // 位置や角度を決定 (いずれはキー操作等で変更) ///////////////////////
        this.laser1.setPosition(20, 30);
        this.laser1.setRotation(Math.PI / 2);
        this.lens1.setPosition(20, 0);
        this.mirror1.setPosition(20, -30);
        this.mirror1.setRotation(Math.PI/4);
        this.screen1.setPosition(-40, -30);
        this.screen1.setRotation(Math.PI/2);
        this.scene3D.add(this.opticalEleents);
        ////////////////////////////////////////////////////////////////

        // リサイズ
        resize( this.camera3D, this.renderer);
        window.addEventListener('resize', () => {
            // ウィンドウのサイズが変更されたときサイズを変更する
            resize( this.camera3D, this.renderer);
        });
    }
    
    Animate(){
        this.count = (this.count+this.clock.getDelta());                        // カウントアップ
        this.myInfo.move();                                                     // 自分の位置を更新
        // 2Dと3Dの切り替え
        if(this.is2D){
            this.renderer.render( this.scene2D, this.camera2D );                // 2Dバージョンで描画
        }else{
            this.input.update();                                                // OrbitControls(カメラがくるくるするやつ)の中心点を更新
            this.input.controls.update();                                       // OrbitControlsのカメラの位置を更新
            this.renderer.render( this.scene3D, this.camera3D );                // 3Dバージョンで描画
            
        }
        // キャラクターの足踏みアニメーション
        if(this.count >= 0.15){ 
            this.myInfo.nextStep();
            this.count = 0;
        }
    }
    
}