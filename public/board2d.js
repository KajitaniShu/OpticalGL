
//********************************************************//
// Board2Dクラス                                           //
// → 2Dボードを管理する                                      //
//********************************************************// 
class Board2D{
    constructor(scene){
        this.scene          = scene;
        this.board1         = createColorCube(240, 130, 5, 0xe4fbff);
        this.board1.position.set(-20, 100, -255);

        this.board2         = createColorCube(30, 130, 5, 0xe4fbff);
        this.board2.position.set(120, 100, -255)

        this.floor     = createColorCube(500, 2, 500, 0xe4fbff);
        this.floor.position.set(0, -3, 0);
        this.scene.add(this.board1, this.board2, this.floor);
    }
}