let timer;
let timeLeft = 1500; // 25 minutos em segundos
let isPaused = false;
let isRunning = false;
let totalProdutividade = 0; // Tempo total em Produtividade (segundos)
let totalEstudos = 0; // Tempo total em Estudos (segundos)
let category = 'produtividade'; // Categoria atual

// Configura o gráfico de pizza
const ctx = document.getElementById('myChart').getContext('2d');
let chart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Produtividade', 'Estudos'],
        datasets: [{
            label: 'Tempo Usado (segundos)',
            data: [totalProdutividade, totalEstudos],
            backgroundColor: ['#FF6F61', '#238636'],
            borderWidth: 1
        }]
    }
});

document.getElementById('start-btn').addEventListener('click', startTimer);
document.getElementById('pause-btn').addEventListener('click', pauseTimer);
document.getElementById('reset-btn').addEventListener('click', resetTimer);
document.getElementById('category').addEventListener('change', changeCategory);
document.getElementById('break-type').addEventListener('change', setBreak);

function startTimer() {
    if (isRunning) return; // Evita múltiplos timers

    isRunning = true;
    isPaused = false;
    timer = setInterval(function() {
        if (!isPaused) {
            timeLeft--;
            displayTime();
            registerTimePerSecond(); // Salva o tempo a cada segundo
            if (timeLeft <= 0) {
                clearInterval(timer);
                alert("Tempo acabou!");
                resetTimer();
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = !isPaused; // Pausa ou continua
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 1500; // Reseta para 25 minutos
    displayTime();
    isRunning = false;
    isPaused = false;
}

function setBreak() {
    let breakType = document.getElementById('break-type').value;
    timeLeft = breakType === 'curta' ? 300 : 600; // Pausa curta: 5 min, longa: 10 min
    displayTime();
}

function changeCategory() {
    category = document.getElementById('category').value;
}

function registerTimePerSecond() {
    if (category === 'produtividade') {
        totalProdutividade++;
    } else {
        totalEstudos++;
    }
    updateChart();
}

function updateChart() {
    chart.data.datasets[0].data = [totalProdutividade, totalEstudos];
    chart.update();
}

function displayTime() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
