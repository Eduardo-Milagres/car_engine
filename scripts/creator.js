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
            label: 'Magnitude',
            param: 'magnitude',
            value: new_element.magnitude
        }
    
        let new_position = {
            id: new_element.label,
            label: 'X position',
            param: 'x',
            value: new_element.x,
            max: width - padding*2,
            min: 0
        }

        let new_angle = {
            id: new_element.label,
            label: 'Angle',
            param: 'angle',
            value: new_element.angle,
            max: 360,
            min: 0
        }

        let x_component = {
            id: new_element.label,
            label: 'X Component',
            param: 'x_component',
            value: new_element.x_component.toFixed(2)
        }

        let y_component = {
            id: new_element.label,
            label: 'Y Component',
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
            label: 'X Position',
            param: 'x',
            value: new_element.x,
            max: width - padding*2,
            min: 0
        }

        let x_sup_component = {
            id: new_element.label,
            label: 'X Component',
            param: 'x_component',
            value: new_element.x_component.toFixed(2)
        }

        let y_sup_component = {
            id: new_element.label,
            label: 'Y Component',
            param: 'y_component',
            value: new_element.y_component.toFixed(2)
        }

        input_objs.push(new_support, x_sup_component, y_sup_component)            
    }

    elements[type].push(new_element)
    createInputs(type, input_objs)
}

function createInputs(type, labels=[]){
    let append_area = document.getElementById(`input_${type}_area`)
    let new_div = document.createElement('div')
    let input_div = document.createElement('div') 
    let title_label = document.createElement('label')
    
    new_div.setAttribute('class', 'input_holder')
    input_div.setAttribute('class', 'input_div')
    title_label.setAttribute('class', 'input_holder_title')
    title_label.setAttribute('onclick', `if(this.nextElementSibling.classList.contains('closed')){this.nextElementSibling.classList.remove('closed')}else{this.nextElementSibling.classList.add('closed')}`) //if(this.children.style.display != 'none'){this.children.style.display === 'none'}else{this.children.style.display === 'initial'}

    new_div.appendChild(title_label)
    new_div.appendChild(input_div)
    append_area.appendChild(new_div)
    
    for(label of labels){
        let new_input = document.createElement('input')
        let new_label = document.createElement('label')
        
        new_label.innerText = label.label
        title_label.innerText = label.id
        
        new_label.setAttribute('class', 'input_label')

        new_input.setAttribute('id', `${label.id}_${label.param}`)
        new_input.setAttribute('class', type)
        new_input.setAttribute('type', 'number')
        new_input.setAttribute('value', label.value)
        new_input.setAttribute('max', label.max)
        new_input.setAttribute('min', label.min)
        new_input.setAttribute('oninput', `updateElement(this.id, elements.${type}, '${label.param}')`)
        
        input_div.appendChild(new_label)
        input_div.appendChild(new_input)        
        
        if(label.hasOwnProperty('value')){
            new_input.value = label.value
        }
        //new_div.appendChild(input_div)
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