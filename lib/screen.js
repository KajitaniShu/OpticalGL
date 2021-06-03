
//********************************************************//
// Screenクラス                                            // 
// → スクリーンを作成し、管理する                              // 
//********************************************************//
class Screen{
    constructor(scene, group){
        this.id      = new Date().getTime().toString(16)  + Math.floor(Math.random()).toString(16);
        this.scene   = scene;
        this.group   = group;
        this.loader = new Loader();
        this.screen   = new THREE.Group();
        this.model = new THREE.Object3D();

        this.x = 0;
        this.y = 0;
        this.z = 7;
        this.angle = 0;

        this.image2D =  new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('./lib/img/screen.png'),
            color:0xFFFFFF,
            transparent:true
        });
        this.geo2D  = new THREE.PlaneGeometry(7.5, 7.5, 7.5);
        this.sprite1 = new THREE.Mesh(this.geo2D, this.image2D);
        this.sprite2 = new THREE.Mesh(this.geo2D, new THREE.MeshBasicMaterial());
        this.sprite1.position.set(0, 0, 0.5);
        this.sprite2.position.set(0, 0, -0.5);
        this.sprite2.rotation.set(0, Math.PI, 0);
        this.screen.add(this.sprite1, this.sprite2);
        
        this.load();
        this.group.add(this.screen);
    }

    async load(){
        this.model  = await this.loader.load('./lib/models/screen.glb');
        this.model.position.set(0, -6.3, 0);
        this.screen.add(this.model);
        this.screen.position.set(this.x, this.z, this.y);
    }

    setRotation(angle){
        if(this.angle != angle){
            this.angle = angle;
            this.screen.rotation.set(0, this.angle, 0);
        }
    }

    setPosition(x, y){
        this.x = x;
        this.y = y;
        this.screen.position.set(this.x, this.z, this.y);
    }
}