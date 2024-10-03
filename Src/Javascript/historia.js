const storyText = [
    "Você está em casa, cercado pelo silêncio perturbador que se instalou na sua vizinhança.",
    "As luzes tremeluzem, e um arrepio percorre sua espinha.",
    "De repente, a televisão pisca e uma notícia de última hora interrompe a programação:",
    "Atenção, população! Um vírus devastador se espalhou rapidamente, transformando milhões em criaturas sedentas de sangue.",
    "Imagens de caos e destruição inundam a tela.",
    "Pessoas correndo, gritos ecoando nas ruas, enquanto zumbis vagam sem propósito, seus rostos desfigurados pela loucura.",
    "O que você fará agora?",
    "A segurança da sua família e a sua sobrevivência estão em jogo.",
    "                                           ",
    "A luta pela vida começa agora!"
];

let currentText = 0;
let currentCharacter = 0;

function typeText() {
    const storyElement = document.getElementById("story");

    if (currentText < storyText.length) {
        // Reinicia o texto atual
        storyElement.innerHTML = "";
        currentCharacter = 0;
        storyElement.style.opacity = '1'; // Torna o texto visível

        // Função para adicionar caracteres um por um
        function addCharacter() {
            if (currentCharacter < storyText[currentText].length) {
                storyElement.innerHTML += storyText[currentText].charAt(currentCharacter); // Adiciona o caractere atual
                currentCharacter++;
                setTimeout(addCharacter, 50); // Chama a função novamente após um curto intervalo
            } else {
                // Após completar o texto, espera 2 segundos e avança para o próximo texto
                setTimeout(() => {
                    storyElement.style.opacity = '0'; // Torna o texto invisível
                    currentText++;
                    setTimeout(typeText, 750); // Chama a próxima linha de texto após um delay
                }, 750); // Tempo para manter o texto visível
            }
        }

        addCharacter(); // Inicia a função de adição de caracteres
    } else {
        // Mostra o botão ao final da história
        document.getElementById("start-button").style.display = "block";
    }
}

document.getElementById("start-button").addEventListener("click", () => {
    window.location.href = "jogo.html"; // Redireciona para a página do jogo
});

window.onload = () => {
    typeText(); // Inicia a animação ao carregar a página
};
