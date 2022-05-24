import tmi from 'tmi.js';
import settings from "../settings.json";

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: settings.username,
    password: settings.oauth_token,
  },
  channels: settings.channels,
});

client.connect();
client.on('message', (channel, userstate, message, self) => {
  if (self) return;
  client.say(channel, `@${userstate.username}, 'Hello!'`);
});
