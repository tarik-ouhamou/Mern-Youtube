// let p;

// function setup(){
//     createCanvas(window.innerWidth,window.innerHeight);
//     p=new Particles();
// }

// function draw(){
//     p.update();
//     p.draw();
// }

// class Particles{
//     constructor(){
//         this.pos=createVector(random(width),random(height));
//         this.vel=createVector(random(-2,2),random(-2,2));
//         this.size=10;
//     }

//     update(){
//         this.pos.add(this.vel);
//         this.edges();
//     }

//     draw(){
//         noStroke();
//         fill('rgba(0,0,0,0)');
//         circle(this.pos.x,this.pos.y,this.size);
//     }

//     edges(){
//         if(this.pos.x<0 && this.pos.x> width){
//             this.vel.x*=-1;
//         }
//         if(this.pos.y<0 && this.pos.y> height){
//             this.vel.y*=-1;
//         }
//     }
// }