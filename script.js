onst sliderThumb = document.getElementById('sliderThumb');
const sliderTrack = document.getElementById('sliderTrack');
const volumeUpIcon = document.getElementById('volumeUpIcon');
const volumeDownIcon = document.getElementById('volumeDownIcon');
const volumeMuteIcon = document.getElementById('volumeMuteIcon');
const volumeBar = document.getElementById('volumeBar');
const radioPlayer = document.getElementById('radioPlayer');

let previousVolume = 50;

// Wyciszanie dźwięku
volumeMuteIcon.addEventListener('click', toggleMute);

function toggleMute() {
  if (volumeMuteIcon.classList.contains('muted')) {
    volumeMuteIcon.classList.remove('muted');
    setVolume(previousVolume);
  } else {
    volumeMuteIcon.classList.add('muted');
    previousVolume = getVolume();
    setVolume(0);
  }
}

// Funkcje pomocnicze
function setVolume(volume) {
  radioPlayer.volume = volume / 100; // Ustawia poziom głośności dla elementu audio
  sliderThumb.style.left = `${volume}%`;
  sliderTrack.style.width = `${volume}%`;
  updateVolumeIcons(volume);
  updateVolumeBarColor(volume);
  saveVolumePreference(volume);
}

function getVolume() {
  return parseInt(sliderThumb.style.left.replace('%', '') || 50);
}

// Aktualizacja ikon głośności
function updateVolumeIcons(volume) {
  if (volume === 0) {
    volumeDownIcon.classList.remove('active');
    volumeUpIcon.classList.remove('active');
    volumeMuteIcon.classList.add('active');
  } else if (volume < 50) {
    volumeDownIcon.classList.add('active');
    volumeUpIcon.classList.remove('active');
    volumeMuteIcon.classList.remove('active');
  } else {
    volumeDownIcon.classList.remove('active');
    volumeUpIcon.classList.add('active');
    volumeMuteIcon.classList.remove('active');
  }
}

// Aktualizacja koloru paska w zależności od poziomu głośności
function updateVolumeBarColor(volume) {
  if (volume === 0) {
    sliderTrack.style.backgroundColor = '#ccc'; // Szary kolor dla wyciszenia
  } else if (volume < 30) {
    sliderTrack.style.backgroundColor = '#ff5733'; // Czerwony kolor dla niskiej głośności
  } else if (volume < 70) {
    sliderTrack.style.backgroundColor = '#ffd633'; // Żółty kolor dla średniej głośności
  } else {
    sliderTrack.style.backgroundColor = '#1aff66'; // Zielony kolor dla wysokiej głośności
  }
}

// Zapisywanie preferencji użytkownika
function saveVolumePreference(volume) {
  localStorage.setItem('volumePreference', volume);
}

// Odczytanie preferencji użytkownika
function getVolumePreference() {
  return localStorage.getItem('volumePreference');
}

// Wyświetlanie podpowiedzi przy najechaniu kursorem
volumeBar.addEventListener('mouseover', function() {
  const volume = sliderThumb.style.left.replace('%', '') || 50;
  volumeBar.title = `Current volume: ${volume}%`;
});

// Inicjalizacja paska głośności
function initVolumeBar() {
  const savedVolume = getVolumePreference();
  const initialVolume = savedVolume ? savedVolume : 50;
  const initialPercentage = `${initialVolume}%`;
  
  sliderThumb.style.left = initialPercentage;
  sliderTrack.style.width = initialPercentage;
  
  updateVolumeIcons(initialVolume);
  updateVolumeBarColor(initialVolume);
}

initVolumeBar();

// Obsługa przeciągania paska głośności
sliderThumb.addEventListener('mousedown', startDragging);

function startDragging(e) {
  document.addEventListener('mousemove', dragThumb);
  document.addEventListener('mouseup', stopDragging);
}

function stopDragging() {
  document.removeEventListener('mousemove', dragThumb);
}

function dragThumb(e) {
  const offsetX = e.clientX - volumeBar.getBoundingClientRect().left;
  const percentage = Math.min(100, Math.max(0, (offsetX / volumeBar.offsetWidth) * 100));
  
  setVolume(percentage);
}

// Dodaj obsługę kliknięcia w dowolnym punkcie paska głośności
volumeBar.addEventListener('click', function(e) {
    // Oblicz poziom głośności na podstawie pozycji kliknięcia
    const offsetX = e.clientX - volumeBar.getBoundingClientRect().left;
    const percentage = Math.min(100, Math.max(0, (offsetX / volumeBar.offsetWidth) * 100));
    
    // Ustaw nowy poziom głośności
    setVolume(percentage);
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
