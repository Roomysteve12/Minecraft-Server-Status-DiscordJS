const Discord = require('discord.js')

module.exports = {
  name: 'help',
  description: 'Check Discord Bot Commands!',
run: async (client, inter, config, db) => {
  let embed = new Discord.EmbedBuilder()

      .setThumbnail(inter.guild.iconURL())
      .setColor(0xFF0033)
      .setTitle(`${config.emoji || ":skull:"} | Commands`)
      .addFields({ name: 'Info:', value: "`help`, `ping`, `uptime`", inline: false })
      .addFields({ name: 'Minecraft:', value: "`mcinfo`, `mcstatus`", inline: false })
      .setFooter({ text: 'Created By Roomy12#9873'})

      inter.reply({ embeds: [embed] })
}
}
