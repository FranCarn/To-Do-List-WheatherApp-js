const taskContent = document.getElementById("taskContent");
const btnSendTask = document.getElementById("btnSendTask");
const addTask = document.getElementById("addTask");
const btnDeleteAllTasks = document.getElementById("deleteAllTask");
const SaveDataOnLocalStorage = "taskList";
let tasks = [];

// Create a Task
function sendTask() {
  const taskInfo = addTask.value;
  if (!taskInfo) return;
  tasks.push({
    taskInfo: taskInfo,
    terminada: false,
  });
  addTask.value = "";
  saveTaskInfo();
  refreshTaskInfo();
}

// Detele All Tasks

function deleteAllTasks() {
  if (tasks.length === 0) return;
  tasks = [];
  saveTaskInfo();
  refreshTaskInfo();
}

const getTaskInfo = () => {
  const list = JSON.parse(localStorage.getItem(SaveDataOnLocalStorage));
  if (list) return list;
  return [];
};

const saveTaskInfo = () => {
  localStorage.setItem(SaveDataOnLocalStorage, JSON.stringify(tasks));
};

const refreshTaskInfo = () => {
  taskContent.innerHTML = "";
  tasks.forEach((taskInfo, i) => {
    const deleteTask = document.createElement("button");
    deleteTask.classList.add("deleteTask");
    deleteTask.innerHTML = '<i class="fa-solid fa-trash-can fa-lg"></i>';
    deleteTask.title = "Delete task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.title = "Task done";

    const span = document.createElement("span");
    span.textContent = taskInfo.taskInfo;
    const li = document.createElement("li");
    if (taskInfo.done) {
      checkbox.checked = true;
      span.classList.add("done");
    }

    // Listeners
    deleteTask.addEventListener("click", () => {
      tasks.splice(i, 1);
      saveTaskInfo(tasks);
      refreshTaskInfo();
    });

    checkbox.addEventListener("click", (event) => {
      if (event.target.checked) tasks[i].done = true;
      else tasks[i].done = false;
      saveTaskInfo(tasks);
      refreshTaskInfo();
    });

    // Append to DOM
    li.appendChild(span).classList.add("textTask");
    li.appendChild(checkbox).classList.add("taskDone");
    li.appendChild(deleteTask);
    taskContent.appendChild(li).classList.add("listTask");
  });
};

// Listeneers
btnDeleteAllTasks.addEventListener("click", () => {
  deleteAllTasks();
});

btnSendTask.addEventListener("click", () => {
  sendTask();
});

addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendTask();
});

tasks = getTaskInfo();
refreshTaskInfo();
