//map STORAGE. prob gonna move to diff file later
let map={
    1:[{x:0,y:150,h:50,w:300,type:"rect",original:true},{x:-150,y:0,h:300,w:50,type:"rect",original:true},{x:150,y:0,h:300,w:50,type:"rect",original:true},{x:0,y:-150,h:50,w:300,type:"rect",original:true}]
}

//map rendering and update

const wOffsetX = 400;
const wOffsetY = 300;
function mapCollision(id){
    for(let i = 0; i < map[id].length;i++){
        const r=map[id][i];//properties
        if(r.type=="rect")collision(r,p);
    }
}
function generateMap(id){
//console.log(JSON.stringify(map[id][0]))
    for(let i = 0; i < map[id].length;i++){
        const r=map[id][i];//properties
        if(r.type=="rect"){
            ctx.fillStyle = "#4c4f4c"
            ctx.fillRect((-(-r.x+p.x)+wOffsetX)-(r.w/2),(-(r.y+p.y)+wOffsetY)-r.h/2,r.w,r.h);
            
        }
    }
}

function collision(obj1,ob2){//itm = wall. obj2 = player
let obj2 = structuredClone(ob2);
obj2.y = -obj2.y
//let obj1 = structuredClone(ob1);
//if(collisionSquare(obj1,obj2)){//wall and player collisions
let dx = obj1.x - obj2.x;
let dy = obj1.y - obj2.y;
let ox = (obj2.w+obj1.w)/2 - Math.abs(dx);
let oy = (obj1.h+obj2.h)/2 - Math.abs(dy);
console.log(ox)
if(ox>0&&oy>0){
if(ox<oy){
    p.x-=dx>0?ox:-ox;
}else{
    p.y+=dy>0?oy:-oy;
}
}
/*
console.log("overlaps1: "+overlapsY1);
console.log("overlaps2: "+overlapsY2);
let minX = overlapsX1<overlapsX2? overlapsX1:-overlapsX2;
let minY = overlapsY2<overlapsY1? overlapsY2:-overlapsY1;

//move player
if(Math.abs(minX)>Math.abs(minY)){
    p.y-=minY;}else{
    p.x-=minX;}

}
    */
//}
}

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