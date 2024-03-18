// Consegna

// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
// ed emetto un messaggio in console con il numero della cella cliccata.

// Bonus

// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// - Genero l'elemento del dom al cui click si crea la tabella di gioco
let play = document.querySelector('#play');
// - Creo l'evento click che fa apparire la tabella
    // - Attivo e disattivo la tabella al click
    let active = false;
    // - Dichiaro la difficoltà in base al select input
    let difficoltà;
    // - Genero la tabella numerata proggressivamente in base alla difficoltà
    let userGrid = document.querySelector('#grid');
    playGrid();


// FUNCTIONS

// funzione che legge il valore di difficoltà selezionato dal giocatore e assegna un valore alla variabile difficoltà
function difficulty(){
    let gameDifficulty = document.querySelector('#difficulty-choice').value;
        if (gameDifficulty === 'easy'){
            difficoltà = 100;
        }else if (gameDifficulty === 'normal'){
            difficoltà = 81;
        }else if (gameDifficulty === 'hard'){
            difficoltà = 49;
        }
}

// funzione per creare gli item della tabella in base alla difficoltà
// number ----> numero intero usato per calcolare quante celle devono essere create
// return ----> l'item che deve andare a popolare la grid
function createSquare(number){
    let square = document.createElement('div');
    if (difficoltà === 100){
        square.classList.add('square');
    }else if (difficoltà === 81){
        square.classList.add('square-normal');
    }else if (difficoltà === 49){
        square.classList.add('square-hard');
    }
    square.innerHTML = `<span>${number}</span>`;
    return square;
}

// funzione per colorare i grid item al click 
// gridItem ---> item del DOM a cui applicare l'evento click
function clickSquare(gridItem){
    gridItem.addEventListener('click', function(){
        this.classList.toggle('azure');
    });
}



// funzione per attivare o disattivare la griglia di gioco al click del bottone play
function playGrid(){
    play.addEventListener('click', function(){
        // - Imposto il livello di difficoltà in base alla scelta del giocatore
        difficulty();
        // - Attivo o nascondo la griglia in base al suo stato attuale
        if(active === true){
            userGrid.classList.remove('active');
            userGrid.classList.add('hide');  
            userGrid.innerHTML = '';
            play.innerHTML = 'Open';
            active = false; 
        }else if(active === false){
            // - Genero una griglia in base alla difficoltà impostata
            for (let i = 0; i < difficoltà; i++) {
                let gridSquare = createSquare(i + 1);
                // - Modifico il colore di background della cella al click
                // - al secondo click il colore di background ritorna quello base
                clickSquare(gridSquare);
                // - Popolo la griglia di gioco
                userGrid.append(gridSquare);
            }
            userGrid.classList.remove('hide');
            userGrid.classList.add('active');  
            play.innerHTML = 'Close';
            active = true; 
        }
    });
    
}

