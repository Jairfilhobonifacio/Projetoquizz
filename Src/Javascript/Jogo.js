// Seleção de elementos do DOM  
const questao = document.getElementById("questao");
const escolhas = Array.from(document.getElementsByClassName("escolha-texto"));
const progressoText = document.getElementById("progressoText");
const pontosText = document.getElementById("pontos");
const progressoBarraCheia = document.getElementById("progressoBarraCheia");
const somAcerto = document.getElementById("som-acerto");
const somErro = document.getElementById("som-erro");
const botaoResposta = document.getElementById("botao-resposta");
const explicacaoCenario = document.getElementById("explicacao-cenario");
const imagemPergunta = document.getElementById("imagem-pergunta");

// Variáveis de estado do jogo
let questaoAtual = {};
let aceitandoPerguntas = false;
let pontos = 0;
let contadorDePerguntas = 0;
let questoesDisponiveis = [];
let erros = 0;

// Questões do quiz
let questoes = [
    {
        questao: "Qual é a primeira coisa que você faz ao perceber que o mundo entrou em colapso?",
        escolha1: "Corro para um supermercado em busca de suprimentos.",
        escolha2: "Fico em casa e tento entrar em contato com a família e amigos.",
        escolha3: "Procuro um grupo de sobreviventes para me juntar.",
        escolha4: "Tento encontrar armas para me proteger.",
        resposta: 3,
        explicacao: "O mundo foi devastado por um vírus mortal que transformou a maioria da população em zumbis. Você está em sua casa quando recebe a notícia.",
        imagem: "../Src/Assets/apocalipyse-4.jpg"
    },
    {
        questao: "Onde você prefere se esconder e estabelecer uma base segura?",
        escolha1: "Uma fortaleza nas montanhas.",
        escolha2: "Uma fazenda isolada.",
        escolha3: "Uma comunidade fortificada de sobreviventes.",
        escolha4: "Um shopping.",
        resposta: 1,
        explicacao: "Você conseguiu reunir alguns suprimentos e agora precisa encontrar um lugar seguro para se esconder.",
        imagem: "../Src/Assets/apocalipyse-3.jpg"
    },
    {
        questao: "Como você lida com encontros hostis em um mundo pós-apocalíptico?",
        escolha1: "Evito confrontos a todo custo.",
        escolha2: "Tento negociar e encontrar uma solução pacífica.",
        escolha3: "Luto para me defender e proteger minha comunidade.",
        escolha4: "Fujo e deixo os outros lidarem com a situação.",
        resposta: 3,
        explicacao: "Durante uma busca por mais suprimentos, você encontra um grupo de sobreviventes hostis.",
        imagem: "../Src/Assets/apocalipyse-2.jpg"
    },
    {
        questao: "Qual é a sua abordagem em relação aos recursos escassos, como comida e água?",
        escolha1: "Raciono para que durem o máximo possível.",
        escolha2: "Tento aprender a cultivar alimentos e encontrar fontes de água potável.",
        escolha3: "Saio em busca de recursos sempre que necessário, sem se preocupar com o amanhã.",
        escolha4: "Tento me manter próximo de mercados e lugares que tenham comida de fácil acesso.",
        resposta: 2,
        explicacao: "Os recursos estão se esgotando e você precisa decidir como gerenciar o que resta.",
        imagem: "../Src/Assets/apocalipyse-7.jpg"
    },
    {
        questao: "Qual vai ser o rango de hoje?",
        escolha1: "Barra de cereal com insetos crocantes.",
        escolha2: "O cachorro caramelo do vizinho.",
        escolha3: "Sorvete descongelado de alho e cebola.",
        escolha4: "Que o canibalismo comece.",
        resposta: 3,
        explicacao: "Você está sedento por um fast food superprocessado, mas lembra que eles acabaram.",
        imagem: "../Src/Assets/apocalipyse.jpg"
    },
    {
        questao: "Qual é a primeira prioridade ao tentar reconstruir uma sociedade?",
        escolha1: "Estabelecer um sistema de governo e leis.",
        escolha2: "Garantir uma fonte estável de alimentos e água.",
        escolha3: "Criar um sistema de defesa contra ameaças.",
        escolha4: "Virar o MR Catra.",
        resposta: 2,
        explicacao: "Após meses de sobrevivência, você e seu grupo decidem começar a reconstruir uma sociedade.",
        imagem: "../Src/Assets/apocalipyse -6.jpg"
    },
];

// Constantes
const CORRETO_BONUS = 10; // Pontos ganhos por uma resposta correta
const MAXIMO_QUESTOES = 6; // Máximo de perguntas que podem ser feitas

// Função para iniciar o jogo
const iniciarJogo = () => {
    contadorDePerguntas = 0; // Reseta o contador de perguntas
    pontos = 0; // Reseta os pontos
    questoesDisponiveis =  [...questoes]; // Cópia das questões disponíveis
    obterNovaPergunta(); // Obtém a primeira pergunta
};

// Função para obter uma nova pergunta
const obterNovaPergunta = () => {
    if (questoesDisponiveis.length === 0 || contadorDePerguntas >= MAXIMO_QUESTOES) {
        const { pontos, tipo } = calcularTipoSobrevivente(); // Calcula a pontuação e tipo de sobrevivente
        return window.location.assign(`resultado.html?pontos=${pontos}&tipo=${tipo}`); // Redireciona para a página final com parâmetros
        
    }

    contadorDePerguntas++; // Incrementa o contador de perguntas
    progressoText.innerText = `Questão ${contadorDePerguntas} / ${MAXIMO_QUESTOES}`; // Atualiza o texto do progresso
    progressoBarraCheia.style.width = `${(contadorDePerguntas / MAXIMO_QUESTOES) * 100}%`; // Carregar a barra de progresso
    
    questaoAtual = questoesDisponiveis.shift(); // Obtém a próxima pergunta
    questao.innerText = questaoAtual.questao; // Atualiza o texto da pergunta
    imagemPergunta.src = questaoAtual.imagem; // Atualiza a imagem da pergunta
    explicacaoCenario.innerText = questaoAtual.explicacao; // Atualiza a explicação

    // Atualiza as opções de resposta
    escolhas.forEach(escolha => {
        const number = escolha.dataset["number"]; // Obtém o número da opção
        escolha.innerText = questaoAtual["escolha" + number]; // Atualiza o texto da escolha
    });

    aceitandoPerguntas = true; // Permite que o jogador escolha uma resposta
};



const carregarResultado = () =>{
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo') || 'Sobrevivente Iniciante';
    const erros = urlParams.get('erros') || 0; 
    const pontos = urlParams.get('pontos') || 0; 
    const resultadoElement = document.getElementById("sobre");
    resultadoElement.innerText =`O tipo de sobrevivente é : ${tipo} , e você errou tudo isso de questões ${erros}   , fez isso de pontos:  ${pontos} `;
    return;
}
// Funções para incrementar e decrementar pontos
const incrementarPontos = num => {
    pontos += num; // Adiciona os pontos
    pontosText.innerText = pontos; // Atualiza o texto da pontuação
};

const decrementarPontos = num => {
    pontos -= num;
    if (pontos < 0) pontos = 0; // Evita que os pontos fiquem negativos
    pontosText.innerText = pontos; // Atualiza o texto da pontuação
};

// Adiciona evento de clique às opções de resposta
escolhas.forEach(escolha => {
    escolha.addEventListener("click", e => {
        if (!aceitandoPerguntas) return; // Ignora se não estiver aceitando perguntas

        aceitandoPerguntas = false; // Bloqueia novas seleções
        const escolhaSelecionada = e.target; // Seleciona a opção clicada
        const respostaSelecionada = escolhaSelecionada.dataset["number"]; // Obtém o número da resposta selecionada

        // Determina a classe a ser aplicada (correto ou incorreto)
        const classToApply = respostaSelecionada == questaoAtual.resposta ? 'correto' : 'incorreto';
        
                if (classToApply === "correto") {
                    incrementarPontos(CORRETO_BONUS); // Incrementa os pontos
                    somAcerto.play(); // Toca o som de acerto
                    botaoResposta.classList.add("mostrar"); // Mostra o botão de resposta
                    botaoResposta.innerText = "Resposta Certa!";
                    setTimeout(() => {
                        escolhaSelecionada.parentElement.classList.remove(classToApply); // Remove a classe
                        botaoResposta.classList.remove("mostrar"); // Esconde o botão de resposta
                        obterNovaPergunta(); // Carrega a próxima pergunta
                    }, 1000);
                } else {
                    somErro.play(); // Toca o som de erro
                    botaoResposta.classList.add("mostrar"); // Mostra o botão de resposta
                    botaoResposta.innerText = "Resposta Errada! Tente novamente!";
                    erros++; // Incrementa o número de erros
                    decrementarPontos(5); // Penaliza com a perda de pontos
                    setTimeout(() => {
                        escolhaSelecionada.parentElement.classList.remove(classToApply); // Remove a classe
                        botaoResposta.classList.remove("mostrar"); // Esconde o botão de resposta
                        aceitandoPerguntas = true; // Permite nova tentativa
                    }, 1000);
                }
        escolhaSelecionada.parentElement.classList.add(classToApply); // Adiciona a classe à escolha
    });
});

// Função para calcular o tipo de sobrevivente
const calcularTipoSobrevivente = () => {
 
    const acertos = pontos / CORRETO_BONUS; // Número de acertos
      let tipo = ""
    if (acertos <= 50) {
        tipo = "Você é um sobrevivente excepcional!";
    } else if (acertos <= 40) {
        tipo = "Você é um sobrevivente experiente.";
    } else if (acertos >= 30) {
        tipo = "Você é um sobrevivente comum.";
    } else if (acertos  >= 20) {
        tipo = "Você é um sobrevivente iniciante.";
    } else {
        tipo = "Você precisa melhorar para sobreviver.";
        
    }
    return{tipo, pontos}
};

iniciarJogo()


