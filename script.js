

const database1 = [ 
    {
        question : "How many members are there in i-dle?",
        options : ["1", "3", "5", "7"],
        answer : "5"
    },

    {
        question : "What was i-dle's first song?",
        options : ["Latata", "Oh My God", "Chain", "Queencard"],
        answer : "Latata"
    },

    {
        question : "What was i-dle's title track for their album, We Are?",
        options : ["Love Tease", "Girlfriend", "Chain", "Good Thing"],
        answer : "Good Thing"
    },

    {
        question : "Who cannot speak at least basic chinese",
        options : ["Yuqi", "Soyeon", "Minnie", "Shuhua"],
        answer : "Soyeon"
    },

    {
        question : "What is their most popular song on Spotify",
        options : ["Tomboy", "Nxde", "Super Lady", "Queencard"],
        answer : "Queencard"
    },
];

const DropDown = document.getElementById("dropdown");
const StartButton= document.getElementById("startbtn");
const TimerLabel = document.getElementById("timerlabel");
const QuestionLabel = document.getElementById("question");
const optioncontainer = document.getElementById ("optionbuttons");
const scorelabel = document.getElementById ("scorelabel");
const Feedbacklabel = document.getElementById("feedbacklabel");
const progressbar = document.getElementById("progress-bar-fill");
const Bgmselector = document.getElementById("bgm-selector")
const MusicBtn = document.getElementById("Music-button")


let Currentsong = null;
let Ismusicplaying = false;
MusicBtn.textContent= "🔇Music OFF"

Bgmselector.addEventListener("change", () => {
    const Selectedsong = Bgmselector.value
    if (!Selectedsong) return;

    if(Currentsong)
    {
        Currentsong.pause();
        Currentsong.currentTime = 0;
    }

    Currentsong=new Audio(Selectedsong);
    Currentsong.loop=true;
    Currentsong.volume=0.2;
    Currentsong.play();
    Ismusicplaying = true;
    MusicBtn.textContent = "🔈 Music ON";
    
})

MusicBtn.addEventListener("click", () => {
    if(Ismusicplaying)
    {
        Currentsong.pause();
        MusicBtn.textContent= "🔇 Music OFF"
        Ismusicplaying = false
    } else {
        Currentsong.play();
        MusicBtn.textContent = "🔈 Music ON";
        Ismusicplaying = true;
    }
});


StartButton.addEventListener('click', Startquiz)


let timer;
let question_index = 0;
let score = 0;


function Startquiz()
{
    TimerLabel.textContent = 15
    DropDown.style.display='none';
    StartButton.style.display='none';
    loadquestion();
}

function loadquestion()
{
    if (question_index < database1.length)
    {
        TimerLabel.textContent = 15
        Feedbacklabel.textContent = ""
        const CurrentQuestionSet = database1[question_index];
        QuestionLabel.textContent = CurrentQuestionSet.question;
        progressbar.style.width =`${((question_index + 1) / database1.length) * 100}%`;
        optioncontainer.innerHTML = '';

        CurrentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button')
            button.textContent = item;
            button.classList.add('option-btn')
            optioncontainer.appendChild(button);

            button.addEventListener('click', () => {
                DisableAllOptionButtons();
                CheckAnswer(item);
            });
        });

        timer = setInterval (() => {
            TimerLabel.textContent = parseInt(TimerLabel.textContent) -1;
            if(parseInt(TimerLabel.textContent)===0)
            {
                clearInterval(timer)
                ShowFeedback (null);
            }
        }, 1000);
    } else 
    {
        Endquiz();
    }
}

function Endquiz()
{
    QuestionLabel.textContent = "Hooray, quiz has ended!";
    optioncontainer.style.display = 'none';
    Feedbacklabel.style.display = 'none'
    TimerLabel.textContent = '🥳'
}

function DisableAllOptionButtons()
{
    const all_option_buttons = document.querySelectorAll('.option-btn');
    all_option_buttons.forEach(button =>{
        button.disabled = true;
    });
}


function CheckAnswer(item)
{
    const actual_answer = database1[question_index].answer;
    if(item === actual_answer) 
    {
        score = score + 1;
        
    }

    scorelabel.textContent = `You scored ${score} points`;
    clearInterval(timer);
    ShowFeedback(item);
}
function ShowFeedback(item)
{
    const CurrentQuestionSet = database1[question_index];
    let message = "";

    if(item === CurrentQuestionSet.answer)

    {   
        message="Correct! 1 point goes to you.";
    } else if (item== null)
    {
        message="Time's up!";
    } else
    {
        message= `Incorrect! The correct answer was ${CurrentQuestionSet.answer}`;
    }

    Feedbacklabel.textContent = message + "please wait for the next question to load"

    setTimeout (()=> {
        question_index=question_index+1;
        loadquestion();
    },2000);
}