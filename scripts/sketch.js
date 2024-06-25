// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    World = Matter.World,
    Vector = Matter.Vector
    Vertices = Matter.Vertices

var engine, world, admition, indicator
var air = []
  
function setup() {
  createCanva()
  createMatterWorld()
  renderWithMatter()

  createElements()
  frameRate(10)
}

function createCanva(){
  let canvas_size = getCanvasAreaSize();
  let canvas = createCanvas(canvas_size.width, canvas_size.heigth)
  
  canvas.parent('canvas_area')
}

function createElements(){
  var indicator
  let indicator_xpos = 200
  let indicator_ypos = 200

  let admition
  let admition_xpos = 500
  let admition_ypos = 200

  indicator = new Indicator(indicator_xpos, indicator_ypos)  
  admition = new Admition(admition_xpos, admition_ypos, {angle: 0})
    chamber = new CombustionChanber(200,500,50)
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
  var render
  var runner

  runner = Runner.create();
  render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      strokeStyle: 'red',
    }
  })
  
  Engine.run(engine)
  Render.run(render);
  Runner.run(runner, engine);
}

function draw() {
  strokeWeight(2)
  background(0)
  stroke(255, 100)
}
