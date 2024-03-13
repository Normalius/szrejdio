document.addEventListener("DOMContentLoaded", function() {
    const radioNameElement = document.getElementById("radioName");
    const hostElement = document.getElementById("host");
    const listenersElement = document.getElementById("listeners");
    const maxListenersElement = document.getElementById("maxListeners");
    const currentListenersElement = document.getElementById("currentListeners");
    const greetingModal = document.getElementById("greetingModal");
    const songModal = document.getElementById("songModal");
    const openGreetingModalButton = document.getElementById("openGreetingModal");
    const openSongModalButton = document.getElementById("openSongModal");
    const closeButtons = document.querySelectorAll(".close");

    openGreetingModalButton.addEventListener("click", function() {
        greetingModal.style.display = "block";
    });

    openSongModalButton.addEventListener("click", function() {
        songModal.style.display = "block";
    });

    closeButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            greetingModal.style.display = "none";
            songModal.style.display = "none";
        });
    });

    // Dane statystyk radia
    const radioData = {
        name: "SZRejdio",
        host: "John Doe",
        listeners: 150,
        maxListeners: 200,
        currentListeners: 180
    };

    updateRadioStats(radioData);
});

// Funkcja do aktualizowania statystyk radia
function updateRadioStats(data) {
    document.getElementById("radioName").textContent = data.name;
    document.getElementById("host").textContent = data.host;
    document.getElementById("listeners").textContent = data.listeners;
    document.getElementById("maxListeners").textContent = data.maxListeners;
    document.getElementById("currentListeners").textContent = data.currentListeners;
}
// Pobieranie danych ze zdalnego serwera Shoutcast
function fetchRadioStats() {
    const url = 'http://145.239.26.150:7466/stats';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            updateRadioStats(data);
        })
        .catch(error => {
            console.error('Błąd pobierania danych z serwera Shoutcast:', error);
        });
}

// Aktualizacja statystyk radia na stronie
function updateRadioStats(data) {
    document.getElementById('radioName').textContent = data.server_name;
    document.getElementById('listeners').textContent = data.currentlisteners;
    document.getElementById('maxListeners').textContent = data.maxlisteners;
    document.getElementById('radioIP').textContent = '145.239.26.150';
}

// Pobieranie statystyk radia po załadowaniu strony
window.addEventListener('load', () => {
    fetchRadioStats();
    // Odświeżanie co 60 sekund
    setInterval(fetchRadioStats, 60000);
});

