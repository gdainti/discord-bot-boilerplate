const config = require("./config.json");
const pjson = require('./package.json');

const actions = [

    {
        aliases: ['ping', 'p'],
        description: 'shows latency',
        args_optional: [],
        args_required: [],
        visible: true,
        active: true,
        action: async (client, message, args) => {
            const msg = await message.channel.send("Ping?");
            msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        }
    },

    {
        aliases: ['version', 'v'],
        description: 'shows bot version',
        args_optional: [],
        args_required: [],
        visible: true,
        active: true,
        action: async (client, message, args) => {
            message.channel.send(pjson.version);
        }
    },

    {
        aliases: ['help', 'man', 'h'],
        description: 'shows help message',
        args_optional: [],
        args_required: [],
        visible: true,
        active: true,
        action: async (client, message, args) => {
            let helpMessage = '';
            actions.map(action => {
                if (action.visible && action.active) {
                    helpMessage += getHelpActionMessage(action);
                }
            });
            message.channel.send({
                embed: {
                    description: helpMessage
                }
            });
        }
    }
];

function getHelpActionMessage(action) {
    if (!action) return;

    let actionMessage = '';
    action.aliases.map(alias => actionMessage += `\`${config.prefix}${alias}\`  `);

    if (action.args_required && action.args_required.length) {
        actionMessage += `< `;
        action.args_required.map(arg => actionMessage += `\`${arg}\`  `);
        actionMessage += `>`;
    }

    if (action.args_optional && action.args_optional.length) {
        actionMessage += `[ `;
        action.args_optional.map(arg => actionMessage += `\`${arg}\`  `);
        actionMessage += `]`;
    }

    actionMessage += `\n ${action.description} \n\n`;
    return actionMessage;
}

exports.getAction = (action) => {
    for (let index = 0; index < actions.length; index++) {
        if (actions[index].aliases.indexOf(action) > -1) {
            return actions[index];
        }
    }
    return null;
}