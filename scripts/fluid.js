function Smoke(x, y){
    this.x = x
    this.y = y
    this.d = 10
    this.quant = 100

    this.body = Bodies.circle(this.x, this.y, this.d / 2)

    World.add(world, this.body)

    this.show = function(){
        var pos = this.body.position
        push()
        translate(pos.x, pos.y)
        circle(0, 0, this.d)
        pop()
    }
}