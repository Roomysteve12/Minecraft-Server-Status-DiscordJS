const Discord = require('discord.js')
const ms = require("parse-ms");

module.exports = {
  name: 'uptime',
  description: 'Check Discord Bot Uptime!',
run: async (client, inter, config, db) => {

   let time = ms(client.uptime)
  
   let embed = new Discord.EmbedBuilder()

      .setThumbnail(inter.guild.iconURL())
      .setColor(0xFF0033)
      .setTitle(`${config.emoji || ":skull:"} | Uptime`)
      .setDescription(`${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds`)
      .setFooter({ text: 'Created By Roomy12#9873'})

      inter.reply({ embeds: [embed], ephemeral: true })
}
}
