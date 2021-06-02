
//********************************************************//
// Mirrorクラス                                            // 
// → ミラーを作成し、管理する                                 // 
//********************************************************//
class Mirror{
    constructor(socket, scene, group, elm){
        this.socket  = socket;
        this.id      = new Date().getTime().toString(16)  + Math.floor(Math.random()).toString(16);
        this.scene   = scene;
        this.group   = group;
        this.mirror  = new THREE.Group();
        this.elm     = elm;

        this.loader = new Loader();
        this.mirrorModel = new THREE.Object3D();
        this.baseModsel  = new THREE.Object3D();

        this.x = 117;
        this.y = 100;
        this.z = -250;
        this.isActive = true;
        this.angle = 0;
        this.load();
        this.group.add(this.mirror);
    }
    
    async load(){
        this.mirrorModel  = await this.loader.load('../public/models/mirror.glb');
        this.baseModsel   = await this.loader.load('../public/models/baseTall.glb');
        this.mirrorModel.position.set(0, 3.3, 0);
        this.mirror.add(this.mirrorModel, this.baseModsel);
        this.mirror.position.set(this.x, 0, -this.y);
    }

    setRotation(angle){
        if(this.angle != angle){
            this.angle = angle;
            this.mirror.rotation.set(0, this.angle, 0);
        }
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
        this.mirror.position.set(this.x, 0, -this.y);
    }
}