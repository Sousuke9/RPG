//maybe change to collision system where u detect if its touching colliders than just reversing the velocity by while true and smaller value. 
//map STORAGE. prob gonna move to diff file later

//development paessed for awhile cause busy.
let map={//o=collision type
    1:[
        {x:0,y:0,h:2500,w:2500,type:"rect",collide:false,visible:true,t:"purple"},
        {x:0,y:150,h:50,w:30,type:"rect",original:true,collide:true,visible:true,t:"purple",o:"normal"},
        {x:-150,y:0,h:300,w:50,type:"rect",original:true,collide:true,visible:false,t:"purple",o:"normal"},
        {x:150,y:0,h:300,w:50,type:"rect",original:true,collide:true,visible:false,t:"purple",o:"normal"},
        {x:0,y:-150,h:50,w:300,type:"rect",original:true,collide:true,visible:false,t:"purple",o:"normal"},
        
    ]
}

//img loader
let mapLoad= null
async function setUpMap(id){
const loader = new AssetLoader();
globalThis.imgs = await loader.loader({
    xavi: "images/xavi.jpg",
    tile1: "images/floortile.png"
});
globalThis.activeMapColliders = map[id].filter(r => r.collide&&r.o=="normal"); //map collisions
globalThis.grid = new Grid(200); //grid for collision detection
activeMapColliders.forEach(obj => grid.insert(obj)); //add to grid
globalThis.activeColliders = map[id].filter(r => r.collide&&r.o=="advanced"); //advanced collisions
globalThis.visibleMap = map[id].filter(r => r.visible);
await assignTexture(id);
mapLoad = id;
console.log(id)

}
//map rendering and update
function mapCollision(id){
    if(!mapLoad)return;//checks if asset is loaded
    for(let i = 0; i < activeColliders.length;i++){
        const r=activeColliders[i];//properties
        if(r.type=="rect"){
          collision(r,p);
    }

};}
function mapAABB(x, y, w, h) {
    const pY = -y; 
    const walls = grid.getNear(x,pY, w, h); 
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        const overlapX = (w + wall.w) / 2 - Math.abs(x - wall.x);
        const overlapY = (h + wall.h) / 2 - Math.abs(pY - wall.y);
        if (overlapX > 0 && overlapY > 0) return wall;
    }
    return null;
}
const wOffsetX = 400;
const wOffsetY = 300;

function generateMap(id){//map rendering. only rectangles. add more later.
    if(mapLoad!==id&&!mapLoad)setUpMap(id); //load assets if not loaded yet
    if(!mapLoad)return;
//console.log(JSON.stringify(map[id][0]))
    for(let i = 0; i < visibleMap.length;i++){
        const r=visibleMap[i];//properties
        if(r.type=="rect"){
           // ctx.fillStyle = "#4c4f4c"
            let fill = ctx.createPattern(imgs.tile1, 'repeat');
                let matrix = new DOMMatrix();
        matrix = matrix.translate((-(-r.x+p.x)+wOffsetX), (-(r.y+p.y)+wOffsetY));
         matrix = matrix.scale(0.5, 0.5); 
        fill.setTransform(matrix);
        ctx.fillStyle = fill;
            ctx.fillRect((-(-r.x+p.x)+wOffsetX)-(r.w/2),(-(r.y+p.y)+wOffsetY)-r.h/2,r.w,r.h);
            
        }
    }
}



function  collision(obj1,ob2){
  
    //more better collision system. only used for individual items; uses AABB
let obj2 = structuredClone(ob2);
obj2.y = -obj2.y
//let obj1 = structuredClone(ob1);
//if(collisionSquare(obj1,obj2)){//wall and player collisions
let dx = obj1.x - obj2.x;
let dy = obj1.y - obj2.y;
let ox = (obj2.w+obj1.w)/2 - Math.abs(dx);
let oy = (obj1.h+obj2.h)/2 - Math.abs(dy);
//console.log(ox)
if(ox>0&&oy>0){
if(ox<oy){
    p.x-=dx>0?ox:-ox;
}else{
    p.y+=dy>0?oy:-oy;
}
}
}

function assignTexture(id){
    for (let i=0; i<map[id].length; i++){

if(map[id][i].visible&&map[id][i].t){
    let t=map[id][i].t;
    if(t.startsWith("#"))continue;
}}
}

class Grid {//basic spatial hash grid thingy to make it way efficient for collision.
    constructor(cellSize) { //cellSize=size per cell in pixel.
        this.cellSize = cellSize;
        this.cells = new Map();
    }
    clear() {
        this.cells.clear();
    }
    insert(obj) {//add object to grid.
        const minX =Math.floor((obj.x-obj.w/2)/this.cellSize);
        const maxX=Math.floor((obj.x+obj.w/2)/this.cellSize);
        const minY=Math.floor((obj.y-obj.h/2)/this.cellSize);
        const maxY= Math.floor((obj.y +obj.h/2)/this.cellSize);
        for (let x=minX;x<=maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                const key = `${x},${y}`;
                if (!this.cells.has(key))this.cells.set(key, []);
                
                this.cells.get(key).push(obj);
            }}}
    getNear(objX,objY,objW,objH){//finds object from grid. returns array of objects that are near
        const minX =Math.floor((objX-objW/2)/this.cellSize);
        const maxX =Math.floor((objX+objW/2)/this.cellSize);
        const minY =Math.floor((objY-objH/2)/this.cellSize);
        const maxY =Math.floor((objY+objH/2)/this.cellSize);
        const nearby =new Set(); 
        for (let x=minX;x<=maxX;x++) {
    for (let y=minY;y<=maxY;y++){
        const key = `${x},${y}`;
        if (this.cells.has(key)) {
            console.log(key+"  "+objX)
            for (const item of this.cells.get(key)) nearby.add(item);
        }}}
    return Array.from(nearby);}
    }






// IGNORE BELOW. UNUSED CODE. MAYBE USEFUL LATER.
/*
function collisionSquare(obj1,obj2){
return Math.abs(obj2.x-obj1.x)<(obj1.w+obj2.w)/2&&Math.abs(obj2.y-obj1.y)<(obj1.h+obj2.h)/2;
}
function collisionCircle(obj1,obj2){//obj1 is square,obj2 is circle. Collision detection.
let closestX=Math.max(obj1.x,Math.min(obj1.x+obj1.w,obj2.x));
let closestY=Math.max(obj1.y,Math.min(obj1.y+obj1.h,obj2.y));
let distX = obj2.x - closestX;
let distY = obj2.y-closestY;
let distS = (distX*distX)+(distY*distY);
return distS<(p.h*p.h)

}

function getAngle(obj1,obj2){
    //found code online hahahhaha
    let angle = Math.atan2(obj1.y - obj2.y, obj1.x - obj2.x) + Math.PI;
    return angle > Math.PI ? angle - 2 * Math.PI : angle;
}
    

*/