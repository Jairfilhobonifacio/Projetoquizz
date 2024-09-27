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
        imagem: "../Src/Assets/Apocalipyse-4.jpg"
    },
    {
        questao: "Onde você prefere se esconder e estabelecer uma base segura?",
        escolha1: "Uma fortaleza nas montanhas.",
        escolha2: "Uma fazenda isolada.",
        escolha3: "Uma comunidade fortificada de sobreviventes.",
        escolha4: "Um shopping.",
        resposta: 1,
        explicacao: "Você conseguiu reunir alguns suprimentos e agora precisa encontrar um lugar seguro para se esconder.",
    },
    {
        questao: "Como você lida com encontros hostis em um mundo pós-apocalíptico?",
        escolha1: "Evito confrontos a todo custo.",
        escolha2: "Tento negociar e encontrar uma solução pacífica.",
        escolha3: "Luto para me defender e proteger minha comunidade.",
        escolha4: "Fujo e deixo os outros lidarem com a situação.",
        resposta: 3,
        explicacao: "Durante uma busca por mais suprimentos, você encontra um grupo de sobreviventes hostis.",
    },
    {
        questao: "Qual é a sua abordagem em relação aos recursos escassos, como comida e água?",
        escolha1: "Raciono para que durem o máximo possível.",
        escolha2: "Tento aprender a cultivar alimentos e encontrar fontes de água potável.",
        escolha3: "Saio em busca de recursos sempre que necessário, sem se preocupar com o amanhã.",
        escolha4: "Tento me manter próximo de mercados e lugares que tenham comida de fácil acesso.",
        resposta: 2,
        explicacao: "Os recursos estão se esgotando e você precisa decidir como gerenciar o que resta.",
    },
    {
        questao: "Qual vai ser o rango de hoje?",
        escolha1: "Barra de cereal com insetos crocantes.",
        escolha2: "O cachorro caramelo do vizinho.",
        escolha3: "Sorvete descongelado de alho e cebola.",
        escolha4: "Que o canibalismo comece.",
        resposta: 3,
        explicacao: "Você está sedento por um fast food superprocessado, mas lembra que eles acabaram.",
    },
    {
        questao: "Qual é a primeira prioridade ao tentar reconstruir uma sociedade?",
        escolha1: "Estabelecer um sistema de governo e leis.",
        escolha2: "Garantir uma fonte estável de alimentos e água.",
        escolha3: "Criar um sistema de defesa contra ameaças.",
        escolha4: "Virar o MR Catra.",
        resposta: 2,
        explicacao: "Após meses de sobrevivência, você e seu grupo decidem começar a reconstruir uma sociedade.",
    },
];

// Constantes
const CORRETO_BONUS = 10; // Pontos ganhos por uma resposta correta
const MAXIMO_QUESTOES = 6; // Máximo de perguntas que podem ser feitas

// Função para iniciar o jogo
const iniciarJogo = () => {
    contadorDePerguntas = 0; // Reseta o contador de perguntas
    pontos = 0; // Reseta os pontos
    questoesDisponiveis = [...questoes]; // Cópia das questões disponíveis
    obterNovaPergunta(); // Obtém a primeira pergunta
};

// Função para obter uma nova pergunta
const obterNovaPergunta = () => {
    // Verifica se ainda há perguntas disponíveis
    if (questoesDisponiveis.length === 0 || contadorDePerguntas >= MAXIMO_QUESTOES) {
        return window.location.assign("/Final.html"); // Redireciona para a página final
    }

    contadorDePerguntas++; // Incrementa o contador de perguntas
    progressoText.innerText = `Questão ${contadorDePerguntas} / ${MAXIMO_QUESTOES}`; // Atualiza o texto do progresso
    // Carregar a barra de progresso
    progressoBarraCheia.style.width = `${(contadorDePerguntas / MAXIMO_QUESTOES) * 324}px`;

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

// Adiciona evento de clique às opções de resposta
escolhas.forEach(escolha => {
    escolha.addEventListener("click", e => {
        if (!aceitandoPerguntas) return; // Ignora se não estiver aceitando perguntas

        aceitandoPerguntas = false; // Bloqueia novas seleções
        const escolhaSelecionada = e.target; // Seleciona a opção clicada
        const respostaSelecionada = escolhaSelecionada.dataset["number"]; // Obtém o número da resposta selecionada

        // Determina a classe a ser aplicada (correto ou incorreto)
        const classToApply = respostaSelecionada == questaoAtual.resposta ? 'correto' : 'incorreto';
        escolhaSelecionada.parentElement.classList.add(classToApply); // Adiciona a classe à escolha

        // Se a resposta estiver correta
        if (classToApply === "correto") {
            incrementarPontos(CORRETO_BONUS); // Incrementa os pontos
            somAcerto.play(); // Toca o som de acerto
            botaoResposta.classList.add("mostrar"); // Mostra o botão de resposta
            botaoResposta.innerText = "Resposta Certa!"; // Atualiza o texto do botão
        } else { // Se a resposta estiver incorreta
            somErro.play(); // Toca o som de erro
            botaoResposta.classList.add("mostrar"); // Mostra o botão de resposta
            botaoResposta.innerText = "Resposta Errada!"; // Atualiza o texto do botão
        }

        // Após um segundo, remove a classe e obtém uma nova pergunta
        setTimeout(() => {
            escolhaSelecionada.parentElement.classList.remove(classToApply);
            botaoResposta.classList.remove("mostrar");
            obterNovaPergunta();
        }, 1000);
    });
});

// Função para incrementar pontos
const incrementarPontos = num => {
    pontos += num; // Adiciona os pontos
 
};

// Inicia o jogo
iniciarJogo();
