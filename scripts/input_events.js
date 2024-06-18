var events = {
    subscribers: {},

    subscribe: function (channelName, fn){
        this.subscribers[channelName] = this.subscribers[channelName] || []
        this.subscribers[channelName].push(fn)
        console.log(`[Subscribed]: Channel "${channelName}"`)
    },

    publish: function (channelName){
        if (this.subscribers[channelName]){
            this.subscribers[channelName].forEach(function(fn){
                fn()
            });
        }
        console.log(`[${channelName} Publish]: Complete`)
    }
}

function mousePressed(){
    var smoke = new Smoke(mouseX, mouseY)
    air.push(smoke)
}
  
document.addEventListener('keydown', (event)=>{
    if(event.key == "a"){
        events.publish('a_up')
    }
})

document.addEventListener("keyup", (event)=>{
    if(event.key == "a"){
        events.publish('a_down')       
    }
})
  