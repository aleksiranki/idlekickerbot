var irc = require('irc');

// Configuration
var config = {
   time: 1209600,
   channel: ['#tite-ihmiset'],
   server: 'irc.nebula.fi',
   port: 6667,
   nick: 'lettulinda',
   userName: 'idlekicker',
   realName: 'Idle Kicker',
   debug: true,
   floodProtection: true,
   floodProtectionDelay: 1000
};


// Set up the bot and connect to server
var bot = new irc.Client(config.server, config.nick, {
   channels: config.channel,
    username: config.username,
    realname: config.realname
});
console.log("Connected to:", config.server);

bot.addListener('error', function(message) {
   console.log('error: ', message);
});

// Get the user list
ircusers = [];
bot.addListener('names', function(channel, nicks) {
   //ircusers = nicks;
   Object.keys(nicks).forEach(function(key) {
      ircusers[key] = 0;
      console.log(key);
   });
});

// Log to console when bot joins channels
bot.addListener('join', function(channel, nick, message){
   console.log(nick, " joined: ", channel);
   ircusers[nick] = 0;
});

bot.addListener('message', function(from, to, text, message) {
   console.log("<", from, "> ", text);
   ircusers[from] = 0;
});

setInterval(function(){
   Object.keys(ircusers).forEach(function(key) {
      ircusers[key] += 10;
      ircusers[config.nick] = 0;
      if (ircusers[key] > config.time)
   {
      console.log('Time to kick', key);
      bot.send('KICK', config.channel[0], key, 'Idlekick.');
      delete ircusers[key];
   }
   })
}, 10*1000);
