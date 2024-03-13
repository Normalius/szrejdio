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
        // Dane z serwera Shoutcast
        const responseXML = `
            <SHOUTCASTSERVER>
                <CURRENTLISTENERS>1</CURRENTLISTENERS>
                <PEAKLISTENERS>2</PEAKLISTENERS>
                <MAXLISTENERS>50</MAXLISTENERS>
                <UNIQUELISTENERS>1</UNIQUELISTENERS>
                <AVERAGETIME>33</AVERAGETIME>
                <SERVERGENRE>Misc</SERVERGENRE>
                <SERVERURL>https://normalius.github.io/szrejdio/</SERVERURL>
                <SERVERTITLE>Audycja</SERVERTITLE>
                <SONGTITLE>cute trance song catJAM</SONGTITLE>
                <DJ>Test</DJ>
                <STREAMUPTIME>3186</STREAMUPTIME>
                <BITRATE>96</BITRATE>
                <SAMPLERATE>44100</SAMPLERATE>
                <CONTENT>audio/mpeg</CONTENT>
                <VERSION>2.6.1.777 (posix(linux x64))</VERSION>
            </SHOUTCASTSERVER>
        `;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseXML, "text/xml");

        // Aktualizacja elementów na stronie z danymi statystycznymi
        document.getElementById("currentListeners").innerText = xmlDoc.getElementsByTagName("CURRENTLISTENERS")[0].textContent;
        document.getElementById("peakListeners").innerText = xmlDoc.getElementsByTagName("PEAKLISTENERS")[0].textContent;
        document.getElementById("maxListeners").innerText = xmlDoc.getElementsByTagName("MAXLISTENERS")[0].textContent;
        document.getElementById("uniqueListeners").innerText = xmlDoc.getElementsByTagName("UNIQUELISTENERS")[0].textContent;
        document.getElementById("songTitle").innerText = xmlDoc.getElementsByTagName("SONGTITLE")[0].textContent;
        document.getElementById("djName").innerText = xmlDoc.getElementsByTagName("DJ")[0].textContent;
    }

    // Wywołanie funkcji do pobrania statystyk po załadowaniu strony
    fetchRadioStats();
});
