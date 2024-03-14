// Dane statystyczne radia
const radioStats = {
    serverTitle: "Audycja",
    currentListeners: 0,
    peakListeners: 0,
    maxListeners: 50,
    host: "",
    currentSong: ""
};

// Funkcja do aktualizacji danych statystycznych na stronie
function updateRadioStats() {
    document.getElementById("serverTitle").innerText = radioStats.serverTitle;
    document.getElementById("currentListeners").innerText = radioStats.currentListeners;
    document.getElementById("peakListeners").innerText = radioStats.peakListeners;
    document.getElementById("maxListeners").innerText = radioStats.maxListeners;
    document.getElementById("host").innerText = radioStats.host;
    document.getElementById("currentSong").innerText = radioStats.currentSong;
}

// Funkcja do pobierania danych statystycznych radia z serwera
function fetchRadioStats() {
    const shoutcastUrl = 'http://s3.slotex.pl:7466/'; // URL serwera Shoutcast

    // Wywołanie żądania HTTP GET za pośrednictwem CORS Anywhere
    fetch(corsAnywhereUrl + shoutcastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }) // Parsowanie odpowiedzi jako JSON
        .then(data => {
            // Aktualizacja danych statystycznych radia
            radioStats.serverTitle = data.streams[0].servertitle || "Brak danych";
            radioStats.currentListeners = data.currentlisteners || 0;
            radioStats.peakListeners = data.peaklisteners || 0;
            radioStats.maxListeners = data.maxlisteners || 50;
            radioStats.host = data.streams[0].dj || "Brak danych";
            radioStats.currentSong = data.streams[0].songtitle || "Brak danych";
            
            // Aktualizacja danych na stronie
            updateRadioStats();
        })
        .catch(error => console.error("Błąd pobierania danych:", error));
}

// Wywołanie funkcji do pobrania danych statystycznych po załadowaniu strony
fetchRadioStats();

// Odświeżanie danych co 60 sekund
setInterval(fetchRadioStats, 60000);
