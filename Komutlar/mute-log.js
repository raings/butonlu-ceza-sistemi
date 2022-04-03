const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
const profil = JSON.parse(fs.readFileSync("./mutesistemleri.json", "utf8"));

module.exports.config = { 
    name: 'mute-log',
    aliases: ['m-log','mutelog-ayarla']
}
 
module.exports.maho = async(client, message, args, config) => {
let wellcome = message.mentions.channels.first() 

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`  **Bu komutu kullanamazsınız Yetkiniz yok**`);
 
const maho = new Discord.MessageEmbed().setColor("ff0000");
 if(!wellcome) return message.channel.send(maho.setDescription(`:exclamation: Lütfen Bir Kanal Belirtiniz`))
 
 if(wellcome) {
    if(!profil[message.guild.id]) {
      profil[message.guild.id] = {
        mutelog: wellcome 
      }
    }
    if(profil[message.guild.id]) {
      profil[message.guild.id].mutelog = wellcome.id;
    }
    fs.writeFile("./mutesistemleri.json", JSON.stringify(profil), (err) => {
        if(err) message.channel.send("Hata: " + err)
    })
  message.channel.send(new MessageEmbed()
  .setFooter("𝓡𝓪𝓲𝓷𝓰𝓼")
  .setColor("#006bff")
  .setDescription(`
  <:barrl:879417882528849920> mutelog  ${wellcome} kanalına ayarlandı

  `))

  db.set(`mute.log.${message.guild.id}`, wellcome.id)  

}
};


