let startbox=document.getElementById('startbox');
let detail=document.getElementById('detail');
let gamestart=document.getElementById('gamestart');
let scorebox=document.getElementById('scorebox');
let player={speed:5,score:0};
detail.addEventListener('click',startgame)
function collide(a,b){
    aRect=a.getBoundingClientRect()
    bRect=b.getBoundingClientRect()
    return  ! ((aRect.bottom< bRect.top) || (aRect.top > bRect.bottom) || (aRect.right<bRect.left) || (aRect.left>bRect.right))

}
function moveslines(){
    let alllines=document.querySelectorAll('.lines')
    alllines.forEach((item)=>{
        if(item.y>=700){
            item.y-=750;
        }
item.y+=player.speed;
item.style.top=item.y+"px";
    })
}
function gameisover(){
player.startgame=false;
startbox.classList.remove('hide')
detail.innerHTML=`Game Over ! <br> Your score is ${player.score} <br>      Try Again `
}
function eCar(car){
    let alllines=document.querySelectorAll('.enemy')
    alllines.forEach((item)=>{
        if(collide(car,item)){
      gameisover()
 }
        if(item.y>=750){
            item.y=-300;
            item.style.left=Math.floor(Math.random()*250)+"px";
        }
item.y+=player.speed;
item.style.top=item.y+"px";
    })
}
function gameplay(){
    if(player.startgame){
        moveslines()
       
        let car=document.querySelector('.buagticar')
        eCar(car)
        let road=gamestart.getBoundingClientRect()
       if(keys.ArrowUp && player.y>(road.top+75)){
           player.y-=player.speed;
 }
       if(keys.ArrowDown && player.y<(road.bottom-75)){
         player.y+=player.speed;
       }
       if(keys.ArrowLeft && player.x>0){
         player.x -=player.speed;
 }
     if(keys.ArrowRight && player.x<(road.width-80)){
       player.x+=player.speed;
     }
     car.style.top=player.y+"px";
     car.style.left=player.x+"px"
         window.requestAnimationFrame(gameplay);
         player.score++
         scorebox.innerText="Your score"+" :"+player.score;

     }
     
 }
 let color=[
    "red",
    "aqua",
    "black"
]
function startgame(){
startbox.classList.add('hide')
gamestart.innerHTML="";
let car=document.createElement('div');
car.setAttribute('class','buagticar')
gamestart.appendChild(car);
player.startgame=true
window.requestAnimationFrame(gameplay);
player.x=car.offsetLeft;
player.y=car.offsetTop;
for(var x=0;x<5;x++){
    let roadline=document.createElement('div');
    roadline.setAttribute('class','lines')
    roadline.y=(x*155)
    roadline.style.top=roadline.y+"px";
    gamestart.appendChild(roadline);
}

let coloindex=0;
for( x=0;x<3;x++){
    let enemycar=document.createElement('div');
    enemycar.setAttribute('class','enemy')
    enemycar.y=((x+1)*350)*-1
    enemycar.style.top=enemycar.y+"px";
    if(coloindex<color.length){
        coloindex++
        enemycar.style.backgroundColor=color[coloindex];
    }
    else{
        coloindex=0;
    }
   
    enemycar.style.left=Math.floor(Math.random()*350)+"px";
    gamestart.appendChild(enemycar);
}

}

// function randomcolor(){
  
//     else{
//         coloindex=0;
//     }
//   }

document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp);
let keys={
    ArrowUp:false,
    ArrowDown:false,
    ArrowLeft:false,
    ArrowRight:false
}

function keyDown(e){
e.preventDefault()
keys[e.key]=true;


}
function keyUp(e){
    // e.preventDefault()
    keys[e.key]=false;
    
}
