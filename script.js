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

document.addEventListener("DOMContentLoaded", function() {
  var slider = document.getElementById("volumeRange");
  var volumeTooltip = document.getElementById("volumeTooltip"); // Zmieniona nazwa zmiennej dla tooltipa

  slider.oninput = function() {
    var volume = this.value;
    volumeTooltip.innerHTML = volume; // Ustawia wartość głośności wewnątrz tooltipa
    volumeTooltip.classList.add("show"); // Wyświetla tooltip
    var sliderRect = slider.getBoundingClientRect();
    volumeTooltip.style.left = (sliderRect.left + sliderRect.width / 2) + "px"; // Pozycjonuje tooltip nad suwakiem
    volumeTooltip.style.top = (sliderRect.top - 20) + "px";
    setTimeout(function() {
      volumeTooltip.classList.remove("show"); // Ukrywa tooltip po pewnym czasie
    }, 1000);
  };

    // Ustawianie głośności odtwarzania radia
    if (radioPlayer) {
      radioPlayer.volume = volume / 100;
    }
  };
});
    
});

