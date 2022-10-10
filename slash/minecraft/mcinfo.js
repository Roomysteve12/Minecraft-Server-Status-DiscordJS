const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'mcinfo',
  description: 'Check Info Of Minecraft Server!',
run: async (client, inter, config, db) => {
  let uptime = db.get('up')

  if(config.software === 'bedrock') {
   let { motd, players, online, version } = await fetch(`https://api.mcsrvstat.us/bedrock/2/${config.ip}:${config.port}`).then(response => response.json()) 

    if(online === false) {
      let embed = new Discord.EmbedBuilder()

      .setThumbnail(inter.guild.iconURL())
      .setColor(0xFF0033)
      .setTitle('<:grass:958700079529721896> | Minecraft Server Status')
      .addFields({ name: 'Status: ', value: ':red_circle: Offline' })
      .setFooter({ text: 'Created By Roomy12#6360'})

      inter.reply({ embeds: [embed] })
    }

    if(online == true) {
    let embed = new Discord.EmbedBuilder()

      .setColor(0x99FF00)
      .setThumbnail(inter.guild.iconURL())
      .setTitle(`<:grass:958700079529721896> | ${motd.raw}'s Info`)
      .addFields({ name: 'Status: ', value: ':green_circle: Online', inline: true})
      .addFields({ name: 'Ip:', value: `${config.ip}`, inline: true })
      .addFields({ name: 'Port:', value: `${config.port}`, inline: true })
      .addFields({ name: 'Uptime:', value: `${uptime}%`, inline: true })
      .setFooter({ text: 'Created By Roomy12#6360'})

      inter.reply({ embeds: [embed] })
    }
  }

  if(config.software === 'java') {
   let { online } = await fetch(`https://api.mcsrvstat.us/2/${config.ip}:${config.port}`).then(response => response.json())

    if(online === false) {
      let embed = new Discord.EmbedBuilder()

      .setThumbnail(inter.guild.iconURL())
      .setColor(0xFF0033)
      .setTitle('<:grass:958700079529721896> | Minecraft Server Status')
      .addFields({ name: 'Status: ', value: ':red_circle: Offline'})
      .setFooter({ text: 'Created By Roomy12#6360'})

      inter.reply({ embeds: [embed] })
    }

    if(online == true) {
    let embed = new Discord.EmbedBuilder()

      .setColor(0x99FF00)
      .setThumbnail(inter.guild.iconURL())
      .setTitle(`<:grass:958700079529721896> | ${motd.raw}'s Info`)
      .addFields({ name: 'Status: ', value: ':green_circle: Online', inline: true})
      .addFields({ name: 'Ip:', value: `${config.ip}`, inline: true })
      .addFields({ name: 'Port:', value: `${config.port}`, inline: true })
      .addFields({ name: 'Uptime:', value: `${uptime}%`, inline: true })
      .setFooter({ text: 'Created By Roomy12#6360'})

      inter.reply({ embeds: [embed] })
    }
  }
 }
}