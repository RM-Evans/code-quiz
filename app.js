
// document.addEventListener('DOMContentLoaded', ...
window.addEventListener('load', onPageReady);

// elements in the DOM
let questionNumber, 
    questionBody, 
    questionOptions, 
    startQuiz, 
    timer, 
    saveScoreBtn,
    yourScoreEl,
    viewTopScoresEl,
    scoreListEl


// the state of our game
let currentQuestionNumber = -1 // we have to start BEFORE our first question because we currentQuestionNumber++ when we start
const questions = [
    {
        question: "When should I use const?",
        options: ["always", "when I dont want the variable to change", "when I want the variable to change"],
        answer: "when I dont want the variable to change"
    },
    {
        question: "when I cant figure out how to debug something I ____.",
        options: ["cry into my keyboard", "persevere and try to find my answer in docs", "all of the above"],
        answer: "all of the above"
    },
    {
        question: "Math.floor does what?",
        options: ["returns the lowest number it can find", "returns the largest integer less than or equal to x", "rounds up a number"],
        answer: "returns the largest integer less than or equal to x"
    },
    {
        question: "what does a for loop do?",
        options: ["loops through a block of code a number of times", "tElLS yOu WhAt FoR!", "the same as an if statement"],
        answer: "loops through a block of code a number of times"
    }
];
let timeleft = null


let highScores // <----- this is the only thing I should use
loadScoresFromStorage()


function loadScoresFromStorage(){
    highScores = localStorage.getItem("scores")
    if( highScores ){
        highScores = JSON.parse(highScores)
    }

    // just in case local storage gave us something dangerous
    if( !Array.isArray(highScores) ){
        highScores = []
    }
}

function sortAndSaveScores(){
    // TODO sort
    highScores.sort(function(a, b){
        if( a.score < b.score ){
            return 1
        }
        if( a.score > b.score ){
            return -1
        }

        // if they're the same, use the initials
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#comparing_strings
        return a.initials.localeCompare(b.initials)
    })


    // save them to the browser locally
    localStorage.setItem("scores", JSON.stringify(highScores))

    // update the dom section accordingly
    syncScores()
}






// find all our elements on the page, and hook up the buttons we know about
function onPageReady() {
    //initialize
    questionNumber = document.getElementById("questionNumber")
    questionBody = document.getElementById("questionBody")
    questionOptions = document.getElementById("questionOptions")

    saveScoreBtn = document.getElementById("saveScore")
    saveScoreBtn.addEventListener("click", onSaveScore)

    timer = document.getElementById("timer")
    yourScoreEl = document.getElementById("printTimerResult")

    startQuiz = document.getElementById("startQuiz")
    viewTopScoresEl = document.getElementById("viewTopScores")
    

    viewTopScoresEl.addEventListener('click', onViewTopScores)
    scoreListEl = document.querySelector('ol')
    
    startQuiz.addEventListener('click', onSetupQuiz)
    questionOptions.addEventListener('click', onOptionPress)

    // TODO: how do we find the dynamic button clicks? JQUERY ftw
}

function onEverySecond() {
    //     // if there's no question, the quiz isn't running
    if (currentQuestionNumber < 0 || currentQuestionNumber >= questions.length) {
        return
    }

    if (!timeleft || timeleft < 1) {
        alert('You lose.')
        currentQuestionNumber = -1
        timeleft = null
        timer.innerHTML = ''
        showSection('welcome')
    } else {
        timeleft--;
        timer.innerHTML = timeleft
        //print score in <h1>!!!
        yourScoreEl.textContent = timer.innerHTML
    }


};

setInterval(onEverySecond, 1000)

function onViewTopScores(){
    syncScores()
    showSection('scores')
    // don't try to navigate the browser somewhere
    return false
}

// setup our array of question
function onSetupQuiz() {
    //questions.length = 0

    // for (let i = 0; i < 5; i++) {
    //     const q = {
    //         question: "How to play? " + i,
    //         options: ["Good", "Bad", "Ugly"],
    //         answer: "Ugly"
    //     }
    //     questions.push(q)
    // }
    timeleft = 60

    loadNextQuestion()
    showSection('question')
}

// get the next question 
function loadNextQuestion() {
    // if there are questions left to answer, do the question
    // if (questions.length > 0) { // since we no longer remove questions, this isn't valid


    currentQuestionNumber++
    if (currentQuestionNumber < questions.length) {

        // take the "first" question in the array
        // currentQuestion = questions.shift() // don't delete them anymore!
        // what array i want to use[is my iterator/place in array] = assign to variable to make life easier

        const currentQuestion = questions[currentQuestionNumber]

        // how do we set question number?
        //changing text inside the <p> with id of questionBody. namely our question

        questionBody.innerHTML = currentQuestion.question

        // // OPTION a: use nasty strings
        // let html = ""
        // for (let opt of currentQuestion.options) {
        //     html = html + '<li><button value="' + opt + '">' + opt + "</button></li>"
        // }
        // questionOptions.innerHTML = html


        // OPTION 2, use the dom to add element objects

        // first we have to empty out the <ul>
        while (questionOptions.hasChildNodes()) {
            questionOptions.removeChild(questionOptions.firstChild)
        }
        // now we create "objects" for each <li> and <button>
        for (let opt of currentQuestion.options) {
            const button = document.createElement("button")
            button.value = opt
            button.textContent = opt

            const li = document.createElement("li")
            li.appendChild(button)

            questionOptions.appendChild(li)
        }
    } else {
        // calculate score? 
        showSection('review')
    }
}

function onOptionPress(e) {
    // only handle an option (button)
    if (e.target.tagName !== 'BUTTON') {
        return
    }

    // if we get to here, they must have clicked a button!!!


    const currentQuestion = questions[currentQuestionNumber]

    const correct = currentQuestion.answer === e.target.value
    if (correct) {
        loadNextQuestion()
    } else {
        //remove time when you get it wrong and color button red
        timeleft = timeleft - 5
        //alert('You chose poorly')
        e.target.style = "background: red"
    }
}





function onSaveScore() {
    const initials = document.getElementById('initials').value
    
    // let storedScores = JSON.parse(localStorage.getItem("scores"))
    //solves is
    // if (!storedScores) {storedScores = []}

    // showSection("scores")
    //get items from storage by calling the key - if "get" not first, "set" will use its place in storage and overwrite it
    //json parse
    //debugger;
    // create some sort of array
    // const newScore = {
    //     initials: initials,
    //     score: timeleft
    // }


    // const updatedScores = [...storedScores, newScore];

    //format data to add it to local storage as a string
    // // TODO: save `scores` to local storage
    //scoreData = JSON.stringify(storedScores)


    highScores.push({
        initials,
        score: timeleft
    })

    sortAndSaveScores();
    showSection("scores")
}


function syncScores(){
    while (scoreListEl.hasChildNodes()) {
        scoreListEl.removeChild(scoreListEl.firstChild)
    }
    for (let i = 0; i < highScores.length; i++) {
        //isolate my values
        const myInit = highScores[i].initials
        const myScore = highScores[i].score
        //generate them
        const scoreItem = document.createElement('li')
        scoreItem.textContent = (myInit + " " + myScore)
        scoreListEl.appendChild(scoreItem)
    }
}

function showSection(name) {
    const sections = document.getElementsByTagName('section')
    for (let section of sections) {
        if (section.id === name) {
            section.className = ''
        } else {
            section.className = 'hidden'
        }
    }
}
