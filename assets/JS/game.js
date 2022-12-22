let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
    puntosComputador = 0;

const smallsHTML = document.querySelectorAll("small");

//Ref del html

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");

const divCardsPlayer = document.querySelector("#cardsPlayer");
const divCardsComputer = document.querySelector("#cardsComputer");


const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }


    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
}

crearDeck()

const pedirCarta = () => {
    if (deck.length === 0) {
        throw "No more cards";
    }
    cards = deck.pop();
    return cards
}



const valueCards = (card) => {
    const valor = card.substring(0, card.length - 1);

    return (isNaN(valor)) ?
        (valor === "A") ? 11 : 10
        : valor * 1;
}




//turno de la computadora

const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();

        puntosComputador = puntosComputador + valueCards(carta);
        smallsHTML[1].innerText = puntosComputador;

        //<img class="cards" src="assets/cartas/2C.png"></img>
        const imgCard = document.createElement("img");
        imgCard.src = `assets/cartas/${carta}.png`;
        imgCard.classList.add("cards")
        divCardsComputer.append(imgCard);

        if (puntosMinimos > 21) { break; }

    } while ((puntosComputador < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {

        if (puntosComputador === puntosMinimos) {alert("Nadie Gana =(")} 
        else if (puntosMinimos > 21) {alert("Gana la MAQUINA");} 
        else if (puntosComputador > 21) {alert("Has GANADO!!!");} 
        else { alert("Gana la MAQUINA") }
    }, 12);


}

//Enventos

btnPedir.addEventListener("click", () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valueCards(carta);
    smallsHTML[0].innerText = puntosJugador;

    //<img class="cards" src="assets/cartas/2C.png"></img>
    const imgCard = document.createElement("img");
    imgCard.src = `assets/cartas/${carta}.png`;
    imgCard.classList.add("cards")
    divCardsPlayer.append(imgCard);

    if (puntosJugador > 21) {


        console.warn("Has perdido");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {

        console.warn("You win");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
})


btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);


})


btnNuevo.addEventListener("click", () => {
    console.clear();
    deck = [];
    deck = crearDeck();

    puntosJugador     = 0;
    puntosComputadora = 0;

    smallsHTML[0].innerText = 0;
    smallsHTML[1].innerText = 0;

    divCardsPlayer.innerHTML = "";
    divCardsComputer.innerHTML = "";

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})