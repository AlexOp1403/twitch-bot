import questions from "../questions.json";
import fs from 'fs';
import {botMessage} from "./app";

export let currentQuestion;
export let quizStarted = false;
export let questionAnswered = false;

export function setQuestionAnswered(value) {
    questionAnswered = value;
}

export function getQuizStarted() {
    return quizStarted
}

export function questionQuiz(userMessage){
    if(!quizStarted){
        currentQuestion = questions.quiz[Math.floor(Math.random()*questions.quiz.length)]
        quiz(currentQuestion)
    }
    scanMessage(userMessage)
    if(questionAnswered){
        return Math.ceil(1000 / currentQuestion.alreadyAnswered)
    }
    return 0
}

function scanMessage(message){
    if(message.toLowerCase() === currentQuestion.answer.toLowerCase()) {
        questionAnswered = true
        quizStarted = false
        currentQuestion.alreadyAnswered++
        fs.writeFile('questions.json', JSON.stringify(questions), (err) => {
            if (err) throw err;
        });
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
        quizStarted = false
    }, 20000);
}
