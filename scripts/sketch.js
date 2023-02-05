let support_point
let labels = []
let elements = {
  supports: [],
  forces: []
}
let padding = 50
let resultant

function setup() {
  let canvas = createCanvas(800, 400)
  
  frameRate(10)
  
  canvas.parent('canvas_area') //Insert the canvas into canvas_area div
}

function draw() {
  strokeWeight(2)
  background(0)
  line(padding, height/2, width-padding, height/2)
  translate(0+padding, 0)//Move the center of references
  
  for(let support of elements.supports){
    support.show()
  }
  for(let force of elements.forces){
    force.show()
  }
  if(resultant){
    resultant.show()
  }
  stroke(255, 100)
}
