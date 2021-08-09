
                let Discord;
                let Database;
                let moment;
                if(typeof window !== "undefined"){
                    Discord = DiscordJS;
                    Database = EasyDatabase;
                    moment = Momentl;
                } else {
                    Discord = require("discord.js");
                    Database = require("easy-json-database");
                    moment = require('moment');                    
                }
                
                const { MessageButton, MessageActionRow, MessageMenu, MessageMenuOption } = require("discord-buttons")
                const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
                const s4d = {
                    Discord,
                    client: null,
                    tokenInvalid: false,
                    reply: null,
                    joiningMember: null,
                    database: new Database("./db.json"),
                    checkMessageExists() {
                        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
                        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
                    }
                };
                s4d.client = new s4d.Discord.Client({
                    fetchAllMembers: true
                });
                require('discord-buttons')(s4d.client);
                function mainchannel(guild){
                    let channelID;
                    let channels = guild.channels.cache;
                    for (let in channels) {
                        if (channels[i].type === "text" && channels[i].permissionsFor(guild.me).has('SEND_MESSAGES')) {
                            channelID = channels[i]
                            return channelID.id
                        }
                    }
                    return null
                }
                s4d.client.on('raw', async (packet) => {
                    if(['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)){
                        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
                        if(!guild) return;
                        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
                        if(!member) return;
                        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
                        if(!channel) return;
                        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
                        if(!message) return;
                        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
                    }
                });
                function colourRgb(r, g, b) {
  r = Math.max(Math.min(Number(r), 100), 0) * 2.55;
  g = Math.max(Math.min(Number(g), 100), 0) * 2.55;
  b = Math.max(Math.min(Number(b), 100), 0) * 2.55;
  r = ('0' + (Math.round(r) || 0).toString(16)).slice(-2);
  g = ('0' + (Math.round(g) || 0).toString(16)).slice(-2);
  b = ('0' + (Math.round(b) || 0).toString(16)).slice(-2);
  return '#' + r + g + b;
}

function listsGetRandomItem(list, remove) {
  var x = Math.floor(Math.random() * list.length);
  if (remove) {
    return list.splice(x, 1)[0];
  } else {
    return list[x];
  }
}


s4d.client.login('ODMxOTY1ODA0ODkwODE2NTIz.YHc6iQ.HWDLYITnQjrK_xWjVQW42DGYW-w').catch((e) => { s4d.tokenInvalid = true; s4d.tokenError = e; });

s4d.client.on('message', async (s4dmessage) => {
  if (((s4dmessage.content) || '').startsWith('=help' || '')) {
    let embed = new Discord.MessageEmbed()
       embed.setColor((colourRgb(100, 100, 100)));
      embed.setTitle('YOU Wont commands:');
      embed.addField('``=yw``','to get random dares',false);
      embed.addField('``=dm yw``','to play a game of dares in bot\'s dms',false);
      embed.addField('``=pfp``','to see profile pics of people!',false);
      embed.addField('``=inviteyw``','gives the invite link to bot!',false);
      embed.addField('``=sup``','to add more dares',false);
      s4dmessage.channel.send(embed);

  }

});

s4d.client.on('message', async (s4dmessage) => {
  if ((s4dmessage.content) == '=dm yw') {
     (s4dmessage.member).send((listsGetRandomItem(['You Wont!...Change your status to "🤪i am so Horny " **``type DONE if you finished the dare you only have 1 minute``**', 'You Wont!.....Text your friend "i am sorry for your loss, this is wut life is "  **``type DONE if you finished the dare you only have 1 minute``**', 'You Wont!.......Go to the server and Dm your friends and type " I pick my nose” with sad emoji !!! **``type DONE if you finished the dare you only have 1 minute``**', 'You Wont!....Tell someone in your opposite gender you have a crush on them!!! **``type DONE if you finished the dare you only have 1 minute``**', 'You Wont!.....Go to the server and Spit out who’s the oldest person you’ve dated!!! **``type DONE if you finished the dare you only have 1 minute``**', 'You Wont!.....Reveal your real face in a big server!!! **``type DONE if you finished the dare you only have 1 minute``**'], false))).then(msg =>{
    msg.channel.awaitMessages(response => response.content, { time: (1*60*1000), max: 1,errors: ['time'] }).then(async (collected) => { s4d.reply = collected.first().content;
       if ((s4d.reply) == listsGetRandomItem(['DONE', 'done'], false)) {
        s4dmessage.channel.send(String((String(s4dmessage.member) + String(listsGetRandomItem([' you are a champ, you finished the dare and earned my repect!!!', ' YOU ROCK ! you completed the dare!!!', ' AWESOME! you earned my respect!!!'], false)))));
      }

     s4d.reply = null; }).catch(async (e) => { console.error(e);   s4dmessage.channel.send(String((String(s4dmessage.member) + String(listsGetRandomItem([' Such a LOSER, failed to compelete dare in time!!!', ' Failed to do dare in time! , you lost my respect!!!', ' Loser ALERT! , didn\'t complete dare in time!!!'], false)))));
     })
    });
  }

});

s4d.client.on('message', async (s4dmessage) => {
  if (((s4dmessage.content) || '').startsWith('=pfp' || '')) {
    let embed = new Discord.MessageEmbed()
       embed.setColor((colourRgb(100, 100, 100)));
      embed.setAuthor((String(s4dmessage.author.username) + String(s4dmessage.author.id)),((s4dmessage.mentions.members.first()).user.displayAvatarURL()));
      embed.setImage(((s4dmessage.mentions.members.first()).user.displayAvatarURL()));
      s4dmessage.channel.send(embed);

  }

});

s4d.client.on('message', async (s4dmessage) => {
  if (((s4dmessage.content) || '').startsWith('=pfp' || '')) {
    let embed = new Discord.MessageEmbed()
       embed.setColor((colourRgb(100, 100, 100)));
      embed.setAuthor((String(s4dmessage.author.username) + String(s4dmessage.author.id)),((s4dmessage.member).user.displayAvatarURL()));
      embed.setImage(((s4dmessage.member).user.displayAvatarURL()));
      s4dmessage.channel.send(embed);

  }

});

                s4d;
            