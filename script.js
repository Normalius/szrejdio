document.addEventListener("DOMContentLoaded", function() {
    // Funkcja pobierająca statystyki radia z zewnętrznego źródła
    function fetchRadioStats() {
        // Adres URL do pobrania danych statystycznych z serwera Shoutcast2
        const url = "http://s3.slotex.pl:7466/stats?sid=1";

        // Wywołanie żądania HTTP GET do serwera
        fetch(url)
            .then(response => response.json()) // Parsowanie odpowiedzi jako JSON
            .then(data => {
                // Aktualizacja elementów na stronie z danymi statystycznymi
                document.getElementById("radioName").innerText = data.icestats.source.server_name;
                document.getElementById("host").innerText = data.icestats.source.listenurl;
                document.getElementById("listeners").innerText = data.icestats.source.listeners;
                document.getElementById("maxListeners").innerText = data.icestats.source.listener_peak;
                document.getElementById("currentListeners").innerText = data.icestats.source.listeners;
            })
            .catch(error => console.error("Błąd pobierania danych:", error));
    }

    // Wywołanie funkcji do pobrania statystyk po załadowaniu strony
    fetchRadioStats();

    // Odświeżanie danych co 60 sekund
    setInterval(fetchRadioStats, 60000);
});
