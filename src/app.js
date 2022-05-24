import tmi from 'tmi.js';
import {driverQuiz, iRacingQuiz, teamsQuiz, tracksQuiz} from './quiz.js';
import settings from "../settings.json";
import cller from "tmi.js/lib/commands";

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

client.connect().catch(console.error);
client.on('message', (channel, userstate, message, self) => {
  let questionsAnsered = false;
  let pointsAdded = 0;
  let quizStarted = false;
  if (self) return;
  client.say(channel, `@${userstate.username}, 'Hello!'`);
  if(!quizStarted) {
    if (message === "!driverQuiz" || quizStarted) {
      quizStarted = true;
      pointsAdded = driverQuiz(message);
    }
    if (message === "!teamsQuiz" || quizStarted) {
      quizStarted = true;
      pointsAdded = teamsQuiz(message)
    }
    if (message === "!tracksQuiz" || quizStarted) {
      quizStarted = true;
      pointsAdded = tracksQuiz(message)
    }
    if (message === "!irQuiz" || quizStarted) {
      quizStarted = true;
      pointsAdded = iRacingQuiz(message)
    }
    if (pointsAdded !== 0) {
      questionsAnsered = true;
    }
  }
  if(questionsAnsered){
    client.say(channel, `@${userstate.username}, 'GG!'`);
    client.say(channel,`"!add points @${userstate.username} @${pointsAdded}"` )
    questionsAnsered = false;
    pointsAdded = 0;
    quizStarted = false;
  }
});
