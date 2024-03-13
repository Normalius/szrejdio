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

// Funkcja pobierająca statystyki radia z serwera Shoutcast
function fetchRadioStats() {
    // Dane do uwierzytelnienia na serwerze Shoutcast
    const authPassword = "XagDuJ7kSJGp"; // Hasło do nadawania
    const serverAddress = "s3.slotex.pl"; // Adres serwera Shoutcast
    const serverPort = 7466; // Port serwera Shoutcast
    const streamID = 1; // ID strumienia

    // Tworzenie zapytania HTTP do pobrania statystyk radia
    const request = new XMLHttpRequest();
    const url = `http://${serverAddress}:${serverPort}/admin.cgi?pass=${authPassword}&mode=viewxml&sid=${streamID}`;
    request.open("GET", url, true);

    // Obsługa odpowiedzi z serwera Shoutcast
    request.onload = function () {
        if (request.status === 200) {
            const xmlResponse = request.responseXML;
            const stats = xmlResponse.getElementsByTagName("STREAM")[0];
            
            // Pobieranie danych statystycznych z XML
            const radioName = stats.getElementsByTagName("SERVERTITLE")[0].textContent;
            const host = stats.getElementsByTagName("DJ")[0].textContent;
            const listeners = stats.getElementsByTagName("CURRENTLISTENERS")[0].textContent;
            const maxListeners = stats.getElementsByTagName("MAXLISTENERS")[0].textContent;

            // Aktualizacja elementów na stronie z pobranymi danymi
            document.getElementById("radioName").innerText = radioName;
            document.getElementById("host").innerText = host;
            document.getElementById("listeners").innerText = listeners;
            document.getElementById("maxListeners").innerText = maxListeners;
        } else {
            console.error("Błąd podczas pobierania danych statystycznych radia:", request.statusText);
        }
    };

    // Obsługa błędów
    request.onerror = function () {
        console.error("Błąd podczas komunikacji z serwerem Shoutcast.");
    };

    // Wysłanie zapytania HTTP
    request.send();
}

// Wywołanie funkcji pobierającej statystyki radia po załadowaniu strony
window.onload = fetchRadioStats;
