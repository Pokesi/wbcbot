// init
/* confirm-bot */
const { Client, Intents, MessageEmbed, AwaitMessages, AwaitMessagesOptions, MessageCollector, DMChannel, CreateDM } = require('discord.js');
console.log(Intents);
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });
const token = "O" + "TAzNDUyNzQ3NTMyMjIyNDY0.YXtL8A.VwQUkw_A6oTDQ1NU3FWqH58pP3o"
const password = "!zv_ac;"


client.on('message', async msg => {
  const message = msg.content;
  if (message.toLowerCase() == "confirm-subscription" || message.toLowerCase() == "confirm subscription") {
    msg.channel.send("`You have been DM'ed and must pass a test to prove you are subscribed to the program.`");
    if (!msg.author.bot) {
      msg.author.send('What is the password?' + '\n If this is not you or you did not use the `confim-subscription` command please disregard this message. You have 1 minute');
	console.log(msg.author);
	let channel = msg.author.dmChannel;
	if (!channel) channel = await msg.author.createDM();
	console.log(channel);
	const filter = m => m.author.id == msg.author.id;
     channel.awaitMessages({
	    filter: filter,
          max: 1,
          time: 60_000,
          errors: ['time']
        })
        .then(async dm => {
		console.log(dm);
          dm = dm.first();
		console.log(dm);
          if (dm.content == password) {
            dm.channel.send(`Your respone has been processed :thumbsup:`);
            var role = msg.guild.roles.cache.find(r => r.id === "903827611237646336");
	 msg.guild.members.cache.get(msg.author.id).roles.add(role)
          } else {
            dm.channel.send(`Terminated: Invalid Response`)
          }
        })
    }
  }
});
client.login(token);
