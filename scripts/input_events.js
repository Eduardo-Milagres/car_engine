var events = {
    subscribers: {},

    subscribe: function (channelName, fn){
        this.subscribers[channelName] = this.subscribers[channelName] || []
        this.subscribers[channelName].push(fn)
        console.log(`Subscribed to channel "${channelName}"`)
        console.log(fn)
    },

    publish: function (channelName){
        if (this.subscribers[channelName]){
            this.subscribers[channelName].forEach(function(fn){
                fn()
            });
        }
        console.log('publish')
    }
}

function mousePressed(){
    var smoke = new Smoke(mouseX, mouseY)
    air.push(smoke)
}
  
document.addEventListener('keydown', (event)=>{
    if(event.key == "a"){
        //admition.setValveOppening(90)
        //admition.key_status = 'down'

        events.publish('a', 'down')
        //indicator.spin_up()
        //indicator.key_status = 'down'
    }
})

document.addEventListener("keyup", (event)=>{
    if(event.key == "a"){
        //admition.setValveClossing()
        //admition.key_status = 'up'

        //indicator.spin_down()
        //indicator.key_status = 'up'
        
    }
})
  