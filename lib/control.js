
class InputManager{
    constructor(world, myInfo, camera, canvas){
        this.world          = world;
        this.myInfo         = myInfo;
        this.camera         = camera;
        this.canvas         = canvas;
        this.controls       = new THREE.OrbitControls(this.camera, this.canvas);
        this.controls.maxDistance = 70;
        this.raycaster      = new THREE.Raycaster();
        this.mouse          = new THREE.Vector2();
        this.controls.enableDamping = true;
        this.key = {
            'w':'forward',
            's': 'back',
            'a': 'left',
            'd': 'right',

            ' ': 'view',

            'ArrowUp'   : 'forward',
            'ArrowDown' : 'back',
            'ArrowLeft' : 'left',
            'ArrowRight': 'right',

            'touchUp'    : 'forward',
            'touchDown'  : 'back',
            'touchLeft'  : 'left',
            'touchRight' : 'right',
        };

        // PC
        document.addEventListener('keyup', (event) => {
            if(this.key[event.key]) this.myInfo.command('reset');
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('keydown', (event) => {
            if(this.key[event.key]) this.myInfo.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('touchstart', (event)=>{
            this.myInfo.recordStartPoint(event.touches[0].clientX, event.touches[0].clientY);
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('touchmove', (event)=>{
            this.myInfo.touchMove(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('touchend', (event)=>{
            this.myInfo.command("reset");
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('mousedown', (event) => {
            if(this.key[event.key]) this.myInfo.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('mousemove', (event) => {
            if(this.key[event.key]) this.myInfo.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});

        document.addEventListener('mouseup', (event) => {
            if(this.key[event.key]) this.myInfo.command(this.key[event.key]);
            event.preventDefault();
        }, {passive:false});
    }

    update(){
        this.controls.target.set(this.myInfo.x, 5, this.myInfo.y);
        this.myInfo.changeAngle(this.controls.getAzimuthalAngle());
    }
}