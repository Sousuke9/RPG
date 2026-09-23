//main file for stuff


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let fps = 0;
let timer = 0;
let lastTime = 0;
let keys={};
let player;

//canvas 4:3 aspect ratio
canvas.width=800;
canvas.height =600;

let p={//player data
    x:0,
    y:0,
    w:10,
    h:10,
    speed:0.2,
    prevX:0,
    prevY:0,
    pX:canvas.width/2,
    pY:canvas.height/2,
    map:1
};

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
  console.log(e.code)
});
window.addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

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

function upd(deltaTime) {

  //player
  playerControls(deltaTime);
  mapCollision(p.map)

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
 let length = Math.sqrt(onX*onX + onY*onY);
onX/=length;
onY/=length;
  p.x+=onX*p.speed*deltaTime;
  p.y+=onY*p.speed*deltaTime;
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

  ctx.font = "24px serif";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.fillText("fps: " + fps, 10, 24);
   ctx.fillText(Math.round(p.x)+" ," +-Math.round( p.y), 10, 48);


//map generation (map.js)
generateMap(p.map);

//player
  ctx.fillStyle="#00ff00"
  player=ctx.fillRect(p.pX-(p.w/2),p.pY-(p.h/2),p.w,p.h);
}
function updPerSec() {//calls every second

}
generateMap(p.map);
requestAnimationFrame(loop);
