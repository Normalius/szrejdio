// Dane statystyczne radia
const radioStats = {
    serverTitle: "Autopilot",
    currentListeners: 0,
    peakListeners: 0,
    maxListeners: 50,
    host: "",
    currentSong: ""
};

// Funkcja do aktualizacji danych statystycznych na stronie
function updateRadioStats() {
    const serverTitleElement = document.getElementById("serverTitle");
    if (serverTitleElement) serverTitleElement.innerText = radioStats.serverTitle;

    const currentListenersElement = document.getElementById("currentListeners");
    if (currentListenersElement) currentListenersElement.innerText = radioStats.currentListeners;

    const peakListenersElement = document.getElementById("peakListeners");
    if (peakListenersElement) peakListenersElement.innerText = radioStats.peakListeners;

    const maxListenersElement = document.getElementById("maxListeners");
    if (maxListenersElement) maxListenersElement.innerText = radioStats.maxListeners;

    const hostElement = document.getElementById("host");
    if (hostElement) hostElement.innerText = radioStats.host ? radioStats.host : "Autopilot";

    const currentSongElement = document.getElementById("currentSong");
    if (currentSongElement) currentSongElement.innerText = radioStats.currentSong ? radioStats.currentSong : "Brak danych";
}

// Funkcja do pobierania danych statystycznych radia z serwera za pomocą JSONP
function fetchRadioStats() {
    // URL serwera Shoutcast
    const shoutcastUrl = 'https://s3.slotex.pl:7466/statistics?json=1';

    // Tworzymy funkcję callback, która zostanie wywołana po otrzymaniu danych
    const callbackName = 'handleRadioStats';
    window[callbackName] = function(data) {
        try {
            // Aktualizacja danych statystycznych radia
            if (data && data.streams && data.streams.length > 0) {
                radioStats.serverTitle = data.streams[0].servertitle || "Brak danych";
                radioStats.currentListeners = data.currentlisteners || 0;
                radioStats.peakListeners = data.peaklisteners || 0;
                radioStats.maxListeners = data.maxlisteners || 50;
                radioStats.host = data.streams[0].dj || "";
                radioStats.currentSong = data.streams[0].songtitle || "Brak danych";
            } else {
                throw new Error("Nieprawidłowe dane otrzymane z serwera.");
            }
        } catch (error) {
            console.error("Wystąpił błąd podczas aktualizacji danych:", error.message);
        }
        
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

// Zmienna do przechowywania informacji o stanie przycisku
let isPlaying = false;

// Funkcja obsługująca kliknięcie przycisku "Stop" lub "Play"
function toggleRadio() {
    const playButton = document.getElementById('play');
    if (isPlaying) {
        // Tutaj dodajemy kod do zatrzymania odtwarzania radia
        // np. radio.stop();

        // Zmiana ikony przycisku na "Play"
        playButton.innerHTML = '<i class="fas fa-play"></i> Play';
    } else {
        // Tutaj dodajemy kod do ponownego rozpoczęcia odtwarzania radia
        // np. radio.play();

        // Zmiana ikony przycisku na "Stop"
        playButton.innerHTML = '<i class="fas fa-stop"></i> Stop';
    }

    // Odwrócenie stanu przycisku
    isPlaying = !isPlaying;
}

// Nasłuchujemy kliknięcia na przycisku
document.getElementById('play').addEventListener('click', toggleRadio);

window.addEventListener('scroll', function() {
    var topBar = document.getElementById('top-bar');
    if (window.scrollY > 100) { // Po przewinięciu o 100 pikseli
        topBar.classList.add('transparent'); // Dodaj klasę transparent
    } else {
        topBar.classList.remove('transparent'); // Usuń klasę transparent
    }
});
