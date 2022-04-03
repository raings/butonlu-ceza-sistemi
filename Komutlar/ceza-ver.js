const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const moment = require('moment')
const ms = require('ms')
const db = require('quick.db')

module.exports.config = { 
    name: 'cezaver',
    aliases: ['cezaver','ceza-ver']
}

module.exports.maho = async(client, message, args, config) => {
    const est2 = "**JAİL**"
    const est1 = "**SES MUTE**"
    const est = "**MUTE**"
    const yazı = "VMUTE"
    const yazı2 = "MUTE"
    const yazı3 = "JAİL"
    const iptal = "İPTAL ET"

 
    

    let mutes = await db.fetch(`muterol.${message.guild.id}`);
    if(!mutes) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Mute Muted Rolü Ayarlı Değil \n \` l!mute-rol @mutedrol\`').setColor("RED")).then(x => x.delete({timeout:10000}))
    let muteYetkili = await db.fetch(`muteyetki.role.${message.guild.id}`);
    if(!muteYetkili) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Mute Yetkili Rolü Ayarlı Değil \n \` l!mute-yetkili-rol @muteyetkilirol\`').setColor("RED")).then(x => x.delete({timeout:10000}))
    const logChannel = await db.fetch(`mute.log.${message.guild.id}`);
    if(!logChannel) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Mute Log Kanalı Ayarlı Değil \n \` l!mute-log #mutelogkanal\`').setColor("RED")).then(x => x.delete({timeout:10000}))
    const cezapuankanal = await db.fetch(`cezapuanlog2.${message.guild.id}`);
    if(!cezapuankanal) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Ceza Puan Log Kanalı Ayarlı Değil \n \` l!ceza-puan-log #cezapuanlog\`').setColor("RED")).then(x => x.delete({timeout:10000}))
    let sesmuteYetkili = await db.fetch(`sesmuteyetkilirol.${message.guild.id}`);
    if(!sesmuteYetkili) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Ses Mute Yetkili Rolü Ayarlı Değil \n \`l!ses-mute-yetkili-rol @sesmuteyetkilirol\`').setColor("RED")).then(x => x.delete({timeout:10000}))
    const seslogChannel = await db.fetch(`sesmute.log.${message.guild.id}`);
    if(!seslogChannel) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Ses Mute Log Kanalı Ayarlı Değil \n \`l!ses-mute-log #sesmutelogkanal\`').setColor("RED")).then(x => x.delete({timeout:10000}))
    let jailYetkili = await db.fetch(`jailyetki.role.${message.guild.id}`);
    if(!jailYetkili) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Jail Yetkili Rolü Ayarlı Değil \n \`l!jail-yetkili-rol @jailyetkilirol\`').setColor("RED")).then(x => x.delete({timeout:10000}))
    const jaillogChannel = await db.fetch(`jail.log.${message.guild.id}`);
    if(!jaillogChannel) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Jail Log Kanalı Ayarlı Değil \n \`l!jail-log #jaillogkanal\`').setColor("RED")).then(x => x.delete({timeout:10000}))
    let jailrol = await db.fetch(`jailrol.${message.guild.id}`);
    if(!jailrol) return message.channel.send(new Discord.MessageEmbed().setDescription('<a:3_:869998902940684289> Jail Ceza Rolü Ayarlı Değil \n \`l!jail-rol @jail\`').setColor("RED")).then(x => x.delete({timeout:10000}))

    if(!mutes) return;
    if(!logChannel) return;
    if(!cezapuankanal) return;
    if(!muteYetkili) return;
    if(!seslogChannel) return;
    if(!sesmuteYetkili) return;
    if(!jailYetkili) return;    
    if(!jaillogChannel) return;
    if(!jailrol) return;    
    
    let yanlis = new MessageEmbed().setAuthor(message.guild.name, message.guild.iconURL({dynamic: true})).setColor('RED').setFooter("RAİNGS")
    if(![sesmuteYetkili, muteYetkili, jailYetkili].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(yanlis.setDescription('Gerekli yetkilere sahip değilsin.')).then(x => x.delete({timeout: 2000}))

    const uye = message.mentions.members.first() || message.member.roles.cache.find(role => role.name === "Leader") || message.guild.members.cache.get(args[0])
    if(!uye) return message.channel.send(yanlis.setDescription('Belirttiğiniz üyeyi bulamadım.')).then(x => x.delete({timeout: 2000}))
    let zaman = args[1]
    if(!zaman) return message.channel.send(yanlis.setDescription(`Bir zaman belirtmen gerekiyor.`)).then(x => x.delete({timeout: 2000}))
    let sebep = args.splice(2).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 2000}))

    let timereplace = args[1];
    let time = timereplace.replace(/y/, ' Yıl').replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat')
    var tarih = new Date(Date.now())
    var tarih2 = ms(timereplace)
    var tarih3 = Date.now() + tarih2
    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let bitişay = moment(tarih3).format("MM")
    let bitişgün = moment(tarih3).format("DD")
    let bitişsaat = moment(tarih3).format("HH:mm:ss")
    let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
    moment.locale("tr")
    let cezaID = db.get(`cezaid.${message.guild.id}`)+1
    db.add(`cezapuan.${uye.id}.${message.guild.id}`, +20);
    db.add(`yetkilipuan.${message.author.id}`, puan);
    let cpuan = db.get(`cezapuan.${uye.id}.${message.guild.id}`);
    db.add(`cezaid.${message.guild.id}`, +1);
    db.set(`cezalı.${uye.id}.${message.guild.id}`, 'cezalı')
    db.set(`süre.${uye.id}.${message.guild.id}`, zaman)
    
    const JAİL = new MessageButton()
    .setStyle('blurple')
    .setLabel(yazı3)
    .setID('jail')

    const VMUTE = new MessageButton()
    .setStyle('blurple')
    .setLabel(yazı)
    .setID('sesmute')

    const MUTE = new MessageButton()
    .setStyle('blurple')
    .setLabel(yazı2)
    .setID('mute')

    const iptalceza = new MessageButton()
    .setStyle('red')
    .setLabel(iptal)
    .setID('cezaiptal')

    message.channel.send("**Kişiye Hangi Cezayı Vermek İstediğinizi seçiniz**", {buttons: [VMUTE, MUTE, JAİL, iptalceza]}).then(async function(sent) {
        sent.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
            if(button.id == "sesmute") {

            
            client.channels.cache.get(seslogChannel).send(`<:susturma:879461645586432091> ${uye} ${time} boyunca ses kanallarında susturuldu.(\`#${cezaID}\`)`)
            let anen = new MessageEmbed()
            .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
            .setFooter(``)
            .setThumbnail("")
            .setColor("RED")
            .setTitle(``)
            .setDescription(`
            ${uye} (\`${uye.id}\`) üyesi ses kanallarında  \`${timereplace}\` süresince susturuldu.
        
            • Suturma Atılma Tarihi: \`${muteatılma}\`
            • Susturma Bitiş Tarihi: \`${mutebitiş}\`
            
            • Susturma Sebebi: \`${sebep}\`
            `)
            client.channels.cache.get(seslogChannel).send(anen)
            uye.voice.setMute(true);
            let embed2 = new MessageEmbed()
            .setAuthor("")
            .setFooter(``)
            .setThumbnail("")
            .setTitle(``)
            .setColor("RANDOM")
            .setDescription(`
            ${uye} ** \`#${cezaID}\`Ceza ID'li üyenin toplam** \`${cpuan}\` **ceza puanı olarak güncellendi**.
            `)
            client.channels.cache.get(cezapuankanal).send(embed2)
            message.channel.send(yanlis.setDescription(`Üyeyi başarıyla **voice mute** cezası verdiniz.`))
            setTimeout(async() => {
                uye.voice.setMute(false);
                
                let vmuteli = db.fetch(`cezalı.${uye.id}.${message.guild.id}`)
                if(!vmuteli) return;
                if(vmuteli == 'cezalı') {
                    client.channels.cache.get(seslogChannel).send(new MessageEmbed().setDescription(`${uye} Sesli kanallardan susturulması kaldırıldı`).setColor("#00ff35"))
                    await db.delete(`cezalı.${uye.id}.${message.guild.id}`)
                    await db.delete(`süre.${uye.id}.${message.author.id}`)
                }
            }, ms(zaman));
            db.push(`isim.${uye.id}`, {
                userID: uye.id,
               sebebi: `${sebep}`,
               yetkiliisim: `${message.author}`,
               cezalıisim: `${uye}`,
           cezazamanı: `${time}`,  
            CezaAtılmaTarihi: `${muteatılma}`,
           CezaBitişTarihi: `${mutebitiş}` ,   
       estr: `${est1}`,
       })
                button.reply.defer()
            } else if(button.id =="mute") {
                client.channels.cache.get(logChannel).send(`${uye} ${time} boyunca metin kanallarında susturuldu.(\`#${cezaID}\`)`)
                uye.roles.cache.forEach((a) => {
                    uye.roles.remove(a.id) // tüm rolleri siler
                    })
                    uye.roles.add(mutes)
                let anen = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setThumbnail("")
                .setTitle(``)
                .setColor("ff0000")
                .setDescription(`
                ${uye} (\`${uye.id}\`) üyesinin **${time}** süresince metin kanallarında susturuldu.
                
                • Susturma Atılma Tarihi: **\`${muteatılma}\`**
                • Susturma Bitiş Tarihi: **\`${mutebitiş}\`**
                • Susturma Sebebi: \`${sebep}\`    
                `)
                message.channel.send(yanlis.setDescription(`Üyeyi başarıyla **mute** cezası verdiniz.`))

                client.channels.cache.get(logChannel).send(anen)

                let embed2 = new MessageEmbed()
                .setAuthor("")
                .setFooter(``)
                .setThumbnail("")
                .setTitle(``)
                .setColor("RANDOM")
                .setDescription(`
                ${uye} ** \`#${cezaID}\`Ceza ID'li üyenin toplam** \`${cpuan}\` **ceza puanı olarak güncellendi**.
                `)
                client.channels.cache.get(cezapuankanal).send(embed2)
                setTimeout(async() => {
                    let vmuteli = db.fetch(`cezalı.${uye.id}.${message.guild.id}`)
                    if(!vmuteli) return;
                    if(vmuteli == 'cezalı') {
                        client.channels.cache.get(logChannel).send(new MessageEmbed().setDescription(`${uye} Metin kanallardan Yazma Cezası kaldırıldı`).setColor("#00ff35"))
                        await db.delete(`cezalı.${uye.id}.${message.guild.id}`)
                        await db.delete(`süre.${uye.id}.${message.author.id}`)
                        await uye.roles.remove(mutes)
                        uye.roles.add(kayıtsız)
                    }
                }, ms(zaman));
                db.push(`isim.${uye.id}`, {
                    userID: uye.id,
                   sebebi: `${sebep}`,
                   yetkiliisim: `${message.author}`,
                   cezalıisim: `${uye}`,
               cezazamanı: `${time}`,  
                CezaAtılmaTarihi: `${muteatılma}`,
               CezaBitişTarihi: `${mutebitiş}` ,   
           estr: `${est}`,
           })
                
                button.reply.defer()
            } else if(button.id =="jail") {
                client.channels.cache.get(jaillogChannel).send(`⛓️ ${uye} ${time} boyunca jaile atıldı.(\`#${cezaID}\`)`)
                uye.roles.cache.forEach((a) => {
                    uye.roles.remove(a.id) // tüm rolleri siler
                    })
                    uye.roles.add(jailrol)
                let anen = new MessageEmbed()
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic:true}))
                .setThumbnail("")
                .setTitle(``)
                .setColor("ff0000")
                .setDescription(`
                ${uye} Kişisine **${time}** ceza verildi. 
                
                ••❯ Ceza Verilme Tarihi: **\`${muteatılma}\`**
                ••❯ Ceza Bitiş Tarihi: **\`${mutebitiş}\`**
                ••❯ Sebebi: \`${sebep}\`
                Ceza Numarası \`#${cezaID}\`
                
                `)
                message.channel.send(yanlis.setDescription(`Üyeyi başarıyla **jail** cezası verdiniz.`))

                client.channels.cache.get(jaillogChannel).send(anen)

                let embed2 = new MessageEmbed()
                .setAuthor("")
                .setFooter(``)
                .setThumbnail("")
                .setTitle(``)
                .setColor("RANDOM")
                .setDescription(`
                ${uye} ** \`#${cezaID}\`Ceza ID'li üyenin toplam** \`${cpuan}\` **ceza puanı olarak güncellendi**.
                `)
                client.channels.cache.get(cezapuankanal).send(embed2)
                setTimeout(async() => {
                    let vmuteli = db.fetch(`cezalı.${uye.id}.${message.guild.id}`)
                    if(!vmuteli) return;
                    if(vmuteli == 'cezalı') {
                        client.channels.cache.get(jaillogChannel).send(new MessageEmbed().setDescription(`${uye} Metin kanallardan Yazma Cezası kaldırıldı`).setColor("#00ff35"))
                        await db.delete(`cezalı.${uye.id}.${message.guild.id}`)
                        await db.delete(`süre.${uye.id}.${message.author.id}`)
                        await uye.roles.remove(jailrol)
                        uye.roles.add(kayıtsız)

                    }
                }, ms(zaman));
                db.push(`isim.${uye.id}`, {
                    userID: uye.id,
                   sebebi: `${sebep}`,
                   yetkiliisim: `${message.author}`,
                   cezalıisim: `${uye}`,
               cezazamanı: `${time}`,  
                CezaAtılmaTarihi: `${muteatılma}`,
               CezaBitişTarihi: `${mutebitiş}` ,   
           estr: `${est2}`,
           })
                
                button.reply.defer()
            } else if(button.id == "cezaiptal") {
                button.reply.defer()
                sent.delete()
            }
        })
    })

}
      
