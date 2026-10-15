//main file for stuff


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let fps = 0;
let timer = 0;
let lastTime = 0;
let keys={};
let player;
let timedUI= {};
let textTotalId =0;
let wallCollided = false;
//canvas 4:3 aspect ratio
canvas.width=800;
canvas.height =600;

let p={//player data
    x:0,
    y:0,
    w:27,
    h:27,
    speed:0.16,
    prevX:0,
    prevY:0,
    pX:canvas.width/2,
    pY:canvas.height/2,
    map:1,
    anim:new Image(),
    state:"idle",
    dir:"idle",
    frame:0,
    totalFrames:7,
    fps:10
};
p.anim.src="images/playerAnimSpritesheet.png";

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
 // console.log(e.code)
});
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
  keyPressed(e.code);
});


function upd(deltaTime) {
  //player
  if(p.state=="walk"){
    p.frame = (p.frame + (p.fps * deltaTime) / 1000) % p.totalFrames;
  }else if(p.state=="idle"&&p.frame>0){
  p.frame=6;}
  playerControls(deltaTime);
  mapCollision(p.map);//map collision
  

}
function playerControls(deltaTime){//keybinds / player controls
  let onX=0;
  let onY=0;
  if(keys["KeyW"]){
    onY-=1;
  }
    if(keys["KeyS"]){
    onY+=1;
  }
    if(keys["KeyA"]){
    onX-=1;
  }
    if(keys["KeyD"]){
    onX=+1;
}

if(onX!==0||onY!==0){
  p.state="walk";
 let length = Math.sqrt(onX*onX + onY*onY);
onX/=length;
onY/=length;
let xMovement = onX * p.speed * deltaTime;
let yMovement = onY * p.speed * deltaTime;
let xWall = mapAABB(p.x + xMovement, p.y, p.w, p.h, activeMapColliders);
let yWall = mapAABB(p.x, p.y + yMovement, p.w, p.h, activeMapColliders);
if(!xWall) {
p.x+=xMovement;
}
 // while(mapCollision(p.map)){
  //  p.x-=onX*p.speed*deltaTime*0.1;
  // }
  if(!yWall) {
    p.y+=yMovement;
  }
  // while(mapCollision(p.map)){
  //  p.y-=onY*p.speed*deltaTime*0.1;
  // }
}else{
  p.state="idle";
}

  if(keys["KeyQ"]){
    console.log("ALEX IS STUPID!!!!!");
    console.log(onX+", "+onY)
  }
}

function draw(deltaTime) {//all the canvas draw handling
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#28262667";
  ctx.fillRect(0,0,canvas.width,canvas.height);


//map generation (map.js)
generateMap(p.map);
//console.log(p.map);
//ui
  ctx.font = "24px serif";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.fillText("fps: " + fps, 10, 24);
   ctx.fillText(Math.round(p.x)+" ," +-Math.round( p.y), 10, 48);
//player

  if(!p.anim.complete)return;

  player=ctx.drawImage(p.anim, Math.floor(p.frame)*16,0,16, 16, p.pX,p.pY, p.w+3, p.h+3);

}
function updPerSec() {//calls every second

}

function keyPressed(key){

}

function uiHandler(deltaTime){
  for (let i = 0; i < timedUI.length; i++) {
    const ui = timedUI[i];
    ui.timeLeft -= deltaTime / 1000;
    if (typeof ui.timeLeft!=='string'&&ui.timeLeft <= 0) {
      timedUI.splice(i, 1);
      i--; //adjust index after removal of ones which is out of time.
    }else{
      ctx.font = `${ui.size}px ${ui.font}`;
      ctx.fillStyle = ui.color;
      ctx.textAlign = "center";
      ctx.fillText(ui.text, ui.x, ui.y);
    }
  }
}
function addText(id,text,x,y,config={}){//add text to screen
  timedUI.push({
        id: id,
        text: text,
        x: x,
        y: y,
        size: config.size || 20,
        color: config.color || "#ffffff",
        font: config.font || "sans-serif",
        timeLeft: config.timeLeft || 5
    });
}

function loop(timeS) {
  const deltaTime = timeS - lastTime;
  lastTime = timeS;

  timer += deltaTime;
  
  if (timer >= 1000) {//calls per second
    timer -= 1000;
    if(timer>=500)timer=0; //check if timer gone too large
    updPerSec(deltaTime);
    if (deltaTime > 0) fps = Math.round(1000 / deltaTime);//fps calc
  }

  upd(deltaTime);
  draw(deltaTime)
  
  requestAnimationFrame(loop);
}





//codes above this
generateMap(p.map);
requestAnimationFrame(loop);