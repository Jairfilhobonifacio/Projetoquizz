const questao = document.getElementById("questao") ;
const escolhas = Array.from(document.getElementsByClassName("escolha-texto"));
const progressoText = document.getElementById("progressoText");
const pontosText = document.getElementById("pontos");
const progressoBarraCheia = document.getElementById("progressoBarraCheia");

let questaoAtual= {};
let aceitandoPerguntas = false;
let pontos= 0;
let contadorDePerguntas = 0;
let questoesDisponiveis = [];

let questoes = [
{ 
    questao:"Qual é a primeira coisa que você faz ao perceber que o mundo entrou em colapso?",
    escolha1:"Corro para um supermercado em busca de suprimentos.",
    escolha2: "Fico em casa e tento entrar em contato com a família e amigos.",
    escolha3:"Procuro um grupo de sobreviventes para me juntar.",
    escolha4:"Tento encontrar armas para me proteger.",
    resposta:3
},
{
    questao:"Onde você prefere se esconder e estabelecer uma base segura?",
    escolha1:"Uma fortaleza nas montanhas.",
    escolha2:"Uma fazenda isolada" ,
    escolha3:"Uma comunidade fortificada de sobreviventes.",
    escolha4:"Um shopping.",
    resposta:1
},
{
    questao:"Como você lida com encontros hostis em um mundo pós-apocalíptico?",
    escolha1:"Evito confrontos a todo custo.",
    escolha2:"Tento negociar e encontrar uma solução pacífica." ,
    escolha3:"Luto para me defender e proteger minha comunidade.",
    escolha4:"Fujo e deixo os outros lidarem com a situação.",
    resposta:3
},
{
    questao:"Qual é a sua abordagem em relação aos recursos escassos, como comida e água?",
    escolha1:"Raciono para que durem o máximo possível.",
    escolha2:"Tento aprender a cultivar alimentos e encontrar fontes de água potável." ,
    escolha3:"Saio em busca de recursos sempre que necessário, sem se preocupar com o amanhã. ",
    escolha4:" Tento me manter próximo de mercados e lugares que tenham comida de fácil acesso.",
    resposta:2

},
{
    questao:"Qual vai se o rango de hoje?",
    escolha1:"barra de cereal com insetos crocantes",
    escolha2:"o cachorro caramelo do vizinho" ,
    escolha3:"sorvete descongelado de alho e cebola ",
    escolha4:" que o canibalismo comece",
    resposta:3
},
{
    questao:"Qual é a primeira prioridade ao tentar reconstruir uma sociedade?",
    escolha1:"Estabelecer um sistema de governo e leis.",
    escolha2:"Garantir uma fonte estável de alimentos e água." ,
    escolha3:"Criar um sistema de defesa contra ameaças.",
    escolha4:" Virar o MR catra.",
    resposta:2   
},
];


//Constantes
const CORRETO_BONUS =10;
const MAXIMO_QUESTOES = 6;

iniciarJogo = () =>{

    contadorDePerguntas = 0;
    pontos = 0;
    questoesDisponiveis=[ ...questoes];
    console.log();
    obterNovaPergunta()
} ;

obterNovaPergunta = () => {
    if(questoesDisponiveis.length === 0 || contadorDePerguntas >= MAXIMO_QUESTOES ) {
        return window.location.assign("/end.html")
    }
    contadorDePerguntas++;
    progressoText.innerText = `Questao ${contadorDePerguntas} /${MAXIMO_QUESTOES}` ;
   //carregar a barra de progresso

  
    const questaoIndex = Math.floor(Math.random() *  questoesDisponiveis.length);
    questaoAtual = questoesDisponiveis[questaoIndex];
    questao.innerText = questaoAtual.questao;
    escolhas.forEach(escolha =>{
        const number = escolha.dataset["number"];
        escolha.innerText = questaoAtual["escolha" + number];
    });
    questoesDisponiveis.splice(questaoIndex,1);
    aceitandoPerguntas = true;
} ;

escolhas.forEach(escolha=>{
    escolha.addEventListener("click", e =>{
        if(!aceitandoPerguntas) return;

        aceitandoPerguntas = false;
        const escolhaSelecionada=e.target;
        const respostaSelecionada=  escolhaSelecionada.dataset["number"];



      

            const classToApply = respostaSelecionada == questaoAtual.resposta ? 'correto' : 'incorreto';
         
            escolhaSelecionada.parentElement.classList.add(classToApply);

            if (classToApply === "correto") {
                incrementarPontos(CORRETO_BONUS);
            }
           
       
         
       setTimeout(()=>{
        escolhaSelecionada.parentElement.classList.remove(classToApply);
        
        obterNovaPergunta(); },1000);
        

    });


})

incrementarPontos = num => {
    pontos +=num;
    pontosText.innerText = pontos ;
}

iniciarJogo();

