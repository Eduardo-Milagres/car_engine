function CalcResultant(){
    let x_components, y_components
    let x_component_result, y_component_result, magnitude_result, angle_result
    let result_obj = {}
    let is_created = false
    
    if(elements.forces.length == 2){
        is_created = true
        resultant = new Force({label: 'Resultante', color: (255,192,203)})
    } 
    
    if(!is_created) return
    
    x_components = elements.forces.map(force => force.magnitude * cos(radians(force.angle)))
    y_components = elements.forces.map(force => force.magnitude * sin(radians(force.angle)))

    x_component_result = x_components.reduce((x, y) => x + y).toFixed(2)
    y_component_result = y_components.reduce((x, y) => x + y).toFixed(2)
    magnitude_result = sqrt((x_component_result)**2 + (y_component_result)**2).toFixed(2) 
    angle_result = degrees(atan2(y_component_result, x_component_result))

    result_obj = {
        'angle': angle_result.toFixed(2),
        'magnitude': magnitude_result
    }

    console.log(result_obj)
    resultant.update = result_obj
}

function supportReaction(){
    let x_components, y_components
    let x_component_result, y_component_result

    //x_components = elements.forces.map(force => )
    //y_components = elements.forces.map(force => )
}