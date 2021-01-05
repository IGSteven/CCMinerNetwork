"use strict";
const EventEmitter = require('events');
const mws = new EventEmitter();
const WebSocketServer = require("ws").Server;
const wss = new WebSocketServer({ port: 8080 });

var client = {};

// Status
var Miners = {Miner1: false,Miner2: false,Miner3: false,Miner4: false,Miner5: false,Miner6: false}
setTimeout(() => {
    mws.emit('MinerHeartbeat')
}, 512)

wss.on("connection", (ws) => {
   console.info("websocket connection open");
   client = {
       isAlive: true,
       label: "",
       heartbeat: Date.now()
   };

    setTimeout(() => {
        if (Date.now() - client.heartbeat > 10 * 1000){
            client.isAlive = false;
        }
    }, 512)


   if (ws.readyState === ws.OPEN) {
       ws.send('yo, Connected!')
   }
   wss.on("message", (msg) => {

    if (msg.startsWith("MinerHeartbeat")){
        client.isAlive = True;
        client.Heartbeat = Date.now();
        Miners[client.MinerID] = true;
    }

    // Miner
    if (msg.startsWith("MinerRegister")){
        console.info("Miner Registered");
        client.MinerID = msg.slice("MinerRegister ".length);
        client.label = "Miner" + client.MinerID;

        setTimeout(() => { msg.send('heartbeat')}, 512);
    }

    // Screen
    if (msg == "MinerScreenSubscribe"){
        client.label = "MinerScreen";

        setTimeout(() => { 
            if (Miners.miner1 = true) { MessageContract = "Miner1 = on | "} else { MessageContract = "Miner1 = off | "}
            if (Miners.miner2 = true) { MessageContract = MessageContract +  "Miner2 = on | "} else { MessageContract = MessageContract + "Miner2 = off | "}
            if (Miners.miner3 = true) { MessageContract = MessageContract +  "Miner3 = on | "} else { MessageContract = MessageContract + "Miner3 = off | "}
            if (Miners.miner4 = true) { MessageContract = MessageContract +  "Miner4 = on | "} else { MessageContract = MessageContract + "Miner4 = off | "}
            if (Miners.miner5 = true) { MessageContract = MessageContract +  "Miner5 = on | "} else { MessageContract = MessageContract + "Miner5 = off | "}
            if (Miners.miner6 = true) { MessageContract = MessageContract +  "Miner6 = on "} else { MessageContract = MessageContract + "Miner6 = off "}
            msg.send("MinerStatus:"+MessageContract);
        }, 512)
    
    }
})
});
