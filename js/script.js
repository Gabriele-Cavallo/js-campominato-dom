// Consegna

// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
// ed emetto un messaggio in console con il numero della cella cliccata.

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
// Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe 
// non potranno esserci due numeri uguali.


// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo 
// calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella cliccata si colora 
// di azzurro e l'utente può continuare a cliccare sulle altre celle.

// La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di 
// numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha 
// cliccato su una cella che non era una bomba.

// Bonus

// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;


// Dichiaro l'array che andrà a conteneri i numeri corrispondenti alle celle delle bombe
let gridBombs = [];
// Dichiaro l'array per stabilire la vittoria del giocatore
let endGame = [];
// Dichiaro il punteggio inizale pari a 0
let score = 0;
// Dichiaro la variabile che andrà a gestire la difficoltà quando verrà valorizzata nella funzione di click
let difficultyChoice;
// - Genero l'elemento del dom al cui click si crea la tabella di gioco
let play = document.querySelector('#play');
// - Creo l'evento click che fa apparire la tabella
    // - Attivo e disattivo la tabella al click
    let active = false;
    
    // - Genero la tabella numerata proggressivamente in base alla difficoltà
    let userGrid = document.querySelector('#grid');
    playGrid();


// FUNCTIONS

// funzione che legge il valore di difficoltà selezionato dal giocatore 
// return ---> assegna il valore alla variabile difficultyChoice
function difficulty(){
    let difficoltà;
    let gameDifficulty = document.querySelector('#difficulty-choice').value;
        if (gameDifficulty === 'easy'){
            difficoltà = 100;
        }else if (gameDifficulty === 'normal'){
            difficoltà = 81;
        }else if (gameDifficulty === 'hard'){
            difficoltà = 49;
        }
    return difficoltà;
}

// funzione per creare gli item della tabella in base alla difficoltà
// number ----> numero intero usato per calcolare quante celle devono essere create
// return ----> l'item che deve andare a popolare la grid
function createSquare(number){
    let square = document.createElement('div');
    if (number === 100){
        square.classList.add('square');
    }else if (number === 81){
        square.classList.add('square-normal');
    }else if (number === 49){
        square.classList.add('square-hard');
    }
    return square;
}

// funzione per colorare i grid item al click e stabilire la vittoria o la perdita
// gridItem ---> item del DOM a cui applicare l'evento click
function clickSquare(gridItem, maxCellsScore){
    gridItem.addEventListener('click', function(){
        // Se la cella cliccata corrisponde a una di quelle nell'array delle bombe si colora di rosso e dichiara la sconfitta
        if (gridBombs.includes(parseInt(this.children[0].innerHTML))){
            this.classList.add('red');
            alert(`Hai perso!!! Il tuo punteggio è ${score}!!`);
        // Altrimenti si colora di azzuro e aumenta il punteggio di 1 e dichiara la vittoria al raggiungimento del massimo punteggio ottenibile
        }else if(!endGame.includes(parseInt(this.children[0].innerHTML)) && (endGame.length >= (maxCellsScore - 17))){
            this.classList.add('azure');
            score++;
            // Pusho il numero selezionato in un array per stabilire la vittoria
            endGame.push(parseInt(this.children[0].innerHTML));
            alert(`Congratulazioni, hai vinto!!!! Il tuo punteggio è ${score}!!`);
        }else if(!endGame.includes(parseInt(this.children[0].innerHTML))){
            this.classList.add('azure');
            score++;
            // Pusho il numero selezionato in un array per stabilire la vittoria
            endGame.push(parseInt(this.children[0].innerHTML));
        }
        console.log('this-square' , this.children[0].innerHTML);
    });
}

// funzione per attivare o disattivare la griglia di gioco al click del bottone play
function playGrid(){
    play.addEventListener('click', function(){
        // - Attivo o nascondo la griglia in base al suo stato attuale
        if(active === true){
            // Svuoto l'array precedentemente creato
            gridBombs = [];
            userGrid.classList.remove('active');
            userGrid.classList.add('hide');  
            userGrid.innerHTML = '';
            play.innerHTML = 'Open';
            active = false; 
        }else if(active === false){
            // Popolo l'array con i 16 numeri random che coincidono con le caselle delle bombe
            gridBombsRandom();
            // - Imposto il livello di difficoltà in base alla scelta del giocatore
            difficultyChoice = difficulty();
            // - Genero una griglia in base alla difficoltà impostata
            for (let i = 0; i < difficultyChoice; i++) {
                let gridSquare = createSquare(difficultyChoice);
                gridSquare.innerHTML = `<span>${i + 1}</span>`;
                // - Modifico il colore di background della cella al click
                // - al secondo click il colore di background ritorna quello base
                clickSquare(gridSquare, difficultyChoice);
                // - Popolo la griglia di gioco
                userGrid.append(gridSquare);
                console.log('difficulty-choice' , difficultyChoice);
            }
            userGrid.classList.remove('hide');
            userGrid.classList.add('active');  
            play.innerHTML = 'Close';
            active = true; 
        }
    });
    
}

// funzione che genera 16 numeri random per indicare quali celle sono le bombe e le pusha nell'array
function gridBombsRandom(){
    while (gridBombs.length < 16) {
        let bombs = Math.floor((Math.random() * difficulty()) + 1);
        if (!gridBombs.includes(bombs)){
            gridBombs.push(bombs);
        }
    }
}



