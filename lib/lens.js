
//********************************************************//
// Lensクラス                                              // 
// → レンズを作成し、管理する                                 // 
//********************************************************//
class Lens{
    constructor(scene, group){
        this.id      = new Date().getTime().toString(16)  + Math.floor(Math.random()).toString(16);
        this.scene   = scene;
        this.group   = group;
        this.loader  = new Loader();
        this.lens    = new THREE.Group();
        this.model   = new THREE.Object3D();

        this.x = 0;
        this.y = 0;
        this.z = 2.8;
        this.angle = 0;

        this.load();
        this.group.add(this.lens);
    }

    async load(){
        this.model  = await this.loader.load('./lib/models/lens.glb');
        this.model.position.set(0, -2.5, 0);
        this.lens.add(this.model);
    }

    setRotation(angle){
        if(this.angle != angle){
            this.angle = angle;
            this.laser.rotation.set(0, this.angle, 0);
        }
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
        this.lens.position.set(this.x, this.z, this.y);
    }
}