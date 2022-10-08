// Checker
const colors = require('colors')
const config = require('./config.json')
const software = ['java', 'bedrock']
if(!config.prefix || !config.token || !config.software || !config.ip || !software.includes(config.software)) {
  return console.log(`Go To config.json file! \nPrefix: ${config.prefix || '!'}\nToken: ${config.token || 'private'}\nSoftware: ${config.software || 'bedrock'}\nIp And Port: ${config.ip || 'play.example.net'}:${config.port || '19132'}`.red)
} else {
 console.log('Successfully!'.green)
}

if(config.software === 'bedrock') {
  if(!config.port) config.port = 19132
}
if(config.software === 'java') {
  if(!config.port) config.port = 25565
}

// 24/7 Uptime

const express = require('express')
const app = express()
app.listen('3000', () => {
  console.log('Port: 3000'. green)
})

app.get('/', (req, res) => {
  res.send('lol')
})

// Main JS
const Discord = require('discord.js')
const client = new Discord.Client({ intents: 32767 })
const fs = require('fs')
const SimplDB = require('simpl.db')
const db = new SimplDB()

const {
  setIntervalAsync,
  clearIntervalAsync
} = require('set-interval-async/dynamic')

client.slash = new Discord.Collection();

['slash'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

client.on('ready', async () => {

  setIntervalAsync(
  async () => {

    if(config.software === 'bedrock') {
      const fetch = require('node-fetch')

      let { debug, motd, players, online } = await fetch(`https://api.mcsrvstat.us/bedrock/2/${config.ip}:${config.port}`).then(response => response.json())
      if(debug.query === false) {
      console.log('Server Not Found!'.red)
      process.exit()
      }

      if(!online && online === false) {
        client.user.setPresence({ activities: [{ name: `Status: Offline` }]  })
      }

      if(online === true) {
        client.user.setPresence({ activities: [{ name: `${motd.raw} | Status: Online | Players: ${players.online}/${players.max}` }]  })
      }
    }

    if(config.software === 'java') {
      const fetch = require('node-fetch')

      let { debug, motd, players, online } = await fetch(`https://api.mcsrvstat.us/2/${config.ip}:${config.port}`).then(response => response.json())
      if(debug.ping === false) {
      console.log('Server Not Found!')
      process.exit()
      }

      if(!online && online === false) {
        client.user.setPresence({ activities: [{ name: `Status: Offline` }]  })
      }

      if(online === true) {
        client.user.setPresence({ activities: [{ name: `Status: Online | Players: ${players.online}/${players.max}` }]  })
      }
    }
  }, 5000) 

  setIntervalAsync(
  async () => {

    if(config.software === 'bedrock') {
      const fetch = require('node-fetch')

      let { debug, motd, players, online } = await fetch(`https://api.mcsrvstat.us/bedrock/2/${config.ip}:${config.port}`).then(response => response.json());
      if(debug.query === false) {
      console.log('Server Not Found!'.red)
      process.exit()
      }
      
      let uptime = db.get('up')

      if(!online && online === false) {
        if(uptime === 100) return;
        if(!uptime) db.set('up', 100)
        if(uptime) db.add('up', 1)
      }

      if(online === true) {
        if(uptime === 100) return;
        if(!uptime) db.set('up', 100)
        if(uptime) db.subtract('up', 1)
      }
    } 
    
    if(config.software === 'java') {
      const fetch = require('node-fetch')

      let { debug, motd, players, online } = await fetch(`https://api.mcsrvstat.us/2/${config.ip}:${config.port}`).then(response => response.json());
      if(debug.ping === false) {
      console.log('Server Not Found!'.red)
      process.exit()
      }
      let uptime = db.get('up')

      if(!online && online === false) {
        if(uptime === 100) return;
        if(!uptime) db.set('up', 100)
        if(uptime) db.add('up', 1)
      }

      if(online === true) {
        if(uptime === 100) return;
        if(!uptime) db.set('up', 100)
        if(uptime) db.subtract('up', 1)
      }
    }
  }, 5000)
})

client.on('interactionCreate', async (inter) => {

  if(!inter.isButton) return;
  const cmd = client.slash.get(inter.commandName);
  if(!cmd) return;
  
  cmd.run(client, inter, config, db);

})

client.login(config.token).catch(err => {
  console.error('Invalid Token!'.red)
})
