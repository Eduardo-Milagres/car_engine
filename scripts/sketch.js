// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    World = Matter.World

var engine, world, admition, indicator
var air = []
  
function setup() {
  createCanva()
  createMatterWorld()
  renderWithMatter()

  admition = new Admition(400, 400, .5)
  indicator = new Indicator()

  frameRate(10)

}

function createCanva(){
  let canvas_size = getCanvasAreaSize();
  let canvas = createCanvas(canvas_size.width, canvas_size.heigth)
  canvas.parent('canvas_area')
}

function getCanvasAreaSize(){
  // Get element size
  // https://stackoverflow.com/questions/15615552/get-div-height-with-plain-javascript
  
  let canvas_div = document.getElementById("canvas_area")
  let canvas_div_height = canvas_div.offsetHeight
  let canvas_div_wight = canvas_div.offsetWidth

  return {
    width: canvas_div_wight,
    heigth: canvas_div_height
  }
}

function createMatterWorld(){
  engine = Engine.create()
  world = engine.world
  Engine.run(engine)
}

function renderWithMatter(){
  var render = Render.create({
    element: document.body,
    engine: engine
  })
  Engine.run(engine)
  Render.run(render);

  // create runner
  var runner = Runner.create();

  // run the engine
  Runner.run(runner, engine);
}

function mousePressed(){
  var a = new Smoke(mouseX, mouseY)
  air.push(a)
}

document.addEventListener('keydown', (event)=>{
  if(event.key == "a"){
    admition.setValveOppening(90)
    admition.key_status = 'down'

    indicator.spin_up()
    indicator.key_status = 'down'
  }
})

document.addEventListener("keyup", (event)=>{
  if(event.key == "a"){
    admition.setValveClossing()
    admition.key_status = 'up'

    indicator.spin_down()
    indicator.key_status = 'up'
  }
})

function draw() {
  strokeWeight(2)
  background(0)
  stroke(255, 100)
  admition.show()

  for(let i = 0; i < air.length; i++){
    //air[i].show()
    continue  
  }
}
