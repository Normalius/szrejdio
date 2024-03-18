// Funkcja do aktualizacji danych statystycznych na stronie
function updateRadioStats(radioStats) {
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
                const radioStats = {
                    serverTitle: data.streams[0].servertitle || "Brak danych",
                    currentListeners: data.currentlisteners || 0,
                    peakListeners: data.peaklisteners || 0,
                    maxListeners: data.maxlisteners || 50,
                    host: data.streams[0].dj || "",
                    currentSong: data.streams[0].songtitle || "Brak danych"
                };
                // Aktualizacja danych na stronie
                updateRadioStats(radioStats);
            } else {
                throw new Error("Nieprawidłowe dane otrzymane z serwera.");
            }
        } catch (error) {
            console.error("Wystąpił błąd podczas aktualizacji danych:", error.message);
        }
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

// Inicjalizacja odtwarzacza
var radio = new Howl({
    src: ['https://s3.slotex.pl/shoutcast/7466/stream?sid=1;'], // Źródło strumienia radiowego
    format: ['mp3'], // Format audio
    autoplay: false, // Czy odtwarzać automatycznie po załadowaniu
    volume: 1.0, // Głośność początkowa (od 0 do 1)
    html5: true // Użyj natywnego odtwarzacza HTML5
});

// Obsługa przycisku play/pause
var playPauseBtn = document.getElementById('playPauseBtn');
playPauseBtn.addEventListener('click', function() {
    if (radio.playing()) {
        radio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        radio.play();
        playPauseBtn.textContent = 'Pause';
    }
});

// Obsługa zmiany głośności
var volumeRange = document.querySelector('#volumeRange input[type="range"]');
volumeRange.addEventListener('input', function() {
    radio.volume(parseFloat(this.value) / 100);
});
