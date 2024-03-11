var lampadine;
const urlAccesa = './images/accesa.png';
const urlSpenta = './images/spenta.png';
const width = 84;
const height = 160;
const idContainer = 'main';
const idNrImmagini = 'nrLampadine';

class Lampadina {
    constructor(id, urlAccesa, urlSpenta, width, height, idContainer) {
        // this.id è un attributo (proprietà) della classe Lampadina
        // Non è necessario dichiarare prima l'elenco degli attributi
        this.id = id;
        // Creo una nuova istanza della classe Image
        this.immagineAccesa = new Image(width, height);
        // Assegno alla proprietà urlAccesa (ha questo nome perché lo abbiamo deciso noi)
        this.urlAccesa = urlAccesa;
        // Il browser invia una richiesta al server web per ottenere il file dell'immagine
        // definita da urlAccesa
        // Attenzione: creare una istanza della classe Image NON vuol dire visualizzare l'immagine nella pagina!!!
        this.immagineAccesa.src = this.urlAccesa;
        // Faccio la stessa cosa per l'immagine della lampadina spenta
        this.immagineSpenta = new Image(width, height);
        this.urlSpenta = urlSpenta;
        this.immagineSpenta.src = this.urlSpenta;

        // La proprietà this.accesa mi indica quale immagine visualizzare
        this.accesa = false;

        // Con le seguenti istruzioni creiamo un nuovo elemento HTML e lo aggiungiamo al document:
        // Creiamo un nuovo elemento: NON VIENE visualizzato nella pagina
        this.HTMLElement = document.createElement('img');
        // Impostiamo alcuni attributi dell'elemento
        this.HTMLElement.id = this.id;
        this.HTMLElement.src =  this.urlSpenta;
        this.HTMLElement.onclick = () => {
            // Codice che verrà eseguito quando si verifica un click su un'immagine
            // Handler (Gestore) dell'evento click
            if (this.accesa) {
                // Spengo la lampadina
                this.HTMLElement.src = this.urlSpenta;
            }
            else {
                this.HTMLElement.src = this.urlAccesa;
            }
            this.accesa = !this.accesa;
        }
        // Con questa istruzione decidiamo DOVE aggiungere il nuovo elemento HTML
        this.idContainer = idContainer;
        this.container = document.getElementById(idContainer);

        // Aggiungiamo il nuovo elemento alla pagina: ADESSI VIENE VISUALIZZATO
        // appendChild corrisponde ad inserire il nuovo elemento <img> all'interno del tag identificato da idContainer
        // <div id="main">
        //      <img src=...>                 
        // </div>
        this.container.appendChild(this.HTMLElement);
    }
}

class Lampadine {
    constructor(nrLampadine, urlAccesa, urlSpenta, width, height, idContainer) {
        // Svuoto il contenitore per le lampadine
        let container = document.getElementById(idContainer);
        container.innerHTML = '';

        // Dichiara un nuovo array, la dimensione non va specificata, il nostro array
        // può crescere a seconda delle esigenze
        // In javascript gli array sono oggetti che mettono a disposizione molti metodi
        // molto potenti
        this.lampadine = [];
        // Dobbiamo creare tante lampadine quante indicate dalla variabile nrLampadine
        this.nrLampadine = nrLampadine;
        for (let i = 0; i < nrLampadine; i++) {
            // Creo un nuovo oggetto lampadina
            let lampadina = new Lampadina(i, urlAccesa, urlSpenta, width, height, idContainer);
            // Aggiungo la nuova lampadina all'array lampadine
            this.lampadine.push(lampadina);
        }

    }
}

function generaLampadine() {
    // 1. recuperare il numero di lampadine da creare
    let nrLampadine = document.getElementById(idNrImmagini).value;
    // 2. Creo tante lampadine quante sono state indicate dall'utente nella input
    var lampadine = new Lampadine(nrLampadine, urlAccesa, urlSpenta, width, height, idContainer);
}

// Creo un'istanza della classe Lampadina, ilò valore 1 viene assegnato alla variabile chiamata id
// (parametro del costruttore)
/* var lampadina = new Lampadina(1, './images/accesa.png', './images/spenta.png', 84, 160, 'main');
var lampadina = new Lampadina(1, './images/accesa.png', './images/spenta.png', 84, 160, 'main');
var lampadina = new Lampadina(1, './images/accesa.png', './images/spenta.png', 84, 160, 'main');
var lampadina = new Lampadina(1, './images/accesa.png', './images/spenta.png', 84, 160, 'main'); */

