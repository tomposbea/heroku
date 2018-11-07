'use strict'

const express=require('express')
const bodyParser=require('body-parser')
const request=require('request')

const app=express()

app.set('port',(process.env.PORT ||5000))

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/',function(req,res){
    res.send("Hello")
})


//facebook part

let token="EAAfUK9qa8owBAEIAZBdDQzshY78ZCFZC5VflRXFThmvcJZBPX2MYQjNQn313uMQ9l4QAhb8TZCNmV1xHZBCXuwpbfuEak8oHelapUZBjqp7Ma7jwnNiAq3wuKefFX2j3ZCqZCIwaTRHx27HRD9INxdr4LAdgFuxEbEZBBBZApTS1pJuaf7zY8bo7ttY"

app.get('/webhook/',function(req,res){
    if(req.query['hub.verify_token']==='1234'){
        res.send(req.query['hub.challenge'])
    }
    res.send("Wrong token")
})

app.post('/webhook/',function(req,res){
    let messaging_events=req.body.entry[0].messaging
    for (let i=0;i<messaging_events.lenght;i++){
        let event=messaging_events[i]
        let sender=event.sender.id
        if(event.message && event.message.text){
            let text=event.message.text
            sendText(sender,"Uzi: "+text.substring[0,100])
        }
    }
    res.sendStatus(200)
})

function sendText(sender,text){
    let messageData={text:text}
    request({
        url:"https://graph.facebook.com/v2.6/me/messages",
        qs:{access_token:token},
        method:"POST",
        json:{
            recipient:{id:sender},
            message:messageData,
        }
    },function(error,response,body){
        if(error){
            console.log("sending error")
        }
        else if(response.body.error){
            console.log("response body error")
        }
    })
}

app.listen(app.get('port'),function(){
    console.log("runnin: port")
})
