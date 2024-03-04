class Lampadina {
    constructor(id, urlAccesa, urlSpenta, width, height, idContainer) {
        // this.id è un attributo (proprietà) della classe Lampadina
        // Non è necessario dichiarare prima l'elenco degli attributi
        this.id = id;
        this.immagineAccesa = new Image(width, height);
        this.urlAccesa = urlAccesa;
        this.immagineAccesa.src = this.urlAccesa;
        this.immagineSpenta = new Image(width, height);
        this.immagineSpenta.src = this.urlSpenta;
        this.urlSpenta = urlSpenta;
        this.accesa = false;
        this.HTMLElement = document.createElement('img');
        this.HTMLElement.id = this.id;
        this.HTMLElement.src =  this.urlSpenta;
        this.container = document.getElementById(idContainer);
        this.container.appendChild(this.HTMLElement);
    }

}

// Creo un'istanza della classe Lampadina, ilò valore 1 viene assegnato alla variabile chiamata id
// (parametro del costruttore)
var lampadina = new Lampadina(1, './images/accesa.png', './images/spenta.png', 84, 160, 'main');
