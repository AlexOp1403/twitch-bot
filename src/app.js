import tmi from 'tmi.js';
import {driverQuiz, iRacingQuiz, teamsQuiz, tracksQuiz} from './quiz.js';
import settings from "../settings.json";
let currentChannel;
let driverQuizStarted = false;
let teamsQuizStarted = false;
let tracksQuizStarted = false;
let iRacingQuizStarted = false;
let questionsAnswered = false;
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

  if (message === "!driverQuiz" && !quizStarted) {
    botMessage("Das Quiz startet!")
    driverQuizStarted = true;
  }
  console.log(driverQuizStarted)
  if(driverQuizStarted){
    driverQuiz(message);
  }

  if (message === "!teamsQuiz" && !quizStarted) {
    botMessage("Das Quiz startet!")
    teamsQuizStarted = true;
  }
  if(teamsQuizStarted)  tracksQuiz(message)

  if (message === "!tracksQuiz" && !quizStarted) {
    botMessage("Das Quiz startet!")
    tracksQuizStarted = true;
  }
  if(tracksQuizStarted)  tracksQuiz(message)

  if (message === "!irQuiz" && !quizStarted) {
    botMessage("Das Quiz startet!")
    iRacingQuizStarted = true;
  }
  if(iRacingQuizStarted)  iRacingQuiz(message)

  if(questionsAnswered){
    client.say(channel, `@${userstate.username}, 'GG!'`);
    client.say(channel,`"!addPoints @${userstate.username} @${pointsAdded}"` )
    questionsAnswered = false;
    pointsAdded = 0;
    quizStarted = false;
  }
});

export function botMessage(message){
  client.say(currentChannel, `${message}`);
}