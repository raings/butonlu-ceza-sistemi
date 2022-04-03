const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
const profil = JSON.parse(fs.readFileSync("./jailsistemi.json", "utf8"));

module.exports.config = { 
    name: 'jail-log',
    aliases: ['j-log','jaillog-ayarla']
}
 
module.exports.maho = async(client, message, args, config) => {
let wellcome = message.mentions.channels.first() 

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`  **Bu komutu kullanamazsınız Yetkiniz yok**`);
 
const maho = new Discord.MessageEmbed().setColor("ff0000");
 if(!wellcome) return message.channel.send(maho.setDescription(`:exclamation: Lütfen Bir Kanal Belirtiniz`))
 
 if(wellcome) {
    if(!profil[message.guild.id]) {
      profil[message.guild.id] = {
        jaillog: wellcome 
      }
    }
    if(profil[message.guild.id]) {
      profil[message.guild.id].jaillog = wellcome.id;
    }
    fs.writeFile("./jailsistemi.json", JSON.stringify(profil), (err) => {
        if(err) message.channel.send("Hata: " + err)
    })
  message.channel.send(new MessageEmbed()
  .setFooter("𝓡𝓪𝓲𝓷𝓰𝓼")
  .setColor("#006bff")
  .setDescription(`
  <:barrl:879417882528849920> jail log  ${wellcome} kanalına ayarlandı

  `))

  db.set(`jail.log.${message.guild.id}`, wellcome.id)  

}
};


