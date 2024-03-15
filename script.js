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

// Skrypt JavaScript dla animacji spirali
document.getElementById('play').addEventListener('click', function() {
    // Pobierz element przycisku
    var button = document.getElementById('play');
    // Zmiana kierunku spirali
    var direction = 1; // 1 dla spirali do przodu, -1 dla spirali do tyłu
    // Pobierz początkową wartość transformacji
    var transformValue = button.style.getPropertyValue('transform');
    // Pobierz kąt początkowy z transformacji
    var initialAngle = 0;
    if (transformValue) {
        // Jeśli transformacja istnieje, pobierz kąt z niej
        var match = transformValue.match(/rotate\((\d+)deg\)/);
        if (match && match.length > 1) {
            initialAngle = parseInt(match[1]);
        }
    }
    // Uruchom animację spirali
    animateSpiral(button, initialAngle, direction);
});

function animateSpiral(element, initialAngle, direction) {
    // Ustaw zmienne do obliczeń spirali
    var radius = 50; // Promień spirali
    var speed = 0.5; // Szybkość ruchu spirali
    var angle = initialAngle; // Aktualny kąt spirali

    // Rozpocznij animację
    var animationId = setInterval(frame, 10);

    function frame() {
        // Oblicz nowe położenie spirali
        angle += speed * direction;
        var x = radius * Math.cos(angle * Math.PI / 180); // Współrzędna X
        var y = radius * Math.sin(angle * Math.PI / 180); // Współrzędna Y
        // Ustaw nową transformację dla elementu
        element.style.transform = 'translate(' + x + 'px, ' + y + 'px) rotate(' + angle + 'deg)';
    }
}    
});
