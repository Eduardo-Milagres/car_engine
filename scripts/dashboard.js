class Indicator{
    constructor(x, y, options={}){
        this.x = x
        this.y = y
        this.scale = 1
        this.angle = 0
        this.pointer_lenght = 100 * this.scale
        this.pointer_padding = 5 * this.scale
        this.pointer_speed = -radians(30)
        this.marks_lenght = 25 * this.scale
        this.huge_marks_lenght = this.marks_lenght*1.3 * this.scale
        this.small_marks_lenght = this.marks_lenght/2 * this.scale
        this.thickness = 5 * this.scale
        this.min_value = 0
        this.max_value = 180
        this.increment = 5
        this.marks_num = (this.max_value-this.min_value)/this.increment - 1
        this.angle_increment = -radians(this.max_value/this.marks_num)
        this.huge_mark_increment = 5
        this.spin_down_delay = 30 //miliseconds
        this.label = ""
        this.key_status = 'down'

        this.pointer = this.pointer_creator()
        this.marks = this.marks_creator() 

        this.body = Body.create({
            parts: [this.pointer],
            isStatic: true
        })
        World.add(world, this.body)
    }

    pointer_creator(){
        this.pointer_vector = Vector.create(this.x + this.pointer_lenght/2, this.y)
        
        this.pointer = Bodies.rectangle(this.x, this.y, this.pointer_lenght, this.thickness, this.options)     
        this.circle = Bodies.circle(this.x + this.pointer_lenght/2, this.y, this.thickness, {isStatic: true})
        
        World.add(world, this.circle)
        Body.setCentre(this.pointer, this.pointer_vector)

        return this.pointer
    }

    marks_creator(){
        this.marks_obj = []
        this.current_angle
        this.mark_length
        this.mark_x
        this.mark_y

        for(let i = 0; i <= this.marks_num; i++){
            this.angle = this.angle_increment*i
            
            if(i % this.huge_mark_increment == 0){
                this.mark_length = this.marks_lenght
            } else {
                this.mark_length = this.small_marks_lenght
            }

            this.mark_x = this.x + this.pointer_lenght/2 + (this.pointer_lenght + this.small_marks_lenght/2 - this.pointer_padding) * Math.cos(this.angle)
            this.mark_y = this.y + (this.pointer_lenght - this.thickness + this.small_marks_lenght - this.pointer_padding) * Math.sin(this.angle)
            
            this.mark = Bodies.rectangle(
                this.mark_x, 
                this.mark_y, 
                this.mark_length, 
                this.thickness, 
                {
                    isStatic: true
                }
            )
            
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
            this.setIndicatorSwith(this.pointer_speed)
        }
    }

    spin_down(){
        setInterval(() => {
            console.log(this.angle)
            if(-this.angle > radians(this.min_value) && this.key_status == 'up'){
                this.setIndicatorSwith(-this.pointer_speed)
            }
        }, this.spin_down_delay)
    }
    
}