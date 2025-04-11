const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please Write a Task");
    return;
  }

  const li = document.createElement("li");
  li.className = "flex justify-between items-center bg-gray-50 px-4 py-2 rounded shadow-sm";

  li.innerHTML = `
    <label class="flex items-center gap-2">
      <input type="checkbox" class="task-checkbox">
      <span class="task-text text-gray-800">${task}</span>
    </label>
    <div class="flex gap-2">
      <span class="edit-btn text-blue-600 cursor-pointer hover:underline">Edit</span>
      <span class="delete-btn text-red-500 cursor-pointer hover:underline">Delete</span>
    </div>
  `;

  listContainer.appendChild(li);
  inputBox.value = "";

  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("label span");
  const deleteBtn = li.querySelector(".delete-btn");

  checkbox.addEventListener("click", function () {
    li.classList.toggle("line-through", checkbox.checked);
    li.classList.toggle("text-gray-400", checkbox.checked);
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update != null) {
      taskSpan.textContent = update;
      checkbox.checked = false;
      li.classList.remove("line-through", "text-gray-400");
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });

  updateCounters();
}

inputBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function updateCounters() {
  const completedTasks = document.querySelectorAll(".line-through").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.line-through)").length;
  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}
