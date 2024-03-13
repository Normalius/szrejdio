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

// Skrypt JavaScript do aktualizacji statystyk radia

// Funkcja do pobierania statystyk radia z serwera Shoutcast
function fetchRadioStats() {
    // Tutaj będziemy pobierać dane z serwera Shoutcast i aktualizować elementy HTML
    // Użyjemy odpowiednich metod do komunikacji z serwerem, na przykład fetch lub AJAX
    // Poniżej znajdziesz przykładowy kod, którego możesz użyć

    // Wartości przykładowe dla testowania
    const radioStats = {
        radioName: "SZRejdio",
        host: "John Doe",
        listeners: 50,
        maxListeners: 100,
        currentListeners: 45
    };

    // Aktualizacja elementów HTML z pobranymi statystykami
    document.getElementById("radioName").textContent = radioStats.radioName;
    document.getElementById("host").textContent = radioStats.host;
    document.getElementById("listeners").textContent = radioStats.listeners;
    document.getElementById("maxListeners").textContent = radioStats.maxListeners;
    document.getElementById("currentListeners").textContent = radioStats.currentListeners;
}

// Wywołanie funkcji do pobierania statystyk radia po załadowaniu strony
window.addEventListener("load", fetchRadioStats);
