const Discord = require('discord.js');//
const client = new Discord.Client();//
const ayarlar = require('./ayarlar.json');//
const chalk = require('chalk');//
const moment = require('moment');//
var Jimp = require('jimp');//
const { Client, Util } = require('discord.js');//
const fs = require('fs');//
const db = require('quick.db');//
const express = require('express');//
require('./util/eventLoader.js')(client);//
const path = require('path');//
const snekfetch = require('snekfetch');//
const ms = require('ms');//
//

var prefix = ayarlar.prefix;//
//
const log = message => {//
    console.log(`${message}`);//
};

client.commands = new Discord.Collection();//
client.aliases = new Discord.Collection();//
fs.readdir('./komutlar/', (err, files) => {//
    if (err) console.error(err);//
    log(`${files.length} komut yüklenecek.`);//
    files.forEach(f => {//
        let props = require(`./komutlar/${f}`);//
        log(`Yüklenen komut: ${props.help.name}.`);//
        client.commands.set(props.help.name, props);//
        props.conf.aliases.forEach(alias => {//
            client.aliases.set(alias, props.help.name);//
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {
    require("moment-duration-format")
      var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
      var üs = üyesayısı.match(/([0-9])/g)
      üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
      if(üs) {
        üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
          return {
            '0': `<a:say0:788444329164931112>`,
            '1': `<a:say1:788444390863405126>`,
            '2': `<a:say2:788444980117110814>`,
            '3': `<a:say3:788444391404208128>`,
            '4': `<a:say4:788444391017676840>`,
            '5': `<a:say5:788444390460882986>`,
            '6': `<a:say6:788444386626109460>`,
            '7': `<a:say7:788444389826494504>`,
            '8': `<a:say8:788444390833651752>`,
            '9': `<a:say9:788444391035502622>`}[d];
          })
        }
    const kanal = member.guild.channels.cache.find(r => r.id === "786954963456491540");
    let user = client.users.cache.get(member.id);
    require("moment-duration-format");
      const kurulus = new Date().getTime() - user.createdAt.getTime();  
   
    var kontrol;
  if (kurulus < 1296000000) kontrol = 'Hesap Durumu: Güvenilir Değil <a:phoenixuyar:763817362843238450>.'
  if (kurulus > 1296000000) kontrol = 'Hesap Durumu: Güvenilir Gözüküyor <a:tik2:782962247654703127>.'
    moment.locale("tr");
    const embed = new Discord.MessageEmbed()
    .setAuthor(member.guild.name, member.guild.iconURL({ dynamic: true }))
    .setThumbnail(member.user.avatarURL({ dynamic: true }))
    .setColor('0xEFF3E6')
    .setDescription("\n<a:phoenixpkacu:763819542760914944> **<@"+member.user.id+">  Aramıza Katıldı. \n\n<a:phoenixkedi3:763819535459156028> Odalardan Birisinde Teyit Vererek Kayıt Olabilirsin. \n\n<a:phoenixsonsuzluk:763821459608043561> <@&786913915577303050> Rolündekiler Seninle İlgilenecektir. \n\nSeninle Birlikte "+üyesayısı+" Kişiyiz. \n\n<a:phoenixiyigcler:763821458803261510> Hesabın: `" + moment(member.user.createdAt).format("\`YYYY DD MMMM dddd\`") +  "` Tarihinde Oluşturulmuş. \n\n"+kontrol+" \n\n<a:nezukochan:786679339051122750> Tagımızı Alarak ` ☙ ` Bize Destek Olabilirsin.**")
    .setFooter(`PHOENİX`)
    kanal.send(`<@&786913915577303050>`)
    kanal.send(embed)
});
  

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG



//------------------------------------------------------------------------------------------------------------------------------------\\

client.on("guildMemberAdd", member => {
    var moment = require("moment")
    require("moment-duration-format")
    moment.locale("tr")
     var {Permissions} = require('discord.js');
     var x = moment(member.user.createdAt).add(7, 'days').fromNow()
     var user = member.user
     x = x.replace("birkaç saniye önce", " ")
     if(!x.includes("önce") || x.includes("sonra") ||x == " ") {
    const kytsz = member.guild.roles.cache.find(r => r.id === "786864156103933964") 
     var rol = member.guild.roles.cache.get("787696896860094464") // ŞÜPHELİ HESAP ROLÜNÜN İDSİNİ GİRİN
     var kayıtsız = member.guild.roles.cache.get(786864156103933964) // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
     member.roles.add(rol)
     member.roles.remove(kytsz)

  member.user.send('Selam Dostum Ne Yazık ki Sana Kötü Bir Haberim Var Hesabın 1 Hafta Gibi Kısa Bir Sürede Açıldığı İçin Fake Hesap Katagorisine Giriyorsun Lütfen Bir Yetkiliyle İletişime Geç Onlar Sana Yardımcı Olucaktır.')
  setTimeout(() => {
  
  }, 1000)
  
  
     }
          else {
  
          }
      });

//------------------------------------------------------------------------------------------------------------------------------------\\


//-----------------------TAG-ROL----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get('762295518662885376'); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "☙"; // Buraya Ekip Tag
  var tagrol = "786864153339887636"; // Buraya Ekip Rolünün ID
  var logKanali = "786988586175561728"; // Loglanacağı Kanalın ID

  if (!sunucu.members.cache.has(yeni.id) || yeni.bot || stg.username === yeni.username) return;
  
  if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('GREEN').setDescription(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`));
    } catch (err) { console.error(err) };
  };
  
  if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
    try {
      await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
      await uye.send(`Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`);
      await client.channels.cache.get(logKanali).send(new Discord.MessageEmbed().setColor('RED').setDescription(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`));
    } catch(err) { console.error(err) };
  };
});

//----------------------TAG-KONTROL----------------------\\     

client.on("guildMemberAdd", member => {
  let sunucuid = "762295518662885376"; //Buraya sunucunuzun IDsini yazın
  let tag = "☙"; //Buraya tagınızı yazın
  let rol = "786864153339887636"; //Buraya tag alındığı zaman verilecek rolün IDsini yazın
if(member.user.username.includes(tag)){
member.roles.add(rol)
  const tagalma = new Discord.MessageEmbed()
      .setColor("GREEN")
      .setDescription(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, o doğuştan beri bizden !`)
      .setTimestamp()
     client.channels.cache.get('786988586175561728').send(tagalma)
}
})

//-----------------------TAG-KONTROL----------------------\\     