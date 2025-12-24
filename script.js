const taskList = document.getElementById("taskList");
let filter = "all";

window.onload = loadTasks;

function addTask() {
  const text = taskInput.value.trim();
  const time = taskTime.value;

  if (!text) {
    alert("Please enter a task");
    return;
  }

  const tasks = getTasks();
  tasks.push({ text, time, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = "";
  taskTime.value = "";
  loadTasks();
}

function loadTasks() {
  taskList.innerHTML = "";
  let tasks = getTasks();

  if (filter === "active") tasks = tasks.filter(t => !t.completed);
  if (filter === "completed") tasks = tasks.filter(t => t.completed);

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div class="task-info">
        <strong>${task.text}</strong>
        <small>${task.time || ""}</small>
      </div>
      <div class="actions">
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function toggleTask(index) {
  const tasks = getTasks();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function editTask(index) {
  const tasks = getTasks();
  const newText = prompt("Edit task", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function filterTasks(type) {
  filter = type;
  loadTasks();
}

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}