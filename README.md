# Twitch Chat Alerts

A very simple application to get notified of basic Twitch chat events.

## Config

Just add a `config.json` file in the root directory and set the following settings:

* `auth` - Authentication related data
  * `username` - Your Twtich username, might needs to be all lowercase, not tested
  * `oauth` - Twitch API OAuth token with 'oauth:' prefix. Simple way to get one is here: http://twitchapps.com/tmi/
* `channels` - Join your own stream chat by prefixing your all lowercase Twitch username with a '#'. eg. #sedlak4777. You can join other channels too
* `flags` - Flags for configuring different kind of behaviour
  * `showChatMessages` - Output chat messages
  * `showSelf` - Also show your own actions (chat messages, join, leave, etc.)
  * `showHost` - Display a message if somebody started  hosting a channel
  * `showCheer` - Display a message if somebody cheered on a channel
  * `showCheer` - Also output the included cheer message
  * `showSubscription` - Display a message if somebody subscribed to a channel
  * `showCheer` - Also output the included subscription message
  * `showResubscription` - Display a message if somebody resubscribed to a channel
  * `showCheer` - Also output the included resubscription message
  * `clearConsole` - Also clear the console if the Twitch chat got cleared. (only in single channel mode)
  * `debug` - Enable additional debug log
  * `singleChannelMode` - Only join one channel and don't output channel name on actions

### Template
```json
{
    "auth": {
        "username": "YOUR_USERNAME",
        "oauth": "YOUR_OAUTH"
    },
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
        "clearConsole": false,
        "debug": false,
        "singleChannelMode": true
    }
}
```

To disable colors pass `--no-color` as a command line argument.

## License
MIT