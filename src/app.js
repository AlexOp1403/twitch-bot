import tmi from 'tmi.js';
import {questionQuiz, questionAnswered, setQuestionAnswered, getQuizStarted} from './quiz.js';
import settings from "../settings.json";

let currentChannel;
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
    pointsAdded = questionQuiz(message);
  }

  if(!getQuizStarted()){
    quizStarted = false;
  }

  if(questionAnswered){
    client.say(channel, `@${userstate.username}, GG! Du hast ${pointsAdded} Punkte erreicht!`);
    client.say(channel,`!addPoints ${userstate.username} ${pointsAdded}` )
    setQuestionAnswered(false);
    pointsAdded = 0;
    quizStarted = false;
  }
});

export function botMessage(message){
  client.say(currentChannel, `${message}`);
}