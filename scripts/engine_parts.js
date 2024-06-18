class Admition{
    constructor(x, y, options={}){
        this.x = x
        this.y = y
        this.scale = .5 || options.scale
        this.lenght = 100 * this.scale || options.lenght
        this.thickness = 10 * this.scale || options.thickness
        this.padding = 3 * this.scale || options.padding
        this.angle = .1 || options.angle
        this.radians_angle = radians(-this.angle)
        this.valve_oppening_angle = 90 || options.valve_oppening_angle
        this.min_valve_oppening_angle = .1 || options.min_valve_oppening_angle
        this.max_valve_oppening_angle = 90 || options.max_valve_oppening_angle
        this.valve_swith_increment = 10 || options.valve_swith_increment
        this.close_valve_swith_delay = 60 || options.close_valve_swith_delay //miliseconds 
        this.key_status = 'down'

        this.draw()
        events.subscribe('a_up', this.setValveOppening)
        events.subscribe('a_down', this.setValveClossing)
    }

    draw(){
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
    
    setValveOppening = () => {
        console.log(this.angle)
        this.key_status = 'down'
        if(this.angle < this.valve_oppening_angle && this.angle < this.max_valve_oppening_angle){
            this.setValveSwith(this.valve_swith_increment)
        }
    }

    setValveClossing = () => {
        this.key_status = 'up'
        setInterval(() => {
            if(this.angle > this.min_valve_oppening_angle && this.key_status == 'up'){
                this.setValveSwith(-this.valve_swith_increment/1.5)
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

class Valve{
    constructor(x, y, diametro_pistao, options={}){
        this.x = x
        this.y = y
        this.scale = 1 || options.scale
        this.diametro_pistao = diametro_pistao
        this.area_cilindro = 0,785 * diametro_pistao
        this.constantante_diametro_acento = 0,4 || options.constant_diametro_acento // De 0,38 a 0,48
        this.diametro_externo_cabeca = 5 || options.diametro_externo_cabeca
        this.diametro_acento = diametro_pistao * this.constantante_diametro_acento
        this.diametro_nucleo = this.diametro_externo_cabeca * 0,19
        this.diametro_haste = this.diametro_nucleo + 2
        this.angulo_cabeca = 60 || radians(options.angulo_cabeca)
        this.altura_levantamento_normal = 90 - this.angulo_cabeca
        this.altura_axial = this.altura_levantamento_normal / Math.sin(this.angulo_cabeca*(180/Math.PI))
        this.secao_passagem = this.altura_levantamento_normal * this.diametro_acento * Math.PI

        this.draw()
    }

    draw(){
        this.haste = Bodies.rectangle(this.x - this.diametro_haste / 2, this.y - this.altura_axial, this.diametro_haste, this.altura_axial, {isStatic: true}) 
        this.cabeca = Bodies.fromVertices(
            this.x - this.diametro_haste / 2, 
            this.y, 
            [
                {'x': this.x + this.diametro_externo_cabeca / 2, 'y': this.y},
                {'x': this.x - this.diametro_externo_cabeca / 2, 'y': this.y},
                {'x': this.x + this.diametro_externo_cabeca / 2, 'y': this.y - this.diametro_haste},
                {'x': this.x - this.diametro_externo_cabeca / 2, 'y': this.y - this.diametro_haste},
                
                {'x': this.x + this.diametro_externo_cabeca * 2, 'y': this.y + this.altura_axial},
                {'x': this.x - this.diametro_externo_cabeca * 2, 'y': this.y + this.altura_axial},
            ],
            {isStatic: true}
        )

        this.valve = Matter.Body.create({
            parts: [this.haste, this.cabeca],
            isStatic: true
        })

        World.add(world, this.valve)
    }

    update(options){
        this.x = this.x || this.options.x
        this.y = this.y || this.options.y
    }
}

class CombustionChamber{
    constructor(x, y, diametro_pistao, options={}){
        this.x = x
        this.y = y
        this.thickness = 10 || options.thickness
        this.lenght = 100 || options.lenght
        this.diametro_pistao = diametro_pistao
        this.roof_lenght = this.thickness + 15
        this.draw()
    }

    draw(){
        this.left_wall = Bodies.rectangle(this.x - this.thickness / 2, this.y - this.lenght / 2, this.thickness, this.lenght) 
        this.right_wall = Bodies.rectangle(this.x + this.diametro_pistao, this.y - this.lenght / 2, this.thickness, this.lenght)
        
        this.left_roof = Bodies.rectangle(this.x - this.thickness / 2, this.y - this.lenght - this.thickness / 2, this.roof_lenght, this.thickness)
        this.right_roof = Bodies.rectangle(this.x + this.diametro_pistao, this.y - this.lenght - this.thickness / 2, this.roof_lenght, this.thickness)

        this.chamber = Matter.Body.create({
            parts: [this.left_wall, this.right_wall,
                    this.left_roof, this.right_roof],
            isStatic: true
        })

        World.add(world, this.chamber)
    }
}