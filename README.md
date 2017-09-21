# Twitch Chat Alerts

A very simple application to get notified of basic Twitch chat events.

## Config

Just add a `config.json` file in the root directory and set the following settings:

* `auth` - Authentication related data
  * `username` - Your Twtich username, might needs to be all lowercase, not tested
  * `oauth` - Twitch API OAuth token with 'oauth:' prefix. Simple way to get one is here: http://twitchapps.com/tmi/
* `channels` - Join your own stream chat by prefixing your all lowercase Twitch username with a '#'. eg. #sedlak4777. You can join other channels too
* `flags` - Flags for configuring different kind of behaviour
  * `singleChannelMode` - Only join one channel but don't output channel name on actions
  * `showChatMessages` - Output chat messages
  * `showSelf` - Also show your own actions (chat messages, join, leave, etc.)
  * `clearConsole` - Also clear the console if the Twitch chat got cleared. (only in single channel mode)
  * `debug` - Enable additional debug log

To disable colors pass `--no-color` as a command line argument.

## License
MIT