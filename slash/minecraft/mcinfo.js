const Discord = require('discord.js')
const fetch = require('node-fetch')

module.exports = {
  name: 'mcinfo',
  description: 'Check Info Of Minecraft Server!',
run: async (client, inter, config, db) => {
  let uptime = db.get('up')

  if(config.software === 'bedrock') {

    let embed = new Discord.EmbedBuilder()

      .setColor(0x99FF00)
      .setThumbnail(inter.guild.iconURL())
      .setTitle(`${config.emoji || ":skull:"} | Info`)
      .addFields({ name: 'Ip:', value: `${config.ip}`, inline: true })
      .addFields({ name: 'Port:', value: `${config.port}`, inline: true })
      .addFields({ name: 'Uptime:', value: `${uptime}%`, inline: true })
      .setFooter({ text: 'Created By _roomysteve12'})

      inter.reply({ embeds: [embed], ephemeral: true })
  }

  if(config.software === 'java') {
   
    let embed = new Discord.EmbedBuilder()

      .setColor(0x99FF00)
      .setThumbnail(inter.guild.iconURL())
      .setTitle(`${config.emoji || ":skull:"} | Info`)
      .addFields({ name: 'Ip:', value: `${config.ip}`, inline: true })
      .addFields({ name: 'Port:', value: `${config.port}`, inline: true })
      .addFields({ name: 'Uptime:', value: `${uptime}%`, inline: false })
      .setFooter({ text: 'Created By _roomysteve12'})

      inter.reply({ embeds: [embed], ephemeral: true })
  }
 }
}
