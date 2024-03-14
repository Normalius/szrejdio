// Dane statystyczne radia
const radioStats = {
    serverTitle: "Autopilot",
    currentListeners: 0,
    peakListeners: 0,
    maxListeners: 50,
    host: "",
    currentSong: ""
};

// Funkcja do aktualizacji danych statystycznych na stronie
function updateRadioStats() {
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
        // Aktualizacja danych statystycznych radia
        if (data && data.streams && data.streams.length > 0) {
            radioStats.serverTitle = data.streams[0].servertitle || "Brak danych";
            radioStats.currentListeners = data.currentlisteners || 0;
            radioStats.peakListeners = data.peaklisteners || 0;
            radioStats.maxListeners = data.maxlisteners || 50;
            radioStats.host = data.streams[0].dj || "";
            radioStats.currentSong = data.streams[0].songtitle || "Brak danych";
        }
        
        // Aktualizacja danych na stronie
        updateRadioStats();
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

// Przykładowe dane audycji na żywo
const liveShows = [
    { title: "Poranek z Radiem", startTime: "2024-03-15T08:00:00" },
    { title: "Popołudniowa fala", startTime: "2024-03-15T16:00:00" }
];

// Funkcja do wyświetlania nadchodzących audycji na żywo
function displayLiveShows() {
    const liveShowList = document.getElementById("live-show-list");
    liveShowList.innerHTML = ""; // Wyczyść listę przed aktualizacją

    liveShows.forEach(show => {
        const listItem = document.createElement("li");
        const titleSpan = document.createElement("span");
        const timeElement = document.createElement("time");

        titleSpan.textContent = show.title;
        timeElement.textContent = new Date(show.startTime).toLocaleString();

        listItem.appendChild(titleSpan);
        listItem.appendChild(timeElement);

        liveShowList.appendChild(listItem);
    });
}

// Wywołanie funkcji do wyświetlania nadchodzących audycji po załadowaniu strony
displayLiveShows();
