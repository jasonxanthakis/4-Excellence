const API_URL = 'http://localhost:3000/'

document.addEventListener('DOMContentLoaded', function () {
  const homeworkList = document.querySelector('.card-title:contains("My Homework")')?.nextElementSibling;
  if (!homeworkList) return;

  const addHomeworkBtn = document.createElement('button');
  addHomeworkBtn.textContent = 'Add Homework';
  addHomeworkBtn.classList.add('btn', 'btn-success');
  homeworkList.parentElement.appendChild(addHomeworkBtn);

  addHomeworkBtn.addEventListener('click', () => {
    const newItemText = prompt('Enter the homework title and due date (e.g. History Quiz – Due: Aug 10):');
    if (newItemText) {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = newItemText;
      homeworkList.appendChild(li);
    }
  });

  homeworkList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('text-decoration-line-through');
      e.target.classList.toggle('text-success');
    }
  });


  const achievements = document.querySelectorAll('.card-title:contains("My Achievements") + ul > li');
  achievements.forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.backgroundColor = '#59c068ff';
    });
    item.addEventListener('mouseleave', () => {
      item.style.backgroundColor = '#d92e1fff';
    });
  });
});