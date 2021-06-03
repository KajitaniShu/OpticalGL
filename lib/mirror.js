
//********************************************************//
// Mirrorクラス                                            // 
// → ミラーを作成し、管理する                                 // 
//********************************************************//
class Mirror{
    constructor(scene, group){
        this.id      = new Date().getTime().toString(16)  + Math.floor(Math.random()).toString(16);
        this.scene   = scene;
        this.group   = group;
        this.loader = new Loader();
        this.mirror  = new THREE.Group();
        this.mirrorModel = new THREE.Object3D();
        this.baseModsel  = new THREE.Object3D();

        this.x = 0;
        this.y = 0;
        this.z = 2.3;
        this.angle = 0;

        this.load();
        this.group.add(this.mirror);
    }
    
    async load(){
        this.mirrorModel  = await this.loader.load('./lib/models/mirror.glb');
        this.baseModsel   = await this.loader.load('./lib/models/baseTall.glb');
        this.mirrorModel.rotateY = this.angle;
        this.mirrorModel.position.set(0, 3.3, 0);
        this.mirror.add(this.mirrorModel, this.baseModsel);
        this.mirror.position.set(this.x, this.z, this.y);
    }

    setRotation(angle){
        if(this.angle != angle){
            this.angle = angle;
            this.mirrorModel.rotateY = this.angle;
            this.mirror.add(this.mirrorModel);
        }
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
        this.mirror.position.set(this.x, 0, this.y);
    }
}