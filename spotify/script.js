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
        console.log(dati);
    })
}

getToken();
searchArtist('queen');

