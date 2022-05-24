import tmi from 'tmi.js';
import {questionQuiz, questionAnswered} from './quiz.js';
import settings from "../settings.json";

let currentChannel;
let driverQuizStarted = false;
let teamsQuizStarted = false;
let tracksQuizStarted = false;
let iRacingQuizStarted = false;
let pointsAdded = 0;
let quizStarted = false;

export const client = new tmi.Client({
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

client.connect().catch(console.error);
client.on('message', (channel, userstate, message, self) => {


  currentChannel = channel;
  if (self) return;

  if (message === "!quiz" && !quizStarted) {
    botMessage("Das Quiz startet!")
    quizStarted = true;
  }
  if(quizStarted){
    questionQuiz(message);
  }

  if(questionAnswered){
    client.say(channel, `@${userstate.username}, 'GG!'`);
    client.say(channel,`"!addPoints @${userstate.username} @${pointsAdded}"` )
    questionAnswered = false;
    pointsAdded = 0;
    quizStarted = false;

  }
});

export function botMessage(message){
  client.say(currentChannel, `${message}`);
}