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
        this.spostamento = 1;
    }
    sposta() {
        this.position.left += this.spostamento;
        this.position.top += this.spostamento;

        this.image.style.left = this.position.leftPx;
        this.image.style.top = this.position.topPx;
    }
}

var pallina = new Pallina('./images/ball.png', new Dimensions(20, 20), new Position(new Dimensions(20, 20)));
setInterval(() => {
    pallina.sposta();
    console.log('ok')
}, 20);
