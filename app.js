
// document.addEventListener('DOMContentLoaded', ...
window.addEventListener('load', onPageReady);

// elements in the DOM
let questionNumber, questionBody, questionOptions, sections, startQuiz, timer

// the state of our game
const questions = []
let currentQuestion = null
let timeleft = null


setInterval(onEverySecond, 1000)


// find all our elements on the page, and hook up the buttons we know about
function onPageReady(){
    questionNumber = document.getElementById("questionNumber")
    questionBody = document.getElementById("questionBody")
    questionOptions = document.getElementById("questionOptions")
    
    timer = document.getElementById("timer")
    
    
    startQuiz = document.getElementById("startQuiz")

    sections = document.getElementsByTagName('section')

    startQuiz.addEventListener('click', onSetupQuiz)
    questionOptions.addEventListener('click', onOptionPress)

    // TODO: how do we find the dynamic button clicks? JQUERY ftw
}

function onEverySecond(){
    // if there's no question, the quiz isn't running
    if( currentQuestion === null ){
        return
    }

    if( !timeleft || timeleft < 1 ){
        alert('You lose. Loser')
        currentQuestion = null
        showSection('review')
    }else{
        timeleft = timeleft - 1
        timer.innerHTML = timeleft
    }


    
}


// setup our array of question
function onSetupQuiz(){
    questions.length = 0

    for(let i = 0; i < 5; i++){
        const q = {
            question: "How to play? " + i,
            options: ["Good", "Bad", "Ugly"],
            answer: "Ugly"
        }
        questions.push(q)
    }
    ntimeleft = 60
    loadNextQuestion()
    showSection('question')
}

// get the next question 
function loadNextQuestion(){
    // if there are questions left to answer, do the question
    if( questions.length > 0 ){
        // take the "first" question in the array
        currentQuestion = questions.shift()
        
        // how do we set question number?
        
        questionBody.innerHTML = currentQuestion.question
        
        let html = ""
        for(let opt of currentQuestion.options ){
            html = html + '<li><button value="' + opt + '">' + opt + "</button></li>"
        }
        questionOptions.innerHTML = html
    }else {
        currentQuestion = null
        // calculate score? 
        showSection('review')
    }
}

function onOptionPress(e){
    // only handle an option (button)
    if( e.target.tagName !== 'BUTTON' ){
        return 
    }

    // if we get to here, they must have clicked a button!!!



    const correct = currentQuestion.answer === e.target.value
    if( correct ){
        loadNextQuestion()
    } else {
        timeLeft = timeLeft - 5
        alert('You chose poorly')
    }
}


function showSection(name){
    for(let section of sections){
        if( section.id === name ){
            section.className = ''
        }else{
            section.className = 'hidden'
        }
    }

}
