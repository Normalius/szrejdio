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
        // Zmienne do przechowywania danych o statystykach radia
        let currentListeners = 0;
        let peakListeners = 0;
        let maxListeners = 0;
        let uniqueListeners = 0;
        let songTitle = "N/A";
        let djName = "N/A";

        // Dane z serwera Shoutcast (zamień na odpowiednie dane z JSON)
        const responseJSON = '{"totalstreams":1,"activestreams":1,"currentlisteners":1,"peaklisteners":2,"maxlisteners":50,"uniquelisteners":1,"averagetime":24,"version":"2.6.1.777 (posix(linux x64))","streams":[{"id":1,"currentlisteners":1,"peaklisteners":2,"maxlisteners":50,"uniquelisteners":1,"averagetime":24,"servergenre":"Misc","servergenre2":"","servergenre3":"","servergenre4":"","servergenre5":"","serverurl":"https:\/\/normalius.github.io\/szrejdio\/","servertitle":"Audycja","songtitle":"cute trance song catJAM","dj":"Test","songurl":"","streamhits":30,"streamstatus":1,"backupstatus":0,"streamlisted":0,"streamlistederror":847993365,"streampath":"\/","streamuptime":1964,"bitrate":"96","samplerate":"44100","content":"audio\/mpeg"}]}';
        const data = JSON.parse(responseJSON);
        const stream = data.streams[0];

        // Aktualizacja zmiennych
        currentListeners = stream.currentlisteners;
        peakListeners = stream.peaklisteners;
        maxListeners = stream.maxlisteners;
        uniqueListeners = stream.uniquelisteners;
        songTitle = stream.songtitle;
        djName = stream.dj;

        // Aktualizacja elementów na stronie z danymi statystycznymi
        document.getElementById("currentListeners").innerText = currentListeners;
        document.getElementById("peakListeners").innerText = peakListeners;
        document.getElementById("maxListeners").innerText = maxListeners;
        document.getElementById("uniqueListeners").innerText = uniqueListeners;
        document.getElementById("songTitle").innerText = songTitle;
        document.getElementById("djName").innerText = djName;
    }

    // Funkcja do otwierania i zamykania modala z ustawieniami
    function openStatsModal() {
        document.getElementById("statsModal").style.display = "block";
        fetchRadioStats(); // Pobranie statystyk przy otwarciu modala
    }

    function closeStatsModal() {
        document.getElementById("statsModal").style.display = "none";
    }

    function openSettingsModal() {
        document.getElementById("settingsModal").style.display = "block";
    }

    function closeSettingsModal() {
        document.getElementById("settingsModal").style.display = "none";
    }

    // Wywołanie funkcji do pobrania statystyk po załadowaniu strony
    fetchRadioStats();
});
