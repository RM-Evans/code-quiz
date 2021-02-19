
// document.addEventListener('DOMContentLoaded', ...
window.addEventListener('load', onPageReady);

// elements in the DOM
let questionNumber, questionBody, questionOptions, startQuiz, timer, saveScoreBtn


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
const scores = []

// TODO: read from local storage; if exists, iterate and add each score


// find all our elements on the page, and hook up the buttons we know about
function onPageReady() {
    questionNumber = document.getElementById("questionNumber")
    questionBody = document.getElementById("questionBody")
    questionOptions = document.getElementById("questionOptions")

    saveScoreBtn = document.getElementById("saveScore")
    saveScoreBtn.addEventListener("click", onSaveScore)

    timer = document.getElementById("timer")


    startQuiz = document.getElementById("startQuiz")

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
        alert('You lose. Loser')
        currentQuestion = null
        showSection('review')
    } else {
        timeleft--;
        timer.innerHTML = timeleft
        //print score in <h1>!!!
        document.getElementById('printTimerResult').textContent = timer.innerHTML
    }


};

setInterval(onEverySecond, 1000)

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
    console.log(scores);
    const initials = document.getElementById('initials').value
    //alert(initials)
    showSection("scores")

    // create some sort of array
    scores.push({
        initials: initials,
        score: timeleft
    })
    //format data to add it to local storage as a string
    // // TODO: save `scores` to local storage
    let scoreData = JSON.stringify(scores)
    //console.log(scores, scoreData)
    localStorage.setItem("scores", scoreData)

    // TODO: sort scores

    // TODO: update DOM
    //get items from storage by calling the key
    //json parse?


        let scoreLoc = JSON.parse(localStorage.getItem("scores"))

        for(let i = 0; i < scoreLoc.length; i++) {
            let scoreList = document.querySelector('ol')
            let scoreItem = document.createElement('li')
                scoreItem.textContent = scores[]
                scoreList.appendChild(scoreItem)
            console.log("scoreLoc.scores")
            
        }

    // let scoreLoc = window.localStorage.getItem("scores")
    // scoreLoc = JSON.parse(scoreLoc) 

    
    //console.log(scoreLoc["scores"]);

    //create list items under #scoreslist

    //let (scoreListItems) {
     //   document.createElement
    //}
    
    //console.log(scoreData)

    
    
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
