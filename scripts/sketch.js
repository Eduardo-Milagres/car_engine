let support_point
let labels = []
let elements = {
  supports: [],
  forces: []
}
let padding = 50
let resultant

function setup() {
  // Get element size
  // https://stackoverflow.com/questions/15615552/get-div-height-with-plain-javascript
  let canvas_div = document.getElementById("canvas_area")
  let canvas_div_h = canvas_div.offsetHeight
  let canvas_div_w = canvas_div.offsetWidth
  let canvas = createCanvas(canvas_div_w, canvas_div_h)
  
  frameRate(10)
  
  canvas.parent('canvas_area') //Insert the canvas into canvas_area div
}

function draw() {
  strokeWeight(2)
  background(0)
  //line(padding, height/2, width-padding, height/2)
  translate(0+padding, 0)//Move the center of references

  elements.supports.forEach(support => {
    support.show()
  })
  elements.forces.forEach(force => {
    force.show()
  })

  if(resultant){
    resultant.show()
  }
  stroke(255, 100)
}
