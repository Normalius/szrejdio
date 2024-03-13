<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Statystyki Radia</title>
</head>
<body>
    <div id="radioStats">
        <h2>Statystyki Radia</h2>
        <ul>
            <li>Nazwa: <span id="radioName">...</span></li>
            <li>Prowadzący: <span id="host">...</span></li>
            <li>Słucha: <span id="listeners">...</span></li>
            <li>Maxymalnie słuchało: <span id="maxListeners">...</span></li>
            <li>Aktualnie: <span id="currentListeners">...</span></li>
        </ul>
    </div>

    <script>
        // Funkcja pobierająca statystyki radia z serwera Shoutcast 2
        function fetchRadioStats() {
            // Adres URL do pobrania danych statystycznych z serwera Shoutcast 2
            const url = "http://adres_twojego_serwera:port/stats?sid=1";

            // Wywołanie żądania HTTP GET do serwera
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                }) // Parsowanie odpowiedzi jako JSON
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
    </script>
</body>
</html>
