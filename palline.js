class Dimensions {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

class Position {
    constructor(dimensions) {
        // Generare un numero casuale fra 0 e la dimensione della finestra
        // Math.random() genera un numero casuale fra 0 e 1, lo moltiplico per la dimensione dlla finestra,
        // tolgo la dimensione della pallina e tronco il valore (devo usare la parte intera!)
        this.left = Math.floor(Math.random() * window.innerWidth - dimensions.width);
        this.top = Math.floor(Math.random() * window.innerHeight - dimensions.height);
    }
    get topPx() {
        return this.top + 'px';
    }

    get leftPx() {
        return this.left + 'px';
    }
}

class Spostamento {
    constructor(max) {
        this.x = Math.floor((Math.random() - 0.5) * max);
        this.y = Math.floor((Math.random() - 0.5) * max);
    }
}

class Pallina {
    constructor(urlImage, dimensions, position) {
        this.dimensions = dimensions;
        this.position = position;
        this.image = new Image(dimensions.width, dimensions.height);
        this.image.src = urlImage;
        this.image.style.position = 'absolute';
        this.image.style.left = position.leftPx;
        this.image.style.top = position.topPx;
        document.body.appendChild(this.image);
        this.spostamento = new Spostamento(20);
    }
    sposta() {
        // Controllare se la pallina è arrivata al bordo della finestra sia oizzontale che verticale
        // Orizzontale
        if (this.position.left <= 0 || this.position.left >= window.innerWidth - this.dimensions.width) {
            this.spostamento.x = - this.spostamento.x;
        }
        // Verticale
        if (this.position.top <= 0 || this.position.top >= window.innerHeight - this.dimensions.height) {
            this.spostamento.y = - this.spostamento.y;
        }

        this.position.left += this.spostamento.x;
        this.position.top += this.spostamento.y;

        this.image.style.left = this.position.leftPx;
        this.image.style.top = this.position.topPx;
    }
}

class Palline {
    constructor(urlImage, dimensions, nrPalline) {
        this.palline = [];
        for (let i = 0; i < nrPalline; i++) {
            let pallina = new Pallina(urlImage, dimensions, new Position(dimensions));
            this.palline.push(pallina);            
        }
    }
    sposta() {
        this.palline.forEach(pallina => {
            pallina.sposta();
        });
    }

}

var intervallo;

function avvia() {
    // prende il valore dell'input
    let nrPalline = document.getElementById('nrPalline').value;
    var palline = new Palline('./images/ball.png', new Dimensions(20, 20), nrPalline);
    intervallo = setInterval(() => {
        palline.sposta();        
    }, 20);
}

function ferma() {
    // termino l'esecuzione della funzione di callback avviata da setInterval
    clearInterval(intervallo);
}

