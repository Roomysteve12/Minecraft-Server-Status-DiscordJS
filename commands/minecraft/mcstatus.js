const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: "mcstatus",
run: async (client, message, args, db, config) => {

  let uptime = db.get('up')

  if(config.software === 'bedrock') {
   let { motd, players, online, version } = await fetch(`https://api.mcsrvstat.us/bedrock/2/${config.ip}:${config.port}`).then(response => response.json()) 

    if(online === false) {
      let embed = new Discord.MessageEmbed()

      .setThumbnail(message.guild.iconURL())
      .setColor('RED')
      .setTitle('<:grass:958700079529721896> | Minecraft Server Status')
      .addField('Status: ', ':red_circle: Offline')
      .setFooter('Created By Roomysteve12#1152')

      message.reply({ embeds: [embed] })
    }

    if(online == true) {
    let embed = new Discord.MessageEmbed()

      .setColor('GREEN')
      .setThumbnail(message.guild.iconURL())
      .setTitle(`<:grass:958700079529721896> | ${motd.raw}'s Status`)
      .addField('Status: ', ':green_circle: Online', true)
      .addField('Players/Max: ', `${players.online}/${players.max}`, true)
      .addField('Version: ', `${version}`, true)
      .addField('Uptime (Not Accurate): ', `${uptime}%`, true)
      .setFooter({ text: 'Created By Roomysteve12#1152'})

      message.reply({ embeds: [embed] })
    }
  }

  if(config.software === 'java') {
   let { motd, players, online, version } = await fetch(`https://api.mcsrvstat.us/2/${config.ip}:${config.port}`).then(response => response.json()) 

    if(online === false) {
      let embed = new Discord.MessageEmbed()

      .setThumbnail(message.guild.iconURL())
      .setColor('RED')
      .setTitle('<:grass:958700079529721896> | Minecraft Server Status')
      .addField('Status: ', ':red_circle: Offline')
      .setFooter('Created By Roomysteve12#1152')

      message.reply({ embeds: [embed] })
    }

    if(online == true) {
    let embed = new Discord.MessageEmbed()

      .setColor('GREEN')
      .setThumbnail(message.guild.iconURL())
      .setTitle(`<:grass:958700079529721896> | ${motd.raw}'s Status`)
      .addField('Status: ', ':green_circle: Online', true)
      .addField('Players/Max: ', `${players.online}/${players.max}`, true)
      .addField('Version: ', `${version}`, true)
      .addField('Uptime (Not Accurate): ', `${uptime}%`, true)
      .setFooter({ text: 'Created By Roomysteve12#1152'})

      message.reply({ embeds: [embed] })
    }
  }
  }
}
