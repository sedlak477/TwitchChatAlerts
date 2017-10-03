# Twitch Chat Alerts

A very simple application to get notified of basic Twitch chat events.

## Features

* Monitor multiple Twitch chats at the same time
* Read chat messages from any number of channels
* Receive notifications on:
  * somebody hosting a channel
  * somebody cheering on a channel
  * somebody (re)subscribing to a channel
  * somebody joining or leaving a channel
* Single channel mode for only montioring one channel with cleaner output

## Config

Just add a `config.json` file in the root directory and set the following settings:

* `channels` - Join your own stream chat by prefixing your all lowercase Twitch username with a '#'. eg. #sedlak4777. You can join other channels too
* `flags` - Flags for configuring different kind of behaviour
  * `showChatMessages` - Output chat messages
  * `showSelf` - Also show your own actions (chat messages, join, leave, etc.)
  * `showHost` - Display a message if somebody started  hosting a channel
  * `showCheer` - Display a message if somebody cheered on a channel
  * `showTimestamp` - Add a timestamp at every action
  * `includeCheerMessage` - Also output the included cheer message
  * `showSubscription` - Display a message if somebody subscribed to a channel
  * `includeSubscriptionMessage` - Also output the included subscription message
  * `showResubscription` - Display a message if somebody resubscribed to a channel
  * `includeResubscriptionMessage` - Also output the included resubscription message
  * `showJoin` - Display a message if somebody joins a channel (has a 30-60 seconds delay because of Twitch API limitations)
  * `showPart` - Display a message if somebody parts (leaves) from a channel (has a 30-60 seconds delay because of Twitch API limitations)
  * `clearConsole` - Also clear the console if the Twitch chat got cleared. (only in single channel mode)
  * `debug` - Enable additional debug log
  * `singleChannelMode` - Only join one channel and don't output channel name on actions
* `timestampFormat` - Format of the timestamp. For more details check out [node-datetime](https://www.npmjs.com/package/node-datetime#formatformat-string)

### Template
```json
{
    "channels": [
        "#YOUR_USERNAME"
    ],
    "flags": {
        "showChatMessages": true,
        "showSelf": true,
        "showHost": true,
        "showCheer": true,
        "includeCheerMessage": true,
        "showSubscription": true,
        "includeSubscriptionMessage": true,
        "showResubscription": true,
        "includeResubscriptionMessage": true,
        "showJoin": true,
        "showPart": true,
        "clearConsole": false,
        "debug": false,
        "singleChannelMode": true
    }
}
```

To disable colors pass `--no-color` as a command line argument.

## License
MIT