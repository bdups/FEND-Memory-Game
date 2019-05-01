/*
 * Definimos uma variável global tabuleiro
 * para trabalharmos dentro desse escopo
*/
const tabuleiro = document.querySelector('.deck');

/* Adicionar carta à lista de cartas viradas */
let cartasViradas = [];

/* Variável para contagem de jogadas */
let jogadas = 0;

/*
 * Defino a variável pares, que vai me permitir
 * contar o número de pares com a classe match,
 * que será iterado e, quando chegar a 8, termina
 * o jogo
*/
let pares = 0;

/*
 * Primeiro Click define o começo do jogo e
 * é manipulado para false após o primeiro
 * clique para que não haja alteração no timer
*/
let primeiroClick = true;

/*
 * Declara o tempo inicial a ser incrementado
 * após o começo do jogo
*/
let tempoJogo;
let segundos = 0;
let minutos = 0;
let tempo = document.querySelector('.tempo');
const modal = document.querySelector('.modal-bg');
let tempoFinal = document.querySelector('.tempo-final');
let estrelas = document.querySelectorAll('.fa-star');
let estrelasFinal = document.querySelector('.stars').innerHTML;
const resetar = document.querySelector('.restart');
const jogarNovo = document.querySelector('.repetir');

/* Função Timer */
function timer() {
    let minutos = 0;
    let segundos = 0;
    tempoJogo = setInterval(function () {
        segundos = parseInt(segundos, 10) + 1;
        minutos = parseInt(minutos, 10);
        if (segundos >= 60) {
            minutos += 1;
            segundos = 0;
        }
        segundos = segundos < 10 ? "0" + segundos : segundos;
        minutos = minutos < 10 ? "0" + minutos : minutos;
        tempo.innerHTML = minutos + ":" + segundos;
        tempoFinal.textContent = tempo.textContent;
    }, 1000);
}

/* Função que para o timer quando o jogo acaba */
function pararTimer() {
    clearInterval(tempoJogo);
}

/*
* Incrementa o número de jogadas toda vez que
* 2 cartas são selecionadas
*/
function incJogada() {
    jogadas++;
    let jogadasNumero = document.querySelector('.moves');
    jogadasNumero.innerHTML = jogadas;
}

/*
* Cria função de mostrar o símbolo da carta
* ou seja, adicionar as classes open e show.
* Adicionalmente, se for o primeiro clique
* a função ligarTimer começa o jogo.
*/

function virarCarta(carta) {
    if (primeiroClick) {
        timer();
        primeiroClick = false;
    }
    carta.classList.add('open');
    carta.classList.add('show');
}

/*
* Desvira carta, como a função solicitada
* é pra ser independente da função virarCarta
* como solicitado no item "+ if the cards do not match,
* remove the cards from the list and hide the card's symbol
* (put this functionality in another function that you call from this one)"
* usamos a função classList.add e classList.remove
* ao invés de uma função classList.toggle
*/
function desvirarCarta(carta) {
    carta.classList.remove('open');
    carta.classList.remove('show');
}

/* Adiciona carta ao array através do push() */
function salvarCartaVirada(carta) {
    cartasViradas.push(carta);
}

/*
* Confere se as cartas do array são iguais,
* comparando a última classe (ex: "fa-diamond")
* dos elementos card do array cartasViradas
*/
function MatchouNao() {
    if (cartasViradas[1].lastElementChild.className === cartasViradas[0].lastElementChild.className) {
        cartasViradas[1].classList.toggle('match');
        cartasViradas[0].classList.toggle('match');
        cartasViradas = [];
    } else {
        /*
        * Se não for match precisamos esvaziar nosso array,
        * senão não conseguios mais incrementar e validar
        * a lógica, já que ele só analisa até 2 elementos
        * e então desvira as cartas, usando a função
        * desvirarCarta aos elementos do array com um timeout
        * para que seja possivel ver a 2a carta
        */
        setTimeout(() => {
            desvirarCarta(cartasViradas[0]);
            desvirarCarta(cartasViradas[1]);
            cartasViradas = [];
        }, 1000);
    }
}

/* Função resetar tabuleiro */
function resetarTabuleiro() {
    /*
    * Selecionamos todas as cartas ao selecionar os elementos que tem
    * a classe card e utilizamos Array.from para converter nosso NodeList em Array
    */
    let cartasParaResetar = Array.from(document.querySelectorAll('.card'));

    /* Usamos a função shuffle dada para resetar as cartas postas no array anterior */
    let cartasResetadas = shuffle(cartasParaResetar);
    for (card of cartasResetadas) {
        tabuleiro.appendChild(card);
    }
}
resetarTabuleiro();

/*
* Função que roda sempre depois de uma jogada,
* verifica o número de jogadas atuais para
* avaliar e mostrar as estrelas correspondentes
*/
function placar() {

    if (jogadas === 12 || jogadas === 20) {
        for (i = 0; i < 3; i++) {
            if (i > 1) {
                estrelas[i].style.display = 'none';
            }
        }
    } else if (jogadas > 20) {
        for (i = 0; i < 3; i++) {
            if (i > 0) {
                estrelas[i].style.display = 'none';
            }
        }
    }
}

function abrirModal() {
    modal.style.display = "block";
}

function fecharModal() {
    modal.style.display = "none";
}

/*
* Função gameOver que é chamada quando
* todas as cartas são pareadas e mostra o
* modal com a pontuação, estrelas e tempo total
*/
function gameOver() {
    pararTimer();
    /* Abre o Modal */
    abrirModal();

    /* Adiciona total de jogadas e nota final ao modal */
    let totalJogadas = document.querySelector('.jogadas-final');
    totalJogadas.innerHTML = jogadas;

    let notaFinal = document.querySelector('.estrelas-final');
    notaFinal.innerHTML = estrelasFinal;
}

/*
 * Adiciona um EventListener ao botão de Restart
 * recebendo a função reset(), que reinicia o jogo
 */
resetar.addEventListener('click', reset);

/*
 * Adiciona um EventListener ao botão de Jogar
 * Novamente, recebendo a função jogarNovamente
 * que reseta o jogo, o placar final e fecha o modal
 */
jogarNovo.addEventListener('click', jogarNovamente);

/*
 * Reseta valores, define o primeiroClick como
 * verdadeiro para ligar o timer e reseta os valores
 * do modal final, assim como desvira e embaralha cartas
 */

function reset() {
    primeiroClick = true;
    pararTimer();
    jogadas = 0;
    minutos = 0;
    segundos = 0;
    pares = 0;
    tempo.innerHTML = "00:00";
    tempoFinal.textContext = "00:00";
    let jogadasNumero = document.querySelector('.moves');
    jogadasNumero.innerHTML = "0";
    cartasviradas = [];
    resetarTabuleiro();
    resetarEstrelas();
    resetarCartas();
}

function jogarNovamente() {
    reset();
    fecharModal();
}

function resetarCartas() {
    let cartasReinicio = document.querySelectorAll('.deck li');
    for (let carta of cartasReinicio) {
        carta.className = 'card';
    }
}

/*
 * Muda a propriedade CSS display de none para block
 * de todas as estrelas
 */
function resetarEstrelas() {
    for (i = 0; i < 3; i++) {
        if (i > 1) {
            estrelas[i].style.display = 'block';
        }
    }
}

/*
* Como todas as cartas tem a mesma class dentro
* da variável global tabuleiro, definimos um
* eventListener ao clique que identifica
* se o elemento clicado tem a
* classe card, e usa a funcao toggle() para
* adicionar as classes open e show ao elemento
*/
tabuleiro.addEventListener('click', event => {

    /*
    * Definimos uma variável global const carta
    * para que seja armazenado dentro da função
    * que foi solicitada separadamente
    */
    const carta = event.target;

    /*
    * Chama função virarCarta definida separadamente
    * caso o elemento clicado contenha a classe card,
    * não tenha a classe match (para não virar as cartas
    * que já foram casadas) e que não seja a carta atual,
    * no caso da segunda virada.
    * Como trabalhamos com jogadas e matches em pares
    * existem 2 tipos de funcionalidades de cartas:
    * se existirem 0 ou 1 cartas viradas (ou seja, no array cartasViradas[])
    * pode-se clicar, porém se existirem 2 cartas, o jogo não deixa
    * dar matches naquelas duas cartas, que foram
    * adicionadas ao array de cartasViradas,
    * para isso usamos length para conferir o tamanho do array
    */
    if (carta.classList.contains('card') && !carta.classList.contains('match') && cartasViradas.length < 2 && !cartasViradas.includes(carta)) {
        virarCarta(carta);
        salvarCartaVirada(carta);

        /*
        * Se tiver 2 cartas viradas na mesa, checa se é um Match ou não,
        * Incrementa o número de jogadas e depois roda a função placar()
        * para verificar se o jogo deve reduzir estrelas de acordo com o
        * número de jogadas, além de aumentar a contagem do número de pares
        */
        if (cartasViradas.length === 2) {
            MatchouNao(carta);
            incJogada();
            placar();
            pares++;
            if (pares === 8) {
                gameOver();
            }
        }
    }

});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
