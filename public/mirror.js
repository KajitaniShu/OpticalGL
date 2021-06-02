
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
        this.elm     = elm;

        this.x = 117;
        this.y = 100;
        this.z = -250;
        this.isActive = true;
        this.angle = 0;
        this.load();
        this.group.add(this.screen);
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
        if(this.elm) this.model.position.set(this.x, 0, -this.y);
    }

    setStartPos(){
    }
}