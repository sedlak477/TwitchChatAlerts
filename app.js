const tmi = require('tmi.js');
const colors = require('colors');

const config = require("./config.json");
const package = require("./package.json");

if (config.channels.length > 1 && config.flags.singleChannelMode) {
    console.error("Can't join multiple channels in singleChannelMode!".red);
    process.exit(0xFF03D1);  // Random error number, doesn't have any meaning
}

let client = tmi.client({
    identity: {
        username: config.auth.username,
        password: config.auth.oauth
    },
    connection: {
        reconnect: true,
        secure: true
    },
    channels: config.channels
});

client.on('join', (channel, username, self) => {
	if (config.flags.showSelf || !self)
		console.log(`> ${username.green} joined` + (!config.flags.singleChannelMode ? ` channel ${channel.yellow}` : ""));
});

client.on('part', (channel, username, self) => {
	if (config.flags.showSelf || !self)
		console.log(`> ${username.red} left` + (!config.flags.singleChannelMode ? ` channel ${channel.yellow}` : ""));
});

client.on('chat', (channel, userstate, message, self) => {
	if (config.flags.showChatMessages && (config.flags.showSelf || !self))
        console.log(`> ${userstate['display-name'].grey}` + (!config.flags.singleChannelMode ? `@${channel.yellow}` : "") + `: ${message}`);
});

client.on('clearchat', () => {
    if (config.flags.singleChannelMode && config.flags.clearConsole)
        process.stdout.write('\x1Bc');
});

if (config.flags.debug) {
    client.on('connecting', (address, port) => console.log(`Connecting to ${address}:${port}...`));
    client.on('connected', (address, port) => console.log(`Connected to ${address}:${port}!`));
    client.on('disconnected', (reason) => console.log(`Disconnected: ${reason}`));
    client.on('reconnect', () => console.log("Reconnecting..."));
}

console.log(`Twitch Chat Alerts v${package.version} by ${package.author}`.rainbow);

client.connect();