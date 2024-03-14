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

// Funkcja do pobierania danych statystycznych radia z serwera za pomocą JSONP
function fetchRadioStats() {
    // URL serwera Shoutcast
    const shoutcastUrl = 'http://s3.slotex.pl:7466/stats?sid=1&pass=XagDuJ7kSJGp&json=1&callback=func';

    // Tworzymy funkcję callback, która zostanie wywołana po otrzymaniu danych
    const callbackName = 'handleRadioStats';
    window[callbackName] = function(data) {
        // Aktualizacja danych statystycznych radia
        radioStats.serverTitle = data.streams[0].servertitle || "Brak danych";
        radioStats.currentListeners = data.currentlisteners || 0;
        radioStats.peakListeners = data.peaklisteners || 0;
        radioStats.maxListeners = data.maxlisteners || 50;
        radioStats.host = data.streams[0].dj || "Brak danych";
        radioStats.currentSong = data.streams[0].songtitle || "Brak danych";
        
        // Aktualizacja danych na stronie
        updateRadioStats();
    };

    // Tworzymy element skryptu i dodajemy go do dokumentu
    const script = document.createElement('script');
    script.src = shoutcastUrl + '&callback=' + callbackName;
    document.body.appendChild(script);
}

// Wywołanie funkcji do pobrania danych statystycznych po załadowaniu strony
fetchRadioStats();

// Odświeżanie danych co 60 sekund
setInterval(fetchRadioStats, 60000);
