class Arrow{
    constructor(config){
        this.start_x = config.start_x || 0
        this.start_y = config.start_y || 100
        this.length = config.length || 100
        this.angle = config.angle || 90
        this.angle_correction = this.angle-90
        this.arrow_height = config.arrow_height || 10
        this.arrow_number = config.arrow_number || 1
        this.color = config.color || 255
        this.x = width/2 - padding
        this.y = height/2
        this.pos = createVector(this.x, this.y)
    }

    show(){
        let arrow_widht = this.arrow_height * tan(radians(7,5))
        fill(this.color)
        stroke(this.color)
        
        rotate(radians(-this.angle_correction))

        line(this.start_x, this.start_y, this.start_x, this.length)
        triangle(this.start_x, 0,
                 -arrow_widht, -this.arrow_height,
                 arrow_widht * 2, -this.arrow_height)

        if(this.arrow_number == 2){
            triangle(this.start_x, this.length,
                arrow_widht, this.length + this.arrow_height,
                -arrow_widht * 2, this.length + this.arrow_height)
        }
    }

    update(new_config){
        this.pos.x = new_config.x || this.pos.x
        this.angle = new_config.angle || this.angle
        this.length = new_config.length || this.length
    }
}