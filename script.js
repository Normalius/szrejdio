document.addEventListener("DOMContentLoaded", function() {
    // Funkcja pobierająca statystyki radia z zewnętrznego źródła
    function fetchRadioStats() {
        // Adres URL do pobrania danych statystycznych
        const url = "http://s3.slotex.pl:7466/statistics";

        // Wywołanie żądania HTTP GET do serwera
        fetch(url)
            .then(response => response.text())
            .then(data => {
                // Parsowanie danych tekstowych do XML
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data, "text/xml");
                const stream = xmlDoc.querySelector("STREAM");

                // Aktualizacja elementów na stronie z danymi statystycznymi
                document.getElementById("radioName").innerText = stream.querySelector("SERVERTITLE").textContent;
                document.getElementById("host").innerText = stream.querySelector("DJ").textContent;
                document.getElementById("listeners").innerText = stream.querySelector("CURRENTLISTENERS").textContent;
                document.getElementById("maxListeners").innerText = stream.querySelector("MAXLISTENERS").textContent;
                document.getElementById("currentListeners").innerText = stream.querySelector("CURRENTLISTENERS").textContent;
            })
            .catch(error => console.error("Błąd pobierania danych:", error));
    }

    // Wywołanie funkcji do pobrania statystyk po załadowaniu strony
    fetchRadioStats();

    // Odświeżanie danych co 60 sekund
    setInterval(fetchRadioStats, 60000);
});
