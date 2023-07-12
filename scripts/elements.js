let FONT = 'Helvetica'
let FONT_SIZE = 20

class Support{
    constructor(config){
        this.label = config.label
        this.lenght = config.lenght || 10
        this.x = config.x || width/2 - this.lenght/2 - padding
        this.y = config.y || height/2
        this.x_component = 0
        this.y_component = 0
        this.pos = createVector(this.x, this.y)
        this.color = config.color || 255
    }

    show(){
        textFont(FONT)
        textSize(FONT_SIZE)
        fill(this.color)
        stroke(this.color)

        triangle(this.x, this.y + this.lenght,
                this.x + this.lenght, this.y + this.lenght,
                this.x + this.lenght/2, this.y)
        text(this.label, this.x, this.y+this.lenght+20)
    }

    set update(new_config){
        this.x = new_config.x - this.lenght/2
    }
}

class Force{
    constructor(config){
        this.label = config.label
        this.label = config.label
        this.magnitude = config.magnitude || 100
        this.angle = config.angle || 90
        this.x = config.x || width/2 - padding
        this.y = config.y || height/2
        this.pos = createVector(this.x, this.y)
        this.arrow_length = config.arrow_length || 5
        this.color = config.color || 255
        this.x_component = this.magnitude * cos(radians(this.angle))
        this.y_component = this.magnitude * sin(radians(this.angle))
        this.y_corrected = -6 //Correct the arrow to thought the plataform
        this.arrow = new Arrow({
            start_y: this.y_corrected,
            length: -this.magnitude
        })
    }

    show(){
        // let y_corrected = -6 //Correct the arrow to thought the plataform
        let angle_correction = 90 //The 0° is by default perpendicular to the x exis 90 corrects to parallel
        let arc_radius = 50

        textFont(FONT)
        textSize(FONT_SIZE)
        fill(this.color)
        stroke(this.color)
        
        push()
        translate(this.pos.x, this.pos.y)
        rotate(radians(-this.angle+angle_correction))
        this.arrow.show()
        
        text(this.label, -5, this.y_corrected-this.magnitude-20)
        text(this.angle, arc_radius/2, -arc_radius/2)

        rotate(radians(-90)) // Makes the arc increase anticlockwise
        fill(this.color, 1)
        arc(0, 0, arc_radius, arc_radius, 0, radians(this.angle))
        pop()
    }

    set update(new_config){
        this.pos.x = new_config.x || this.pos.x
        this.angle = new_config.angle || this.angle
        this.magnitude = new_config.magnitude || this.magnitude
        this.x_component = this.magnitude * cos(radians(this.angle))
        this.y_component = this.magnitude * sin(radians(this.angle))
        this.arrow.update({x: this.pos.x, angle: this.angle, length: -this.magnitude, color: this.color})
    }
}