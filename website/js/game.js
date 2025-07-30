const userAnswers = [];

document.getElementById('homebtn').addEventListener('click', async () => {
  // post a score of 0
  window.location.assign("students.html");
});

document.getElementById('logoutbtn').addEventListener('click', () => {
  localStorage.removeItem('userID');
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  window.location.assign('login.html');
});

function selectAnswer(button) {
  const buttons = document.querySelectorAll(".answer-box");

  if ([...buttons].some(btn => btn.classList.contains("selected"))) return;

  buttons.forEach(btn => {
    if (btn === button) {
      btn.classList.add("selected");
    } else {
      btn.disabled = true;
      btn.classList.add("disabled");
    }
  });

  const selectedAnswer = button.textContent.trim();
  userAnswers.push(selectedAnswer);

  // compare selected to question.answer
  // if match outline green, else outline red and outline answer as green

  // keep track of correct vs wrong answers

  // if reached question 10 and answered question 10 then POST score and go to game results

  console.log("User selected:", selectedAnswer);
}

async function startQuiz() {
  const API_URL = 'http://localhost:3000';

  const data = {
    username: username,
    password: password,
    is_teacher: is_teacher
  }

  // url = 

  // const response = await sendPostRequest(url, data); // get questions, post +1 to times_played
}

async function sendPostRequest(url, data) {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const resp = await fetch(url, options);

    return resp;
};