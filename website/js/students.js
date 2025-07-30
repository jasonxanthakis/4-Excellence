// const API_URL = 'http://localhost:3000/'

// document.addEventListener('DOMContentLoaded', function () {
//   const homeworkList = document.querySelector('.card-title:contains("My Homework")')?.nextElementSibling;
//   if (!homeworkList) return;

//   const addHomeworkBtn = document.createElement('button');
//   addHomeworkBtn.textContent = 'Add Homework';
//   addHomeworkBtn.classList.add('btn', 'btn-success');
//   homeworkList.parentElement.appendChild(addHomeworkBtn);

//   addHomeworkBtn.addEventListener('click', () => {
//     const newItemText = prompt('Enter the homework title and due date (e.g. History Quiz – Due: Aug 10):');
//     if (newItemText) {
//       const li = document.createElement('li');
//       li.classList.add('list-group-item');
//       li.textContent = newItemText;
//       homeworkList.appendChild(li);
//     }
//   });

//   homeworkList.addEventListener('click', (e) => {
//     if (e.target.tagName === 'LI') {
//       e.target.classList.toggle('text-decoration-line-through');
//       e.target.classList.toggle('text-success');
//     }
//   });


//   const achievements = document.querySelectorAll('.card-title:contains("My Achievements") + ul > li');
//   achievements.forEach(item => {
//     item.addEventListener('mouseenter', () => {
//       item.style.backgroundColor = '#59c068ff';
//     });
//     item.addEventListener('mouseleave', () => {
//       item.style.backgroundColor = '#d92e1fff';
//     });
//   });
// });

document.getElementById('homebtn').addEventListener('click', async () => {
  window.location.assign("students.html");
});

document.getElementById('logoutbtn').addEventListener('click', () => {
  localStorage.removeItem('userID');
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  window.location.assign('login.html');
});

async function getUserDetails() {
  const API_URL = 'http://localhost:3000';

  let url = API_URL + `/user/student/${localStorage.getItem("userID")}/stats`;

  const response = await getAll(url);
  const stats = await response.json();

  document.getElementById("geography-best").textContent = "Geography Quiz – " + stats[0].best_score + " / 10";
  document.getElementById("history-best").textContent = "History Quiz – " + stats[1].best_score + " / 10";
  document.getElementById("geography-last").textContent = "Geography Quiz – " + stats[0].last_score + " / 10";
  document.getElementById("history-last").textContent = "History Quiz – " + stats[1].last_score + " / 10";
}

// get one user's stats
async function getAll(url) {
    const options = {
        method: "GET",
        headers: {
            "Authorization": localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    }

    const resp = await fetch(url, options);

    return resp;
};

// get user info or get all classes owned by 1 teacher
async function getAllById(url, id) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    url = url + id;

    const resp = await fetch(url, options);

    return resp;
};

getUserDetails();