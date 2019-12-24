
class Bird {
  constructor(w2,w3,w4,w5,b,W1,W2,B1){
  this.y = height/2;
  this.x = 64;
  this.hit = false;
  this.gravity = 0.7;
  this.lift = -15;
  this.velocity = 0;
  this.score = 0
  this.w2 = w2
  this.w3 = w3
  this.w4 = w4
  this.w5 = w5
  this.W1 = W1
  this.W2 = W2
  this.B1 = B1
  this.b = b
}
  show() {
    fill(255);
    ellipse(this.x, this.y, 32, 32);
  }

  up(){
    this.velocity += this.lift;
  }
  decision(pipes){
    let d = Infinity
    let pipesS = null
    for(var i = 0;i<pipes.length;i++){
      let distan = pipes[i].x-this.x
      if(distan>0 && distan<d){
        pipesS = pipes[i]
        d = distan
      }
    }
    let decide = this.w2*(this.y/480)+this.w3*(pipesS.x/640)+this.w4*(pipesS.top/480)+this.w5*(pipesS.bottom/480)+this.b
    let decide1 = this.W1*decide+this.W2*decide+this.B1
    let predicted = 1/(1+Math.exp(-decide1))
    
    if(predicted>0.5){
      return true
    }
    else{
      return false
    }
  }

  update() {
    this.score+=1

    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    if (this.y > height) {
      this.hit=true
    }

    if (this.y < 0) {
      this.hit=true
    }

  }

}
