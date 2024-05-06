//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;

//Questions and Options array

const quizArray = [
    {
        id: "0",
        question: "What does the 'box-sizing' property in CSS3 do?",
        options: ["Determines the alignment of elements within a box", "Specifies whether an element's padding and border should be included in its total width and height", "Defines the shadow effect around an element", "Sets the opacity level of an element"],
        correct: "Specifies whether an element's padding and border should be included in its total width and height",
    },
    {
        id: "1",
        question: "What is the purpose of CSS3 media queries?",
        options: ["They define animations for elements on a web page", "They allow for responsive design by applying different styles based on the device's characteristics", "They control the order in which elements are displayed on a page", "They specify the font family to be used in different sections of a webpage"],
        correct: "They allow for responsive design by applying different styles based on the device's characteristics",
    },
    {
        id: "2",
        question: "Which tag is used to define an unordered list in HTML?",
        options: [" < list >", "< ol >", "< ul >", "< dl >"],
        correct: "< ul >",
    },
    {
        id: "3",
        question: "Which tag is used to define a table row in HTML?",
        options: ["< tr >", "< td >", "< th >", "< table >"],
        correct: "< tr >",
    },
    {
        id: "4",
        question: "Which of the following is the correct HTML element for inserting a line break?",
        options: ["< nl >", "< linebreak >", "< break >", "< br >"],
        correct: "< br >",
    },
    {
        id: "5",
        question: "Which attribute is used to specify that an input field must be filled out in HTML?",
        options: ["< required >", "< fill >", "< validate >", "< mandatory >"],
        correct: "< required >",
    }, {
        id: "6",
        question: "Which HTML element is used to define the text size?",
        options: ["< size >", "< font >", "< text >", " < fontsize >"],
        correct: "< font >",
    },
    {
        id: "7",
        question: "Which tag is used to define the header of a document or a section in HTML?",
        options: [" < header >", "< heading >", "< h1 >", "< head >"],
        correct: "< h1 >",
    },
    {
        id: "8",
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        options: ["src", "alt", "title", "href"],
        correct: "alt",
    },
    {
        id: "9",
        question: "Which HTML element is used for defining the structure of an HTML document, including headings and paragraphs?",
        options: ["< div >", "< section >", "< header >", "< body >"],
        correct: "< body >",
    },
    {
        id: "10",
        question: "Which HTML element is used for creating a table row?",
        options: ["< td >", "< th >", "< tr >", "< table-row >"],
        correct: "< tr >",
    },
    {
        id: "11",
        question: "Which HTML element is used to define important text?",
        options: ["< strong >", "< important >", "< bold >", "< em >"],
        correct: "< strong >",
    },
    {
        id: "12",
        question: "Which HTML attribute specifies the URL of the image to be displayed in an <img> tag?",
        options: ["url", "image", "src", "link"],
        correct: "src",
    },
    {
        id: "13",
        question: "Which HTML attribute is used to define inline styles?",
        options: ["style", "css", "inline", "class"],
        correct: "style",
    },
    {
        id: "14",
        question: "Which HTML tag is used to define a paragraph?",
        options: ["< p >", "< para >", "< paragraph >", "< text >"],
        correct: "< p >",
    },
    {
        id: "15",
        question: "Which HTML element is used to define the title of a document, shown in the browser's title bar or on the page's tab?",
        options: ["< header >", "< title >", "< head >", "< h1 >"],
        correct: "< title >",
    },
    {
        id: "16",
        question: "What is the correct HTML element for inserting a horizontal line?",
        options: ["< line >", "< hr >", "< horizontal >", "< linebreak >"],
        correct: "< hr >",
    },
    {
        id: "17",
        question: "Which HTML element is used to define a dropdown list?",
        options: ["< select >", "< dropdown >", "< list >", "< options >"],
        correct: "< select >",
    },
    {
        id: "18",
        question: "What does the < canvas > element in HTML5 offer?",
        options: ["Drawing graphics", " Playing audio", "Embedding videos", "< options >"],
        correct: "Drawing graphics",
    },
    {
        id: "19",
        question: "Which HTML tag is used to define an inline frame, or a nested browsing context?",
        options: ["< frame >", "< iframe >", "< inlineframe >", "< embedframe >"],
        correct: "< iframe >",
    },
    {
        id: "20",
        question: "Which HTML tag is used to define a clickable button?",
        options: ["< button >", "< click >", "< input type=button >", "< btn >"],
        correct: "< button >",
    },
    {
        id: "21",
        question: "Which HTML element is used for specifying a caption or title for an element, such as a table or figure?",
        options: ["< caption >", "< title >", "< label >", "< subtitle >"],
        correct: "< caption >",
    },
    {
        id: "22",
        question: "Which HTML element is used to define the text direction?",
        options: ["< rtl >", "< dir >", "< text >", "< bdo >"],
        correct: "< bdo >",
    },
    {
        id: "23",
        question: "What does the HTML tag < canvas > provide?",
        options: ["A container for SVG graphics", "A container for bitmap images", "A container for drawing graphics, like lines, circles, and rectangles, using JavaScript", "A container for displaying 3D graphics"],
        correct: "A container for drawing graphics, like lines, circles, and rectangles, using JavaScript",
    },
    {
        id: "24",
        question: "Which HTML tag is used for displaying the definition of a term?",
        options: ["< description >", "< define >", "< def >", "< dt >" ],
        correct: "A container for drawing graphics, like lines, circles, and rectangles, using JavaScript",
    },
];

//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});

//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + questionCount;
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Question";
            //display quiz
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);

//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1500);
};

//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};

//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");

    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount++;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }

    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}

//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};