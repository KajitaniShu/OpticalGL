
class World{
    constructor(socket, canvas){
        this.socket         = socket;
        this.canvas         = canvas;
        this.renderer       = createRenderer(this.canvas);
        this.scene          = createScene(0xd3e0ea);
        this.camera         = createCamera();
        this.camera2D       = create2DCamera();
        this.receiver       = new Receiver(this.socket, this.scene, this.camera);
        this.type           = Math.floor( Math.random() * (11 - 1) ) + 1 ;
        this.modalManager   = new ModalManager();
        this.myInfo         = new MyInfo(this.socket, this.scene, this.type, this.camera, this.modalManager);
        this.input          = new InputManager(this, this.myInfo, this.camera, this.canvas);
        const {ambientLight, mainLight} = createLight('white', 'white', 20, 500, 20);
        this.scene.add(ambientLight, mainLight);
        this.context        = canvas.getContext('2d');
        this.count          = 0;
        this.clock          = new THREE.Clock();
        this.opticalEleents = new THREE.Group();
        
        this.laser1          = new Laser(this.socket, this.scene, this.opticalEleents, true);
        this.lens1           = new Lens(this.socket, this.scene, this.opticalEleents, true);
        this.mirror1         = new Mirror(this.socket, this.scene, this.opticalEleents, true);
        this.screen1         = new Screen(this.socket,this.scene, this.opticalEleents, true);

        this.laser1.setPosition(20, 130);
        this.laser1.setRotation(Math.PI / 2);
        this.lens1.setPosition(20, 100);
        this.mirror1.setPosition(20, 70);
        this.screen1.setPosition(-40, 70);
        this.screen1.setRotation(Math.PI/2);
        this.opticalEleents.scale.set(4, 4, 4);
        this.opticalEleents.position.set(40, 8, 400);
        this.scene.add(this.opticalEleents);

        resize( this.camera, this.camera2D, this.renderer, this.is2D);
        
        window.addEventListener('resize', () => {
            // ウィンドウのサイズが変更されたときサイズを変更する
            resize( this.camera, this.camera2D, this.renderer, this.is2D);
        });
        $(window).on('beforeunload', (event) => {
            this.socket.disconnect();
        });
    }
    
    async init(){
    }

    Start(){
        this.receiver.Start();
        this.myInfo.Start();
        socket.emit('start', this.myInfo.type, this.myInfo.x, this.myInfo.y);
    }
    

    Animate(){
        this.count = (this.count+this.clock.getDelta());
        this.myInfo.move();
        this.myInfo.nextStep();
        if(this.myInfo.is2D){
            this.renderer.render( this.scene, this.camera2D );
        }else{
            this.input.update();
            this.input.controls.update();
            this.renderer.render( this.scene, this.camera );
            
        }
        
        if(this.count >= 0.15) this.count = 0;
    }
    
}