var datiTabella;

function getData() {
    // La funzione che useremo per effettuare richieste sul web da parte della nostra applicazione
    // è la funzione fetch

    fetch('./data.json')
    .then(risposta => risposta.json())
    .then(dati => {
        // A questo punto i dati sono arrivati e sono in formato javascript pronti per essere utilizzati
        datiTabella = dati;
        console.log('Dati ricevuti:', datiTabella);        
    })
}

function tableRow1(utente) {
    let row = document.createElement('tr');
    let cell = document.createElement('th');
    cell.innerText = utente.id;
    row.appendChild(cell);
    cell = document.createElement('td');
    cell.innerText = utente.first_name;
    row.appendChild(cell);
    cell = document.createElement('td');
    cell.innerText = utente.last_name;
    row.appendChild(cell);
    cell = document.createElement('td');
    cell.innerText = utente.email;
    row.appendChild(cell);
    cell = document.createElement('td');
    cell.innerText = utente.gender;
    row.appendChild(cell);
    cell = document.createElement('td');
    cell.innerText = utente.ip_address;
    row.appendChild(cell);
    return row;
}

function tableRow2(utente) {
    let row = document.createElement('tr');
    row.innerHTML = `<th>${utente.id}</th><td>${utente.first_name}</td><td>${utente.last_name}</td><td>${utente.email}</td><td>${utente.gender}</td><td>${utente.ip_address}</td>`;
    return row;
}

function tableHeader() {
    let row = document.createElement('tr');
    row.innerHTML = '<th>id</th><th>First name</th><th>Last name</th><th>Email</th><th>gender</th><th>IP address</th>';
    return row;
}

function table(utenti) {
    let table = document.createElement('table');
    table.appendChild(tableHeader());
    utenti.forEach(utente => {
        table.appendChild(tableRow1(utente));
    });
    return table;
}

function deleteTable() {
    let areadati = document.getElementById('areadati');
    areadati.innerText = '';
}

function viewTable() {
    deleteTable();
    let areadati = document.getElementById('areadati');
    areadati.appendChild(table(datiTabella));
}

getData();
