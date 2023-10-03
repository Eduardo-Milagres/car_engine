class Indicator{
    constructor(){
        this.x = 100
        this.y = 100
        this.scale = 1
        this.angle = 0
        this.pointer_lenght = 100
        this.pointer_padding = 5
        this.marks_lenght = 25
        this.huge_marks_lenght = this.marks_lenght*2
        this.small_marks_lenght = this.marks_lenght/2
        this.thickness = 5
        this.min_value = 0
        this.max_value = 180
        this.increment = 5
        this.marks_num = (this.max_value-this.min_value)/this.increment
        this.angle_increment = -radians(this.max_value/this.marks_num)
        this.huge_mark_increment = 5
        this.spin_down_delay = 30 //miliseconds
        this.label = ""
        this.key_status = 'down'

        this.pointer = Bodies.rectangle(this.x, this.y, this.pointer_lenght, this.thickness)
        Body.setAngle(this.pointer, radians(this.angle))
        this.marks = this.marks_creator() 

        this.body = Matter.Body.create({
            parts: [this.pointer],
            isStatic: true
        })
        World.add(world, this.body)
        console.log(this.marks)
    }

    marks_creator(){
        this.marks_obj = []
        this.current_angle
        this.mark_x
        this.mark_y

        for(let i = 0; i <= this.marks_num; i++){
            this.angle = this.angle_increment*i
            this.mark_x = (this.x + this.pointer_lenght/2 - this.pointer_padding) + (this.pointer_lenght + this.thickness) * Math.cos(this.angle)
            this.mark_y = this.y + (this.pointer_lenght + this.thickness) * Math.sin(this.angle)
            this.mark = Bodies.rectangle(this.mark_x, this.mark_y, this.small_marks_lenght, this.thickness, {isStatic: true})
            
            Body.setAngle(this.mark, this.angle)
            this.marks_obj.push(this.mark)
            World.add(world, this.mark)
        }
        return this.marks_obj
    }

    setIndicatorSwith(degree){
        this.angle = this.angle + degree
        Body.setAngle(this.pointer, -radians(this.angle))
    }

    spin_up(){
        console.log(this.angle)
        if(this.angle < radians(this.max_value) && this.angle < radians(this.max_value)){
            this.setIndicatorSwith(this.angle_increment)
        }
    }

    spin_down(){
        setInterval(() => {
            console.log(this.angle)
            if(-this.angle > radians(this.min_value) && this.key_status == 'up'){
                this.setIndicatorSwith(-this.angle_increment)
            }
        }, this.spin_down_delay)
    }
}