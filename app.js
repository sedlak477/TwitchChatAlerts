const tmi = require('tmi.js');
const colors = require('colors');

const config = require("./config.json");
const package = require("./package.json");

colors.setTheme({
    join: 'green',
    part: 'red',
    money: 'cyan',
    chat: 'gray',
    channel: 'yellow'
});

if (config.channels.length > 1 && config.flags.singleChannelMode) {
    console.error("Can't join multiple channels in singleChannelMode!".red);
    process.exit(0xFF03D1);  // Random error number, doesn't have any meaning
}

let client = tmi.client({
    connection: {
        reconnect: true,
        secure: true
    },
    channels: config.channels
});

if (config.flags.showJoin)
    client.on('join', (channel, username, self) => {
        if (config.flags.showSelf || !self)
            console.log("> " + (`${username} joined` + (!config.flags.singleChannelMode ? ` channel ${channel.channel}` : "")).join);
    });

if (config.flags.showPart)
    client.on('part', (channel, username, self) => {
        if (config.flags.showSelf || !self)
            console.log("> " + (`${username} left` + (!config.flags.singleChannelMode ? ` channel ${channel.channel}` : "")).part);
    });

if (config.flags.showChatMessages)
    client.on('chat', (channel, userstate, message, self) => {
        if (config.flags.showSelf || !self)
            console.log(`> ${userstate['display-name'].chat}` + (!config.flags.singleChannelMode ? `@${channel.channel}` : "") + `: ${message}`);
    });

if (config.flags.singleChannelMode && config.flags.clearConsole)
    client.on('clearchat', () => process.stdout.write('\x1Bc'));

if (config.flags.showHost)
    client.on('hosted', (channel, username, viewerCount, autohost) => console.log(`> ${username.cyan} started hosting ` + (!config.flags.singleChannelMode ? channel.channel : "your channel") + ` with ${viewerCount} Viewers!` + (autohost ? " (autohost)" : "")));

if (config.flags.showCheer)
    client.on('cheer', (channel, userstate, message) => console.log("> " + (`${userstate['display-name']} cheered` + (!config.flags.singleChannelMode ? ` on ${channel.channel}` : "") + "!" + (config.flags.includeCheerMessage ? ` Message: ${message}` : ""))).money);

if (config.flags.showSubscribtion)
    client.on('subscription', (channel, username, method, message, userstate) => console.log("> " + (`${username} subscribed` + (!config.flags.singleChannelMode ? ` on ${channel.channel}` : "") + "!" + (config.flags.includeSubscriptionMessage ? ` Message: ${message}` : ""))).money);

if (config.flags.showResubscribtion)
    client.on('resub', (channel, username, months, message, userstate, methods) => console.log("> " + (`${username} re-subscribed for ${months} months` + (!config.flags.singleChannelMode ? ` on ${channel.channel}` : "") + "!" + (config.flags.includeResubscriptionMessage ? ` Message: ${message}` : ""))).money);


if (config.flags.debug) {
    client.on('connecting', (address, port) => console.log(`Connecting to ${address}:${port}...`));
    client.on('connected', (address, port) => console.log(`Connected to ${address}:${port}!`));
    client.on('disconnected', (reason) => console.log(`Disconnected: ${reason}`));
    client.on('reconnect', () => console.log("Reconnecting..."));
}

console.log(`Twitch Chat Alerts v${package.version} by ${package.author}`.underline);

client.connect();