const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'mcstatus',
  description: 'Check Status Of Minecraft Server!',
run: async (client, inter, config, db) => {

  let uptime = db.get('up')

  if(config.software === 'bedrock') {
   let { motd, players, online, version } = await fetch(`https://api.mcsrvstat.us/bedrock/2/${config.ip}:${config.port}`).then(response => response.json())

    if(online === false) {
      let embed = new Discord.EmbedBuilder()

      .setThumbnail(inter.guild.iconURL())
      .setColor(0xFF0033)
      .setTitle(`${config.emoji || ":skull:"} | Minecraft Server Status`)
      .addFields({ name: 'Status: ', value: ':red_circle: Offline' })
      .setFooter({ text: 'Created By Roomy12#9873'})

      inter.reply({ embeds: [embed], ephemeral: true })
    }

    if(online == true) {
    let embed = new Discord.EmbedBuilder()

      .setColor(0x99FF00)
      .setThumbnail(inter.guild.iconURL())
      .setTitle(`${config.emoji || ":skull:"} | ${inter.guild.name}'s Status`)
      .addFields({ name: 'Status: ', value: ':green_circle: Online', inline: true })
      .addFields({ name: 'Players/Max: ', value: `${player.online}/${player.max}`, inline: true })
      .addFields({ name: 'Version: ', value: `${version}`, inline: true})
      .addFields({ name: 'Uptime (Not Accurate): ', value: `${uptime}%`, inline: true})
      .setFooter({ text: 'Created By Roomy12#9873'})

      inter.reply({ embeds: [embed] })
    }
  }

  if(config.software === 'java') {
   let { motd, players, online, version, info } = await fetch(`https://api.mcsrvstat.us/2/${config.ip}:${config.port}`).then(response => response.json()) 
    
   let player = players
   if(!player) player = "null"
   if(!info) info = "null"
   if(!player.list) player.list = "No Players"

    if(online === false) {
      let embed = new Discord.EmbedBuilder()

      .setThumbnail(inter.guild.iconURL())
      .setColor(0xFF0033)
      .setTitle(`${config.emoji || ":skull:"} | Minecraft Server Status`)
      .addFields({ name: 'Status: ', value: ':red_circle: Offline'})
      .setFooter({ text: 'Created By Roomy12#9873'})

      inter.reply({ embeds: [embed], ephemeral: true })
    }

    if(online == true) {
    let embed = new Discord.EmbedBuilder()

      .setColor(0x99FF00)
      .setThumbnail(inter.guild.iconURL())
      .setTitle(`${config.emoji || ":skull:"} | ${inter.guild.name}'s Status`)
      .addFields({ name: 'Status: ', value: ':green_circle: Online', inline: true})
      .addFields({ name: 'Players/Max: ', value: `${player.online}/${player.max}`, inline: true})
      .addFields({ name: 'Players: ', value: `${player.list}`})
      .addFields({ name: 'Version: ', value: `${version}`, inline: true})
      .addFields({ name: 'Uptime (Not Accurate): ', value: `${uptime}%`, inline: true})
      .setFooter({ text: 'Created By Roomy12#9873'})

      inter.reply({ embeds: [embed] })
    }
  }
  }
}
