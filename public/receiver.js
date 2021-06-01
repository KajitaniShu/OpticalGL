
//********************************************************//
// Receiverクラス                                         //
// → socketとの送受信、受信時の反応を扱う                //
//********************************************************//
class Receiver{
    constructor(socket, scene3D, scene2D, camera){
        this.socket = socket;
        this.scene3D = scene3D;
        this.scene2D = scene2D;
        this.camera = camera;
        this.playerModels = {};
        this.players = {};
        this.isActive = {};
        this.count = 0;
        this.clock = new THREE.Clock();
    }

    Start(){
        this.socket.on('update', (players) => {
            this.count = (this.count+this.clock.getDelta());
            Object.keys(this.playerModels).forEach((key) => {
                if(!this.playerModels[key].isActive) {
                    this.scene3D.remove(this.playerModels[key].sprite);
                    delete this.playerModels[key];
                }else{
                    this.playerModels[key].isActive = false;
                }
            });
            
            Object.values(players).forEach((player) => {
                if(player.id != this.socket.id){    // 自分自身はここでは描画しない
                    // 未登録の参加者がいたら新規作成
                    if( this.playerModels[player.id] == null){
                        this.playerModels[player.id] = new PlayerModel(player.socketID, this.scene3D, player.type, player.x, player.y, player.angle);
                    }
                    
                    this.playerModels[player.id].updatePosition(player.x, player.y);
                    this.playerModels[player.id].changeAngle(player.angle);
                    
                    if(this.count >= 0.15) this.playerModels[player.id].nextStep();
                    
                    this.playerModels[player.id].isActive = true;
                }
            });

            if(this.count >= 0.15) this.count = 0;
        });
    }
}