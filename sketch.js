var bird;
var pipes = [];
var birds = [];
var population = 60;
var weights = [];
var scores = [];
var maxR = 0.6
var minR = -0.3
var bestTScore = -Infinity;
var generation = 0;
var frameCountAi = 0;
var counter = 0;
var birdImg;
var pipeImg;
var bgImg;



function setup() {
  createCanvas(920, 480);
  for(var i = 0;i<population;i++){
   birds.push(new Bird(random(maxR,minR),random(maxR,minR),random(maxR,minR),random(maxR,minR),random(maxR,minR),random(maxR,minR),random(maxR,minR),random(maxR,minR)))
  }
  pipes.push(new Pipe());
}

function draw() {
  background(0);
  textSize(18)
  text('Generation : ', 720, 30);
  fill(255,255,255);
  text(generation, 850, 30);
  fill(255,255,255);
  text('Best Score : ', 720, 60);
  fill(255,255,255);
  text(bestTScore, 850, 60);
  fill(255,255,255);
  text('Current Score : ', 720, 90);
  fill(255,255,255);
  

  counter++;
  if(birds.length==0){
    

  	generation+=1
  let bestWeights = []
  let bestScore = -Infinity

  for(var i = 0;i<scores.length;i++){
  	if(scores[i]>bestScore){
  		bestWeights = weights[i]
  		bestScore = scores[i]
  	}

  }
  // console.log("Generation No :",generation,"Highest score :",bestScore)
  if(bestScore>bestTScore){
  bestTScore = bestScore
}
  maxr = 1.5
  minr = -1.5
  birds.push(new Bird(bestWeights[0],bestWeights[1],bestWeights[2],bestWeights[3],bestWeights[4],bestWeights[5],bestWeights[6],bestWeights[7]))

  for(var i = 0;i<population-1;i++){
  	if(Math.floor(Math.random() * 10)<2){
   birds.push(new Bird(random(maxr,minr)*bestWeights[0],random(maxr,minr)*bestWeights[1],random(maxr,minr)*bestWeights[2],random(maxr,minr)*bestWeights[3],random(maxr,minr)*bestWeights[4],random(maxr,minr)*bestWeights[5],random(maxr,minr)*bestWeights[6],random(maxr,minr)*bestWeights[7]))
  }
  else{
  	birds.push(new Bird(bestWeights[0],bestWeights[1],bestWeights[2],bestWeights[3],bestWeights[4],bestWeights[5],bestWeights[6],bestWeights[7]))


  }
  }
  counter = 0
  pipes = []
  scores = []
  weights = []

  }
  text(birds[0].score, 850, 90);
  fill(255,255,255);
  if (counter %75 == 0) {
  	pipes.push(new Pipe())
    
  }
for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update();
    for(var j = 0;j<birds.length;j++){
      if (pipes[i].hits(birds[j])) {
      scores.push(birds[j].score)
      weights.push([birds[j].w2,birds[j].w3,birds[j].w4,birds[j].w5,birds[j].b,birds[j].W1,birds[j].W2,birds[j].B1])
      birds.splice(j,1)

    }

    }
    

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  for(var i = 0;i<birds.length;i++){
  	if(birds[i].decision(pipes)){

  	birds[i].up()

  }
  birds[i].update();
  birds[i].show();
if(birds[i].hit) {
      scores.push(birds[i].score)
      weights.push([birds[i].w2,birds[i].w3,birds[i].w4,birds[i].w5,birds[i].b,birds[i].W1,birds[i].W2,birds[i].B1])
      birds.splice(i,1)

    }

  }

  

  
}

function sigmoid(input){
	return 1/(1+Math.exp(-input))
}
function keyPressed() {
  if (key == ' ') {
    birds[0].up();
    //console.log("SPACE");
  }
}
