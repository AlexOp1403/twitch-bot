import questions from "../questions.json";
import {botMessage, client} from "./app";
export let currentQuestion;
let questionAnswered = false;
let quizStarted = false;
export function driverQuiz(userMessage){
    if(!quizStarted){
        currentQuestion = questions.driver[Math.floor(Math.random()*questions.driver.length)]
        quiz(currentQuestion)
    }
    scanMessage(userMessage)
}

export function teamsQuiz(userMessage){
    currentQuestion = questions.teams[Math.random()*questions.length]
    if(!quizStarted) quiz(currentQuestion)
    scanMessage(userMessage)
}

export function tracksQuiz(userMessage){
    currentQuestion = questions.tracks[Math.random()*questions.length]
    if(!quizStarted) quiz(currentQuestion)
    scanMessage(userMessage)
}

export function iRacingQuiz(userMessage){
    currentQuestion = questions.iRacing[Math.random()*questions.length]
    if(!quizStarted) quiz(currentQuestion)
    scanMessage(userMessage)
}

function scanMessage(message){
    if(message.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        questionAnswered = true
        botMessage(`Korrekt: Es ist ${currentQuestion.answer}`)
    }
}

function quiz(){
    quizStarted = true
    console.log(currentQuestion)
    botMessage(`${currentQuestion.question}`);
    console.log("antwort: " + questionAnswered)
    let timer1;
    let timer2;
    let timer3;
    let timer4;
    if (!questionAnswered) {
        timer1 = setTimeout(function () {
            botMessage(`Tipp 1: ${currentQuestion.hint1}`);
        }, 5000);
    }
    if (!questionAnswered) {
        timer2 = setTimeout(function () {
            botMessage(`Tipp 2: ${currentQuestion.hint2}`);
        }, 10000);
    }
    if (!questionAnswered) {
        timer3 = setTimeout(function () {
            botMessage(`Tipp 3: ${currentQuestion.hint3}`);
        }, 15000);
    }
    if (!questionAnswered) {
        timer4 = setTimeout(function () {
            botMessage(`Lösung: Es ist ${currentQuestion.answer}`);
        }, 20000);
    }
}

if(questionAnswered) {
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
    clearTimeout(timer4);
}