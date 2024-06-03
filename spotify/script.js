// Variabile globale che memorizza il token bearer da utilizzare per tutte le richieste a spotify
var token;
var client_id = '5aa252d95c724a9ca74da2911f57300b';
var client_secret = 'a4e8ceaaf638477997c869031bd050df';

function getToken() {
    /*
    curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
    */

     fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
     })
     .then(response => response.json())
     .then(dati => {
        token = dati;
        // Ok, il token è arrivato!!!
        let searcharea = document.getElementById('searcharea');
        searcharea.style.visibility = 'visible';
        console.log(token);
        setInterval(() => {
            fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
             })
             .then(response => response.json())
             .then(dati => {
                token = dati;
                console.log(dati);
             })
        }, token.expires_in * 1000)
     })
}

function searchArtist(artistName) {
    /*
    curl --request GET \
    --url 'https://api.spotify.com/v1/search?q=queen&type=artist' \
    --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
    */

    fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
        headers: {
            'Authorization': `${token.token_type} ${token.access_token}`
        }
    })
    .then(response => response.json())
    .then(dati => {
        console.log(dati.artists.items);
        let main = document.getElementById('main');
        main.appendChild(artistGrid(dati.artists.items));
    })
}

function searchClick() {
    let artistname = document.getElementById('artistname').value;
    searchArtist(artistname);
}

function artistCard(artist) {
    /*
    <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>    
    </div>
    */
    let card = document.createElement('div');
    card.className = 'card';
    if (artist.images.length > 0) {
        let img = document.createElement('img');
        img.src = artist.images[1].url;
        img.className = 'card-img-top';
        img.alt = artist.name;
        card.appendChild(img);
    }
    let cardbody = document.createElement('div');
    cardbody.className = 'card-body';
    let cardtitle = document.createElement('h5');
    cardtitle.className = 'card-title';
    cardtitle.innerText = artist.name;
    cardbody.appendChild(cardtitle);
    let cardtext = document.createElement('p');
    cardtext.className = 'card-text';
    cardtext.innerHTML = 'Popularity: ' + artist.popularity + '<br>' + getGenres(artist.genres);
    cardbody.appendChild(cardtext);
    // definire il bottone in modo dinamico
    let button = document.createElement('button');
    button.innerText = 'Albums';
    button.className = 'btn btn-primary';
    button.onclick = () => {
        getAlbums(artist.id, artist.name);
    }
    cardbody.appendChild(button);
    card.appendChild(cardbody);
    return card;
}

function albumCard(album) {
    /*
    <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>    
    </div>
    */
    let card = document.createElement('div');
    card.className = 'card';
    if (album.images.length > 0) {
        let img = document.createElement('img');
        img.src = album.images[1].url;
        img.className = 'card-img-top';
        img.alt = album.name;
        card.appendChild(img);
    }
    let cardbody = document.createElement('div');
    cardbody.className = 'card-body';
    let cardtitle = document.createElement('h5');
    cardtitle.className = 'card-title';
    cardtitle.innerText = album.name;
    cardbody.appendChild(cardtitle);
    let cardtext = document.createElement('p');
    cardtext.className = 'card-text';
    cardtext.innerHTML = 'Release date: ' + album.release_date + '<br /> Total tracks: ' + album.total_tracks;
    cardbody.appendChild(cardtext);
    // definire il bottone in modo dinamico
    let button = document.createElement('button');
    button.innerText = 'Tracks';
    button.className = 'btn btn-primary';
    button.onclick = () => {
        getTracks(album.id);
    }
    cardbody.appendChild(button);
    card.appendChild(cardbody);
    return card;
}

function getAlbums(artistId, artistName) {
    /*
        curl --request GET \
        --url https://api.spotify.com/v1/artists/0TnOYISbd1XYRBk9myaseg/albums \
        --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
    */

    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
        headers: {
            'Authorization': `${token.token_type} ${token.access_token}`
        }
    })
    .then(response => response.json())
    .then(dati => {
        let main = document.getElementById('main');
        main.innerHTML = '';
        let banner = document.createElement('div');
        banner.className = 'mb-3 border-bottom';
        banner.innerHTML = `<h2 class="display-3">${artistName}</h2>`;
        main.appendChild(banner);
        main.appendChild(albumGrid(dati.items));
        console.log(dati);        
    })

    console.log(artistId);
}

function artistGrid(artists){
    let row = document.createElement('div');
    row.className = 'row';
    artists.forEach(artist => {
        let col = document.createElement('div');
        col.className = 'col-sm-4 mb-3';
        col.appendChild(artistCard(artist));
        row.appendChild(col);
    });    
    return row;
}

function getTracks(albumId) {
    /*
    curl --request GET \
        --url https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks \
        --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
    */

    fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
        headers: {
            'Authorization': `${token.token_type} ${token.access_token}`
        }
    })
    .then(response => response.json())
    .then(dati => {
       /*  let main = document.getElementById('main');
        main.innerHTML = '';
        let banner = document.createElement('div');
        banner.className = 'mb-3 border-bottom';
        banner.innerHTML = `<h2 class="display-3">${artistName}</h2>`;
        main.appendChild(banner);
        main.appendChild(albumGrid(dati.items)); */
        console.log(dati);        
    })

    console.log(albumId);
}

function albumGrid(albums){
    let row = document.createElement('div');
    row.className = 'row';
    albums.forEach(album => {
        let col = document.createElement('div');
        col.className = 'col-sm-4 mb-3';
        col.appendChild(albumCard(album));
        row.appendChild(col);
    });    
    return row;
}

function getGenres(genres) {
    let text = 'Genres: ';
    genres.forEach(genre => {
        text += genre + ', ';
    });
    return text;
}

getToken();

