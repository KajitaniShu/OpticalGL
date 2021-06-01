
//********************************************************//
// Lensクラス                                             // 
// → レンズを作成し、管理する                            // 
//********************************************************//
class Lens{
    constructor(socket, scene, group, elm){
        this.socket  = socket;
        this.id      = new Date().getTime().toString(16)  + Math.floor(Math.random()).toString(16);
        this.scene   = scene;
        this.group   = group;
        this.elm     = elm;
        this.image2D =  new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./public/img/lens.png'),
            color:0xFFFFFF,
            transparent:true
        });
        this.geo2D  = new THREE.PlaneGeometry(5, 5, 5);
        this.sprite = new THREE.Mesh(this.geo2D, this.image2D);
        this.loader = new Loader();
        
        this.x = 117;
        this.y = 0;
        this.z = -250;
        this.isActive = true;
        this.angle = 0;
        this.sprite.position.set(this.x, this.y, this.z);
        this.sprite.scale.set(3, 3, 3);
        this.sprite.rotation.z = 0;
        //this.scene.add(this.sprite);
        this.model = new THREE.Object3D();
        this.load();
    }

    async load(){
        this.model  = await this.loader.load('../public/models/lens.glb');
        this.model.position.set(this.x, -2.5, -this.y);
        this.group.add(this.model);
    }

    setRotation(angle){
        if(this.angle != angle){
            this.angle = angle;
        }
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
        this.sprite.position.set(this.x, this.y, this.z);
        this.model.position.set(this.x, 0, -this.y);
    }

}