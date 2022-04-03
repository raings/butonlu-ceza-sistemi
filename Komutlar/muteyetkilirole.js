const Discord = require('discord.js');
const db = require('quick.db')
const { MessageEmbed } = require('discord.js');
const fs = require('fs')
const profil = JSON.parse(fs.readFileSync("./mutesistemleri.json", "utf8"));

module.exports.config = { 
    name: 'mute-yetkili-rol',
    aliases: ['m-y-rol','mute-yetkili-role']
}

module.exports.maho = async(client, message, args, config) => {
let mahorol = message.mentions.roles.first()  

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`  **Bu komutu kullanabilmek için yetkiniz yok **`);
const maho1 = new Discord.MessageEmbed().setColor("ff0000");

 
 if(!mahorol) return message.channel.send(maho1.setDescription(`:exclamation: Lütfen Bir Rol Belirt`))
 
 if(mahorol) {
    if(!profil[message.guild.id]) {
      profil[message.guild.id] = {
        yetkilirol: mahorol,
      }
    }
    if(profil[message.guild.id]) {
      profil[message.guild.id].yetkilirol = mahorol;
    }
    fs.writeFile("./mutesistemleri.json", JSON.stringify(profil), (err) => {
        if(err) message.channel.send("Hata: " + err)
    })

message.channel.send(new MessageEmbed()
.setFooter("𝓡𝓪𝓲𝓷𝓰𝓼")
.setColor("#006bff")
.setDescription(`
 <:barrl:879417882528849920> Yetkili Mute Sorumlu **${mahorol}** Rolü Olarak Ayarlandı


`))

db.set(`muteyetki.role.${message.guild.id}`, mahorol.id)  

}
};


