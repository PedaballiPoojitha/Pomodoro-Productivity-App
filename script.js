let timer;
let timeLeft = 1500; // 25 minutes
let currentMode = "pomodoro";
let isRunning = false;
let sessions = 0;

const timeDisplay = document.getElementById("time");
const sessionCount = document.getElementById("sessionCount");

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timeDisplay.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function setMode(mode) {
    currentMode = mode;
    if (mode === "pomodoro") timeLeft = 1500;
    if (mode === "short") timeLeft = 300;
    if (mode === "long") timeLeft = 900;
    updateDisplay();
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;

    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;

            if (currentMode === "pomodoro") {
                sessions++;
                sessionCount.textContent = sessions;
                updateChart();
            }

            alert("Time's Up!");
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    pauseTimer();
    setMode(currentMode);
}

updateDisplay();

/* ---------------- TASK MANAGEMENT ---------------- */

function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.innerHTML = `
        <span onclick="toggleTask(this)">${taskText}</span>
        <button onclick="deleteTask(this)">❌</button>
    `;

    document.getElementById("taskList").appendChild(li);
    input.value = "";
}

function toggleTask(element) {
    element.classList.toggle("completed");
}

function deleteTask(button) {
    button.parentElement.remove();
}

/* ---------------- ANALYTICS ---------------- */

const ctx = document.getElementById('reportChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Completed Sessions'],
        datasets: [{
            label: 'Pomodoro Sessions',
            data: [sessions],
            backgroundColor: '#ff7675'
        }]
    }
});

function updateChart() {
    chart.data.datasets[0].data[0] = sessions;
    chart.update();
}
