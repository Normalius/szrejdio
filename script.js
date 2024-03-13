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

document.addEventListener("DOMContentLoaded", function() {
    // Funkcja pobierająca statystyki radia z serwera Shoutcast
    function fetchRadioStats() {
        // Dane do uwierzytelnienia na serwerze Shoutcast
        const authPassword = "Rhkde8TaBTBr"; // Hasło do nadawania
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
                const stats = xmlResponse.getElementsByTagName("SHOUTCASTSERVER")[0];
                
                // Pobieranie danych statystycznych
                const currentListeners = stats.getElementsByTagName("CURRENTLISTENERS")[0].textContent;
                const peakListeners = stats.getElementsByTagName("PEAKLISTENERS")[0].textContent;
                const maxListeners = stats.getElementsByTagName("MAXLISTENERS")[0].textContent;
                const uniqueListeners = stats.getElementsByTagName("UNIQUELISTENERS")[0].textContent;
                const serverGenre = stats.getElementsByTagName("SERVERGENRE")[0].textContent;
                const serverURL = stats.getElementsByTagName("SERVERURL")[0].textContent;
                const serverTitle = stats.getElementsByTagName("SERVERTITLE")[0].textContent;
                const songTitle = stats.getElementsByTagName("SONGTITLE")[0].textContent;
                const dj = stats.getElementsByTagName("DJ")[0].textContent;

                // Aktualizacja elementów na stronie z pobranymi danymi
                document.getElementById("currentListeners").innerText = currentListeners;
                document.getElementById("peakListeners").innerText = peakListeners;
                document.getElementById("maxListeners").innerText = maxListeners;
                document.getElementById("uniqueListeners").innerText = uniqueListeners;
                document.getElementById("serverGenre").innerText = serverGenre;
                document.getElementById("serverURL").innerText = serverURL;
                document.getElementById("serverTitle").innerText = serverTitle;
                document.getElementById("songTitle").innerText = songTitle;
                document.getElementById("dj").innerText = dj;
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

    // Funkcja do regularnego odświeżania danych co określony czas (np. co 10 sekund)
    function refreshStatsInterval() {
        fetchRadioStats(); // Wywołanie funkcji pobierającej statystyki po raz pierwszy
        
        // Ustawienie interwału odświeżania co 10 sekund
        setInterval(fetchRadioStats, 10000); // 10000 ms = 10 sekund
    }

    // Wywołanie funkcji do regularnego odświeżania danych po załadowaniu strony
    refreshStatsInterval();
});
