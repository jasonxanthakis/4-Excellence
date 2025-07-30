document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-class-form");
  const classList = document.getElementById("class-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newClass = document.getElementById("new-class").value.trim();
    if (newClass !== "") {
      const li = document.createElement("li");
      li.textContent = newClass;
      li.classList.add("list-group-item");
      classList.appendChild(li);
      form.reset();
    }
  });

//   const work = document.getElementById("homeworkChart").getContext("2d");
//   new Chart(work, {
//     type: "pie",
//     data: {
//       labels: ["Completed", "Not Attempted"],
//       datasets: [{
//         label: "Homework",
//         data: [ , ], 
//         backgroundColor: ["#4caf50", "#363ff4ff"]
//       }]
//     },
//   });
});


//get stats from students
// pull up top ten students