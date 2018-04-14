const Discord = require("discord.js");
const config = require("./config.json");
const actions = require("./actions.js");

const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Bot has started as ${client.user.tag}, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    client.user.setActivity(config.activity);
});

client.on("message", (message) => {

    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    //if (message.channel.type === "dm") return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const action = args.shift().toLowerCase();

    try {
        const actionObject = actions.getAction(action);
        if (actionObject && actionObject.active) {
            actionObject.action(client, message, args);
        }

    } catch (err) { }

});

client.login(config.token);