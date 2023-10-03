class Admition{
    constructor(x, y, scale){
        this.x = x
        this.y = y
        this.scale = scale
        this.lenght = 100 * scale
        this.thickness = 10 * scale
        this.padding = 3 * scale
        this.angle = 0
        this.radians_angle = radians(-this.angle)
        this.min_valve_oppening_angle = 0
        this.max_valve_oppening_angle = 90
        this.key_status = 'down'
        this.valve_swith_increment = 10
        this.close_valve_swith_delay = 60 //miliseconds

        this.valve = Bodies.rectangle(this.x, this.y, this.lenght, this.thickness, {isStatic: true})
        this.left_wall = Bodies.rectangle(this.x - this.lenght / 2 - this.thickness / 2, this.y, this.thickness, this.lenght,{isStatic: true})
        this.right_wall = Bodies.rectangle(this.x + this.lenght / 2 + this.thickness / 2, this.y, this.thickness, this.lenght,{isStatic: true})

        this.body = Matter.Body.create({
            parts: [this.left_wall, this.right_wall, this.valve],
            isStatic: true
        })
        World.add(world, this.body)
    }

    setValveSwith(degree){
        this.angle = this.angle + degree
        Body.setAngle(this.valve, radians(this.angle))
    }
    
    setValveOppening(valve_oppening_angle){
        if(this.angle < valve_oppening_angle && this.angle < this.max_valve_oppening_angle){
            this.setValveSwith(this.valve_swith_increment)
        }
    }

    setValveClossing(){
        setInterval(() => {
            if(this.angle > this.min_valve_oppening_angle && this.key_status == 'up'){
                this.setValveSwith(-this.valve_swith_increment)
            }
        }, this.close_valve_swith_delay)
    }

    show(){
        var pos = this.body.position
        push()
        translate(pos.x, pos.y)
        //circle(0, 0, this.thickness*2)
        rect(this.lenght / 2 + this.padding, -this.lenght / 2, this.thickness, this.lenght) // Left wall
        rect(-this.lenght / 2 - this.thickness - this.padding, -this.lenght / 2, this.thickness, this.lenght) // Right wall
        
        rotate(this.radians_angle)
        rect(-this.lenght / 2, -this.thickness / 2, this.lenght, this.thickness) // Valve
        pop()
    }
}

