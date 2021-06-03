
//********************************************************//
// Loaderクラス                                            //
// → 引数に渡されたpathからモデルを読み込んで返す                //
//********************************************************//
class Loader{
    constructor(){
        this.loader = new THREE.GLTFLoader();
    }

    // モデル読み込み関数
    async load(path){
        const model_data = await this.loader.loadAsync(path);
        const model = model_data.scene;
        return model;
    }
}