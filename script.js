// =========================
// THEME TOGGLE
// =========================

const themeBtn =
  document.getElementById("themeBtn");

if (themeBtn) {

  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("bg-black");
    document.body.classList.toggle("text-white");

    document.body.classList.toggle("bg-white");
    document.body.classList.toggle("text-black");

  });

}


// =========================
// TASK PLANNER
// =========================

const addTaskBtn =
  document.getElementById("addTaskBtn");

const decreaseTaskBtn =
  document.getElementById("decreaseTaskBtn");

const taskInput =
  document.getElementById("taskInput");

const taskList =
  document.getElementById("taskList");


// Add Task
if (addTaskBtn) {

  addTaskBtn.addEventListener("click", () => {

    const task =
      taskInput.value.trim();

    if (task === "") return;

    const li =
      document.createElement("li");

    li.className =
      "bg-black p-4 rounded-xl flex justify-between items-center";

    li.innerHTML = `

      <span>${task}</span>

      <button class="deleteTaskBtn bg-red-500 px-4 py-2 rounded-lg">
        Delete
      </button>

    `;

    // Delete Task
    li.querySelector(".deleteTaskBtn")
      .addEventListener("click", () => {

      li.remove();

      saveTasks();

      updateDashboard();

    });

    taskList.appendChild(li);

    saveTasks();

    updateDashboard();

    taskInput.value = "";

  });

}


// Save Tasks
function saveTasks() {

  localStorage.setItem(
    "tasks",
    taskList.innerHTML
  );

}


// Load Tasks
function loadTasks() {

  const savedTasks =
    localStorage.getItem("tasks");

  if (savedTasks) {

    taskList.innerHTML =
      savedTasks;

    reconnectTaskButtons();

  }

}


// Reconnect Buttons
function reconnectTaskButtons() {

  document.querySelectorAll(".deleteTaskBtn")
    .forEach(btn => {

    btn.addEventListener("click", (e) => {

      e.target.parentElement.remove();

      saveTasks();

      updateDashboard();

    });

  });

}


loadTasks();


// =========================
// POMODORO TIMER
// =========================

const timer =
  document.getElementById("timer");

const startBtn =
  document.getElementById("startBtn");

const pauseBtn =
  document.getElementById("pauseBtn");

const resetBtn =
  document.getElementById("resetBtn");

let timeLeft = 1500;

let timerInterval;


// Update Timer
function updateTimer() {

  const minutes =
    Math.floor(timeLeft / 60);

  let seconds =
    timeLeft % 60;

  seconds =
    seconds < 10
      ? "0" + seconds
      : seconds;

  timer.innerText =
    `${minutes}:${seconds}`;

}


updateTimer();


// Start
if (startBtn) {

  startBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    timerInterval =
      setInterval(() => {

      timeLeft--;

      updateTimer();

      if (timeLeft <= 0) {

        clearInterval(timerInterval);

        alert("Session Complete!");

      }

    }, 1000);

  });

}


// Pause
if (pauseBtn) {

  pauseBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

  });

}


// Reset
if (resetBtn) {

  resetBtn.addEventListener("click", () => {

    clearInterval(timerInterval);

    timeLeft = 1500;

    updateTimer();

  });

}


// =========================
// NOTES SYSTEM
// =========================

const notesInput =
  document.getElementById("notesInput");

const saveNotesBtn =
  document.getElementById("saveNotesBtn");

const clearNotesBtn =
  document.getElementById("clearNotesBtn");


// Load Notes
if (notesInput) {

  notesInput.value =
    localStorage.getItem("notes") || "";

}


// Save Notes
if (saveNotesBtn) {

  saveNotesBtn.addEventListener("click", () => {

    localStorage.setItem(
      "notes",
      notesInput.value
    );

    alert("Notes Saved!");

  });

}


// Clear Notes
if (clearNotesBtn) {

  clearNotesBtn.addEventListener("click", () => {

    notesInput.value = "";

    localStorage.removeItem("notes");

  });

}


// =========================
// PROGRESS TRACKER
// =========================

const progressBar =
  document.getElementById("progressBar");

const progressBtn =
  document.getElementById("progressBtn");

const decreaseProgressBtn =
  document.getElementById("decreaseProgressBtn");

let progress =
  localStorage.getItem("progress") || 0;


// Update Progress
function updateProgress() {

  progressBar.style.width =
    progress + "%";

}


// Load
updateProgress();


// Increase
if (progressBtn) {

  progressBtn.addEventListener("click", () => {

    if (progress < 100) {

      progress =
        Number(progress) + 10;

      localStorage.setItem(
        "progress",
        progress
      );

      updateProgress();

      updateDashboard();

    }

  });

}


// Decrease
if (decreaseProgressBtn) {

  decreaseProgressBtn
    .addEventListener("click", () => {

    if (progress > 0) {

      progress =
        Number(progress) - 10;

      localStorage.setItem(
        "progress",
        progress
      );

      updateProgress();

      updateDashboard();

    }

  });

}


// =========================
// MOTIVATIONAL QUOTES
// =========================

const quotes = [

  "Success starts with consistency.",

  "Study now, shine later.",

  "Dream big. Work bigger.",

  "Focus creates success.",

  "Discipline beats motivation."

];

const quote =
  document.getElementById("quote");

const newQuoteBtn =
  document.getElementById("newQuoteBtn");


// Generate Quote
function generateQuote() {

  const random =
    Math.floor(
      Math.random() * quotes.length
    );

  quote.innerText =
    quotes[random];

}


if (quote) {

  generateQuote();

}


// New Quote
if (newQuoteBtn) {

  newQuoteBtn.addEventListener(
    "click",
    generateQuote
  );

}


// =========================
// STREAK SYSTEM
// =========================

const streakCount =
  document.getElementById("streakCount");

const streakBtn =
  document.getElementById("streakBtn");

const decreaseStreakBtn =
  document.getElementById("decreaseStreakBtn");

let streak =
  localStorage.getItem("streak") || 0;


// Update UI
function updateStreak() {

  streakCount.innerText =
    streak;

}


// Load
updateStreak();


// Increase
if (streakBtn) {

  streakBtn.addEventListener("click", () => {

    streak++;

    localStorage.setItem(
      "streak",
      streak
    );

    updateStreak();

    updateDashboard();

  });

}


// Decrease
if (decreaseStreakBtn) {

  decreaseStreakBtn
    .addEventListener("click", () => {

    if (streak > 0) {

      streak--;

      localStorage.setItem(
        "streak",
        streak
      );

      updateStreak();

      updateDashboard();

    }

  });

}


// =========================
// MUSIC PLAYER
// =========================

const studyMusic =
  document.getElementById("studyMusic");

if (studyMusic) {

  studyMusic.loop = true;

}


// =========================
// DASHBOARD
// =========================

const taskCount =
  document.getElementById("taskCount");

const progressCount =
  document.getElementById("progressCount");

const streakDashboard =
  document.getElementById("streakDashboard");


// Update Dashboard
function updateDashboard() {

  if (taskCount) {

    taskCount.innerText =
      document.querySelectorAll(
        "#taskList li"
      ).length;

  }

  if (progressCount) {

    progressCount.innerText =
      progress + "%";

  }

  if (streakDashboard) {

    streakDashboard.innerText =
      streak;

  }

}


updateDashboard();


// =========================
// DAILY GOALS
// =========================

const goalInput =
  document.getElementById("goalInput");

const addGoalBtn =
  document.getElementById("addGoalBtn");

const goalList =
  document.getElementById("goalList");


// Add Goal
if (addGoalBtn) {

  addGoalBtn.addEventListener("click", () => {

    const goal =
      goalInput.value.trim();

    if (goal === "") return;

    const li =
      document.createElement("li");

    li.className =
      "bg-black p-4 rounded-xl flex justify-between items-center";

    li.innerHTML = `

      <span>${goal}</span>

      <button class="deleteGoalBtn bg-red-500 px-4 py-2 rounded-lg">
        Delete
      </button>

    `;

    li.querySelector(".deleteGoalBtn")
      .addEventListener("click", () => {

      li.remove();

    });

    goalList.appendChild(li);

    goalInput.value = "";

  });

}


// =========================
// FLASHCARDS
// =========================

const addFlashcardBtn =
  document.getElementById("addFlashcardBtn");

const questionInput =
  document.getElementById("questionInput");

const answerInput =
  document.getElementById("answerInput");

const flashcardContainer =
  document.getElementById("flashcardContainer");


// Add Flashcard
if (addFlashcardBtn) {

  addFlashcardBtn.addEventListener("click", () => {

    const question =
      questionInput.value.trim();

    const answer =
      answerInput.value.trim();

    if (
      question === "" ||
      answer === ""
    ) return;

    const card =
      document.createElement("div");

    card.className =
      "bg-black p-6 rounded-2xl";

    card.innerHTML = `

      <h2 class="text-2xl font-bold mb-4 text-blue-500">
        ${question}
      </h2>

      <p class="hidden text-gray-300 answer">
        ${answer}
      </p>

      <div class="flex gap-4 mt-4">

        <button class="showBtn bg-green-500 px-4 py-2 rounded-lg">
          Show
        </button>

        <button class="deleteCardBtn bg-red-500 px-4 py-2 rounded-lg">
          Delete
        </button>

      </div>

    `;

    // Show Answer
    card.querySelector(".showBtn")
      .addEventListener("click", () => {

      card.querySelector(".answer")
        .classList.toggle("hidden");

    });

    // Delete Card
    card.querySelector(".deleteCardBtn")
      .addEventListener("click", () => {

      card.remove();

    });

    flashcardContainer.appendChild(card);

    questionInput.value = "";
    answerInput.value = "";

  });

}