let numeroSecreto: number;
let tempoRestante: number = 30;
let temporizador: number | undefined;

const timerElement = document.getElementById("timer") as HTMLElement;
const feedbackElement = document.getElementById("feedback") as HTMLElement;
const guessInput = document.getElementById("guessInput") as HTMLInputElement;
const submitButton = document.getElementById("submitGuess") as HTMLButtonElement;
const restartButton = document.getElementById("restartGame") as HTMLButtonElement;

function iniciarJogo(): void {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tempoRestante = 30;
    timerElement.textContent = tempoRestante.toString();
    feedbackElement.textContent = "";
    guessInput.value = "";
    guessInput.disabled = false;
    submitButton.disabled = false;
    restartButton.classList.add("hidden");

    if (temporizador) {
        clearInterval(temporizador);
    }

    temporizador = setInterval(() => {
        tempoRestante--;
        timerElement.textContent = tempoRestante.toString();
        if (tempoRestante <= 0) {
            encerrarJogo(false);
        }
    }, 1000);
}

function verificarPalpite(): void {
    const palpite = parseInt(guessInput.value);
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        feedbackElement.textContent = "Digite um número válido entre 1 e 100.";
        return;
    }

    if (palpite === numeroSecreto) {
        encerrarJogo(true);
    } else if (palpite < numeroSecreto) {
        feedbackElement.textContent = "Tente um número maior!";
    } else {
        feedbackElement.textContent = "Tente um número menor!";
    }
}

function encerrarJogo(vitoria: boolean): void {
    clearInterval(temporizador);
    guessInput.disabled = true;
    submitButton.disabled = true;
    restartButton.classList.remove("hidden");
    feedbackElement.textContent = vitoria ? "Parabéns! Você acertou! 🎉" : "Tempo esgotado! Você perdeu. 😢";
}

// Iniciar jogo ao carregar a página
window.onload = iniciarJogo;

// Event listeners
submitButton.addEventListener("click", verificarPalpite);
restartButton.addEventListener("click", iniciarJogo);
