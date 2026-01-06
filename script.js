const taskForm = document.getElementById("taskForm"); 
const taskList = document.getElementById("taskList");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const modeToggle = document.getElementById("modeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    const taskRow = document.createElement("div");
    taskRow.classList.add("task-row");

    const textDiv = document.createElement("div");
    textDiv.innerHTML = `<strong>${task.title}</strong><div>${task.description}</div>`;

    const iconDiv = document.createElement("div");
    iconDiv.className = "task-icons";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.title = "Mark as completed";
    checkbox.addEventListener("change", () => {
      tasks[index].completed = checkbox.checked;
      saveToLocalStorage();
      renderTasks();
    });

    const editBtn = document.createElement("button");
    editBtn.title = "Edit";
    editBtn.innerHTML = '<span class="material-icons">edit</span>';
    editBtn.addEventListener("click", () => {
      titleInput.value = task.title;
      descriptionInput.value = task.description;
      tasks.splice(index, 1);
      saveToLocalStorage();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.title = "Delete";
    deleteBtn.innerHTML = '<span class="material-icons">delete</span>';
    deleteBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this task?")) {
        tasks.splice(index, 1);
        saveToLocalStorage();
        renderTasks();
      }
    });

    iconDiv.appendChild(checkbox);
    iconDiv.appendChild(editBtn);
    iconDiv.appendChild(deleteBtn);

    taskRow.appendChild(textDiv);
    taskRow.appendChild(iconDiv);
    li.appendChild(taskRow);
    taskList.appendChild(li);
  });
}

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const desc = descriptionInput.value.trim();

  if (!title) {
    alert("Task title is required!");
    return;
  }

  tasks.push({ title, description: desc, completed: false });
  titleInput.value = "";
  descriptionInput.value = "";
  saveToLocalStorage();
  renderTasks();
});

// 🌙 Dark Mode
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    modeToggle.checked = true;
  } else {
    document.body.classList.add("light-mode");
  }
});

modeToggle.addEventListener("change", () => {
  if (modeToggle.checked) {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
});

renderTasks();
