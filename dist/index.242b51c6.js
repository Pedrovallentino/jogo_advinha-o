let numeroSecreto;
let tempoRestante = 30;
let temporizador;
const timerElement = document.getElementById("timer");
const feedbackElement = document.getElementById("feedback");
const guessInput = document.getElementById("guessInput");
const submitButton = document.getElementById("submitGuess");
const restartButton = document.getElementById("restartGame");
function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    tempoRestante = 30;
    timerElement.textContent = tempoRestante.toString();
    feedbackElement.textContent = "";
    guessInput.value = "";
    guessInput.disabled = false;
    submitButton.disabled = false;
    restartButton.classList.add("hidden");
    if (temporizador) clearInterval(temporizador);
    temporizador = setInterval(()=>{
        tempoRestante--;
        timerElement.textContent = tempoRestante.toString();
        if (tempoRestante <= 0) encerrarJogo(false);
    }, 1000);
}
function verificarPalpite() {
    const palpite = parseInt(guessInput.value);
    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        feedbackElement.textContent = "Digite um n\xfamero v\xe1lido entre 1 e 100.";
        return;
    }
    if (palpite === numeroSecreto) encerrarJogo(true);
    else if (palpite < numeroSecreto) feedbackElement.textContent = "Tente um n\xfamero maior!";
    else feedbackElement.textContent = "Tente um n\xfamero menor!";
}
function encerrarJogo(vitoria) {
    clearInterval(temporizador);
    guessInput.disabled = true;
    submitButton.disabled = true;
    restartButton.classList.remove("hidden");
    feedbackElement.textContent = vitoria ? "Parab\xe9ns! Voc\xea acertou! \uD83C\uDF89" : "Tempo esgotado! Voc\xea perdeu. \uD83D\uDE22";
}
// Iniciar jogo ao carregar a página
window.onload = iniciarJogo;
// Event listeners
submitButton.addEventListener("click", verificarPalpite);
restartButton.addEventListener("click", iniciarJogo);

//# sourceMappingURL=index.242b51c6.js.map
