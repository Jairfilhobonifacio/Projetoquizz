document.addEventListener("DOMContentLoaded", () => {
    const tipoSobrevivente = localStorage.getItem("tipoSobrevivente");
    const mensagemExplicativa = localStorage.getItem("mensagemExplicativa");
    const imagemCaminho = localStorage.getItem("imagemCaminho");

    // Seleciona os elementos da página
    const tipoSobreviventeElem = document.getElementById("tipo-sobrevivente");
    const imagemSobreviventeElem = document.getElementById("imagem-sobrevivente");
    const mensagemExplicativaElem = document.getElementById("mensagem-explicativa");

    // Define os conteúdos
    tipoSobreviventeElem.innerText = tipoSobrevivente;
    imagemSobreviventeElem.src = imagemCaminho;
    mensagemExplicativaElem.innerText = mensagemExplicativa;

    // Adiciona um evento para reiniciar o quiz
    document.getElementById("reiniciar-quiz").addEventListener("click", () => {
        localStorage.clear(); // Limpa os dados do localStorage
        window.location.assign("../index.html"); // Redireciona para a página inicial do quiz
    });
});
