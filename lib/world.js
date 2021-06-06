
class World{
    constructor(canvas){
        // 描画関連
        this.canvas         = canvas;                                                   // 描画対象のcanvas(HTML要素)
        this.renderer       = createRenderer(this.canvas);                              // レンダラー(描画まわりを管理)
        this.scene          = createScene(0xd3e0ea);                                    // シーン(3D空間的な)
        // アニメーション関連
        this.count          = 0;                                                        // アニメーション切り替えのためのカウント変数
        this.clock          = new THREE.Clock();                                        // デルタタイム(ひとつ前のフレームから経過した時間)を取得する用
        // カメラ
        this.camera         = new CameraManager(50, 5, 50, this.canvas);                // カメラ(一人称・三人称のカメラを保持)
        this.scene.add(this.camera.fpsControl.getObject());                             // PointerLockControlsのインスタンスをシーンに追加
        // キャラクター
        this.type           = Math.floor( Math.random() * 10 ) + 1 ;                    // キャラクターの画像をランダム(10パターン)で決める
        this.character      = new Character(this.scene, this.type);                     // キャラクターを作成
        // ユーザー操作
        this.input          = new InputManager(this.character, this.camera);            // キー入力やスマホの画面タップを受け付ける用
        // 要素
        const {ambientLight, mainLight} = createLight('white', 'white', 20, 500, 20);   // 環境光と平行光を作成
        this.scene.add(ambientLight, mainLight);                                        // シーンにライトを追加
        
        // 光学系
        this.opticalEleents = new THREE.Group();                                        // 光学系をまとめたリスト(まとめると描画効率が良い・拡大、移動が楽なため)
        this.opticalEleents.scale.set(2, 2, 2);                                         // 光学系を全体的に2倍に拡大
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
        this.scene.add(this.opticalEleents);
        ////////////////////////////////////////////////////////////////

        // リサイズ
        resize( this.camera.getCurrentCamera(), this.renderer);
        window.addEventListener('resize', () => {
            // ウィンドウのサイズが変更されたときサイズを変更する
            resize( this.camera.getCurrentCamera(), this.renderer);
        });
    }


    Animate(){
        // キャラクターの足踏みアニメーション
        const delta = this.clock.getDelta();
        this.count += delta;                                                            // カウントアップ
        if(this.count >= 0.15){                                                         // countが0.15になるごとにアニメーション
            this.character.nextStep();
            this.count = 0;
        }
        
        this.character.changeAngle(this.camera.getCurrentAngle());                      // キャラクターの角度を更新
        this.character.move();                                                          // キャラクターの位置を更新
        this.camera.move(delta, this.character.x, this.character.y);                    // カメラ位置の更新(注視点をキャラクターの位置に合わせる)

        this.renderer.render( this.scene, this.camera.getCurrentCamera() );             // 描画
    }
}