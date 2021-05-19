
//********************************************************//
// ModalManagerクラス                                      //

class ModalManager{
    constructor(){
        this.position = {
            // 各施設のマップ上での位置
            '研究管理棟'         :{leftX:  -70,  rightX :   -3, frontY:  168,  backY:  102},
            '図書館'            :{leftX:   90,  rightX :  150, frontY:  191,  backY:  153},
            '講義棟'            :{leftX:  112,  rightX :  175, frontY:   65,  backY:  -10},
            '研究棟'            :{leftX:  -86,  rightX :   60, frontY:   -8,  backY:  -67},
            '総合研究棟'         :{leftX: -142,  rightX : -110, frontY:   12,  backY:  -23},
            '課外活動共用施設'    :{leftX:  178,  rightX :  235, frontY: -185,  backY: -217},
            '体育館'            :{leftX:  184,  rightX :  231, frontY:  -332,  backY:-380},
        }

        this.opend = false;
    }

    where(x, y){
        var ret = null;
        Object.keys(this.position).forEach((key) => {
            const pos = this.position[key];
            if((pos.leftX < x && x < pos.rightX) && (pos.backY < y && y < pos.frontY)) ret = key;
        });
        if(this.opend && ret == null) this.opend = false;
        return ret;
        
    }
    open(pos){
        
        if(!this.opend){
            if(pos == "講義棟"){
                var num = Math.floor( Math.random() * (6 - 2) ) + 1;
                pos += "_" + num;
            } 
            $(function() {
                $("." + pos).colorbox({
                open: true,
                  iframe:true,
                  width:"80%",
                  height:"80%",
                  opacity: 0.7
                });
            });
        }
        
        this.opend = true;
        
    }
    reset(){
        this.opend = false;
    }
    
}