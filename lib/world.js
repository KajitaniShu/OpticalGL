
class World{
    constructor(canvas){
        // 描画
        this.canvas         = canvas;
        this.renderer       = createRenderer(this.canvas);
        this.scene3D        = createScene(0xd3e0ea);
        this.scene2D        = createScene(0xd3e0ea);
        // アニメーション関連
        this.count          = 0;
        this.clock          = new THREE.Clock();
        // カメラ
        this.camera         = new CameraManager(20, 5, 20, this.canvas);
        // キャラクター
        this.type           = Math.floor( Math.random() * (11 - 1) ) + 1 ;
        this.character      = new Character(this.scene3D, this.type);
        // ユーザー操作
        this.input          = new InputManager(this.character, this.camera);
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
        resize( this.camera.getCurrentCamera(), this.renderer);
        window.addEventListener('resize', () => {
            // ウィンドウのサイズが変更されたときサイズを変更する
            resize( this.camera.getCurrentCamera(), this.renderer);
        });
    }


    Animate(){
        const delta = this.clock.getDelta();

        this.count = (this.count+delta);                        // カウントアップ
        this.character.move();                                  // 自分の位置を更新
        this.camera.move(delta, this.character.x, this.character.y);

        this.renderer.render( this.scene3D, this.camera.getCurrentCamera() );           // 一人称バージョンで描画

        // キャラクターの足踏みアニメーション
        if(this.count >= 0.15){ 
            this.character.nextStep();
            this.count = 0;
        }
    }
    
}