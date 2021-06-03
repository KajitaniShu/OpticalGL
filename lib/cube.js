
//********************************************************//
// createColorCube関数                                     // 
// → 引数で渡されたサイズと色で立方体を作成する                 　// 
//********************************************************//
function createColorCube(x, y, z, color){
    const geometry = new THREE.BoxBufferGeometry(x, y, z);
    const material = new THREE.MeshBasicMaterial({color: color, specular: 0xffffff, shininess: 20});
    const cube     = new THREE.Mesh(geometry, material);
    return cube;
}