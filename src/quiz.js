import questions from "../questions.json";
import {botMessage} from "./app";

export let currentQuestion;
let quizStarted = false;
export let questionAnswered;

export function questionQuiz(userMessage){
    if(!quizStarted){
        currentQuestion = questions.quiz[Math.floor(Math.random()*questions.quiz.length)]
        quiz(currentQuestion)
    }
    scanMessage(userMessage)
}

function scanMessage(message){
    if(message.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        questionAnswered = true
        botMessage(`Korrekt: Es ist ${currentQuestion.answer}`)
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
    }
}

let timer1;
let timer2;
let timer3;
let timer4;

function quiz(){
    timer1 = undefined;
    timer2 = undefined;
    timer3 = undefined;
    timer4 = undefined;
    quizStarted = true
    botMessage(`${currentQuestion.question}`);
    timer1 = setTimeout(function () {
        botMessage(`Tipp 1: ${currentQuestion.hint1}`);
    }, 5000);
    timer2 = setTimeout(function () {
        botMessage(`Tipp 2: ${currentQuestion.hint2}`);
    }, 10000);
    timer3 = setTimeout(function () {
        botMessage(`Tipp 3: ${currentQuestion.hint3}`);
    }, 15000);
    timer4 = setTimeout(function () {
        botMessage(`Lösung: Es ist ${currentQuestion.answer}`);
    }, 20000);
}
