function mainLabelCreator(type){
    let baseChar = ("A").charCodeAt(0)
    let arr = elements[type]
    let number = arr.length+1
    let main_label  = ""

    if(type == 'forces'){
        main_label = number
        return main_label
    }

    while(number > 0){
        number -= 1
        main_label = String.fromCharCode(baseChar + (number % 26)) + main_label
        number = (number / 26) >> 0 // quick `floor`
    }

    return main_label
}

function elementCreator(type){
    let main_label = mainLabelCreator(type)
    let input_objs = []
    let new_element

    if (type == 'forces') {
        new_element = new Force({label: `F${main_label}`})

        let new_force = {
            id: new_element.label,
            label: `${new_element.label}: Magnitude`,
            param: 'magnitude',
            value: new_element.magnitude
        }
    
        let new_position = {
            id: new_element.label,
            label: `${new_element.label}: X position`,
            param: 'x',
            value: new_element.x,
            max: width - padding*2,
            min: 0
        }

        let new_angle = {
            id: new_element.label,
            label: `${new_element.label}: Angle`,
            param: 'angle',
            value: new_element.angle,
            max: 360,
            min: 0
        }

        let x_component = {
            id: new_element.label,
            label: `${new_element.label}: X Component`,
            param: 'x_component',
            value: new_element.x_component.toFixed(2)
        }

        let y_component = {
            id: new_element.label,
            label: `${new_element.label}: Y Component`,
            param: 'y_component',
            value: new_element.y_component.toFixed(2)
        }

        if(elements[type].length > 0){
            CalcResultant()
        }    

        input_objs.push(new_force, new_position, new_angle, x_component, y_component)
    }

    if(type == 'supports'){
        new_element = new Support({label: main_label})

        let new_support = {
            id: new_element.label,
            label: new_element.label,
            param: 'x',
            value: new_element.x,
            max: width - padding*2,
            min: 0
        }

        input_objs.push(new_support)            
    }

    elements[type].push(new_element)
    createInputs(type, input_objs)
}

// function createSupport(){
//     let new_support
//     let main_label = mainLabelCreator('supports')

//     new_support = {
//         label: main_label,
//         param: 'x',
//         value: width/2 - padding,
//         max: width - padding*2,
//         min: 0
//     }

//     new_element = new Support({label: main_label})

//     elements.supports.push(new_element)

//     createInputs('support', [new_support])
//     //labels.push(main_label)
// }

// function createForce(){
//     // let counter = forces.length
//     let counter = mainLabelCreator('forces')
//     let label_name = `F${counter}:`

//     let new_force = {
//         label: `${label_name} Magnitude`,
//         param: 'magnitude',
//         value: 100
//     }

//     let new_position = {
//         label: `${label_name} X position`,
//         param: 'x',
//         value: width/2 - padding,
//         max: width - padding*2,
//         min: 0
//     }
//     let new_angle = {
//         label: `${label_name} Angle`,
//         param: 'angle',
//         value: 90,
//         max: 360,
//         min: 0
//     }

//     createInputs('force', [new_force, new_position, new_angle])

//     if(forces.length > 1){
//         CalcResultant()
//     }
// }

function createInputs(type, labels=[]){
    let append_area = document.getElementById(`input_${type}_area`)
    let new_div = document.createElement('div')
    let new_input
    let new_label
    let new_br

    for(label of labels){
        new_input = document.createElement('input')
        new_label = document.createElement('label')
        new_br = document.createElement('br')
        
        new_label.innerText = label.label

        new_div.setAttribute('class', 'input_holder')
        
        new_input.setAttribute('id', `${label.id}_${label.param}`)
        new_input.setAttribute('class', type)
        new_input.setAttribute('type', 'number')
        new_input.setAttribute('value', label.value)
        new_input.setAttribute('max', label.max)
        new_input.setAttribute('min', label.min)
        new_input.setAttribute('oninput', `updateElement(this.id, elements.${type}, '${label.param}')`)
        
        new_div.appendChild(new_br)
        new_div.appendChild(new_label)
        new_div.appendChild(new_input)
        new_div.appendChild(new_br)
        
        if(label.hasOwnProperty('value')){
            new_input.value = label.value
        }
        append_area.appendChild(new_div)
    }
}

function updateElement(label, arr, param_to_update){
    let id = document.getElementById(label)
    let obj_to_change
    
    if(label.includes('_')){
        label = label.split('_')[0]
    }
    
    obj_to_change = arr.find((obj) => {
        return obj.label == label
    }) 

    obj_to_change.update = {[param_to_update]: int(id.value)}

    if(arr == elements.forces){
        let x_component_input = document.getElementById(`${label}_x_component`)
        let y_component_input = document.getElementById(`${label}_y_component`)

        x_component_input.value = obj_to_change.x_component.toFixed(2)
        y_component_input.value = obj_to_change.y_component.toFixed(2)
    }    
    arr.splice(arr.indexOf(obj_to_change), 1, obj_to_change)
    CalcResultant()   
}

function CalcResultant(){
    let x_components = [], x_component_result
    let y_components = [], y_component_result
    let angles = [], angle_result
    let magnitudes = [], magnitude_result
    let result_obj = {}
    let is_created = false

    if(elements.forces.length == 2){
        is_created = true
        resultant = new Force({label: 'Resultante', color: (255,192,203)})
    } 
    
    if(!is_created) return
    
    for(force of elements.forces){
        x_components.push(force.x_component)
        y_components.push(force.y_component)
        angles.push(force.angle) 
        magnitudes.push(force.magnitude)

        x_component_result = x_components.reduce((x, y) => x + y).toFixed(2)
        y_component_result = y_components.reduce((x, y) => x + y).toFixed(2)
    }

    magnitude_result = sqrt((x_component_result)**2 + (y_component_result)**2) 
    angle_result = atan((y_component_result)/(x_component_result))*(180/PI)

    result_obj = {
        'angle': angle_result,
        'magnitude': magnitude_result
    }

    console.log(result_obj)
    resultant.update = result_obj
}