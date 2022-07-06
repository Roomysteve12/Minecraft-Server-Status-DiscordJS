const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: "mcinfo",
run: async (client, message, args, config) => {

 let server = await fetch(`https://api.mcsrvstat.us/bedrock/2/${config.ip}:${config.port}`).then(response => response.json());

if(!config.software === 'bedrock' && !config.software === 'java') return;

if(config.software === 'bedrock') {
  
let embed = new Discord.MessageEmbed()

  .setThumbnail(message.guild.iconURL())
  .setColor('RANDOM')
  .setTitle('<:grass:958700079529721896> | Minecraft Server Status')
  .addField('IP Address:', `${config.ip}`, true)
  .addField('Port:', `${config.port}`, true)
  .addField('Software:', `Bedrock`)
  .addField('Version:', `${server.version}`)
  .setFooter({ text: 'Created By Roomysteve12#1152' })

  message.reply({ embeds: [embed] })
}

if(config.software === 'java') {
  
let embed = new Discord.MessageEmbed()

  .setThumbnail(message.guild.iconURL())
  .setColor('RANDOM')
  .setTitle('<:grass:958700079529721896> | Minecraft Server Status')
  .addField('IP Address:', `${config.ip}`, true)
  .addField('Port:', `${config.port}`, true)
  .addField('Software:', `Java`)
  .addField('Version:', `${server.version}`)
  .setFooter({ text: 'Created By Roomysteve12#1152' })

  message.reply({ embeds: [embed] })
}  
}
}
