function getData() {
    // La funzione che useremo per effettuare richieste sul web da parte della nostra applicazione
    // è la funzione fetch

    fetch('./data.json')
    .then(risposta => risposta.json())
    .then(dati => {
        // A questo punto i dati sono arrivati e sono in formato javascript pronti per essere utilizzati
        console.log(dati);
    })
}