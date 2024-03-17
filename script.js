document.addEventListener("DOMContentLoaded", function() {
    const radioPlayer = document.getElementById('radioPlayer');
    const volumeSlider = document.getElementById('volumeSlider');
    const sliderTrack = document.getElementById('sliderTrack');
    const sliderThumb = document.getElementById('sliderThumb');
    const volumeMuteIcon = document.getElementById('volumeMuteIcon');
    const volumeUpIcon = document.getElementById('volumeUpIcon');

    // Ustawienie głośności na 100% po załadowaniu strony
    radioPlayer.volume = 1;

    // Funkcja do aktualizacji głośności na podstawie pozycji paska głośności
    function setVolume() {
        const volume = volumeSlider.value / 100; // Przeliczenie wartości z zakresu 0-100 na zakres 0-1
        radioPlayer.volume = volume;
    }

    // Funkcja do obsługi przycisku ściszania/włączania dźwięku
    function toggleMute() {
        if (radioPlayer.volume === 0) {
            // Jeśli dźwięk jest wyciszony, przywróć poprzednią głośność
            radioPlayer.volume = volumeSlider.value / 100;
            volumeMuteIcon.classList.remove('fa-volume-mute');
            volumeMuteIcon.classList.add('fa-volume-up');
        } else {
            // W przeciwnym razie wycisz dźwięk
            radioPlayer.volume = 0;
            volumeMuteIcon.classList.remove('fa-volume-up');
            volumeMuteIcon.classList.add('fa-volume-mute');
        }
    }

    // Obsługa przesuwania suwaka głośności
    volumeSlider.addEventListener('input', function() {
        setVolume();
    });

    // Obsługa kliknięcia na suwak głośności
    volumeSlider.addEventListener('mousedown', function() {
        setVolume();
    });

    // Obsługa kliknięcia na ikonę wyciszenia
    volumeMuteIcon.addEventListener('click', function() {
        toggleMute();
    });

    // Aktualizacja paska głośności na podstawie aktualnej głośności
    radioPlayer.addEventListener('volumechange', function() {
        const volume = radioPlayer.volume;
        volumeSlider.value = volume * 100; // Przeliczenie wartości z zakresu 0-1 na zakres 0-100

        // Aktualizacja wyglądu ikony wyciszenia w zależności od głośności
        if (volume === 0) {
            volumeMuteIcon.classList.remove('fa-volume-up');
            volumeMuteIcon.classList.add('fa-volume-mute');
        } else {
            volumeMuteIcon.classList.remove('fa-volume-mute');
            volumeMuteIcon.classList.add('fa-volume-up');
        }
    });
});

// Zmienna do przechowywania informacji o stanie przycisku
let isPlaying = false;

// Funkcja obsługująca kliknięcie przycisku "Stop" lub "Play"
function toggleRadio() {
    const playButton = document.getElementById('play');
    const radioPlayer = document.getElementById('radioPlayer');
    if (isPlaying) {
        // Zatrzymywanie odtwarzania radia
        radioPlayer.pause();

        // Zmiana ikony przycisku na "Play"
        playButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        // Rozpoczynanie odtwarzania radia
        radioPlayer.play();

        // Zmiana ikony przycisku na "Stop"
        playButton.innerHTML = '<i class="fas fa-stop"></i>';
    }

    // Odwrócenie stanu przycisku
    isPlaying = !isPlaying;
}

// Nasłuchujemy kliknięcia na przycisku
document.getElementById('play').addEventListener('click', toggleRadio);

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

// Obsługa przezroczystego paska nawigacji po przewinięciu strony
window.addEventListener('scroll', function() {
    var topBar = document.getElementById('top-bar');
    if (window.scrollY > 100) {
        topBar.classList.add('transparent');
    } else {
        topBar.classList.remove('transparent');
    }
});
