// E' possibile creare un oggetto di tipo Image per precaricare le immagini
// nel browser, al caricamento della pagina.
var lampadinaAccesa = new Image();
// Importante: specificare la proprietà src (nome del file completo di percorso)
lampadinaAccesa.src = './images/accesa.png';

var statoLampadina = false;

function accendi() {
    // recupero l'immagine dal DOM, let dichiara una variabile che cessa di esistere
    // quando termina la funzione
    let lampadina = document.getElementById('lampadina');
    // Posso modificare qualsiasi proprietà dell'elemento della pagina
    if (statoLampadina) {
        // La lampadina è accesa, devo spegnerla
        lampadina.src = './images/spenta.png';
    }
    else {
        lampadina.src = './images/accesa.png';
    }
    statoLampadina = !statoLampadina;

}