document.addEventListener("DOMContentLoaded", function() {
    // Funkcja pobierająca statystyki radia z serwera Shoutcast
    function fetchRadioStats() {
        // Dane z serwera Shoutcast
        const responseXML = `
            <SHOUTCASTSERVER>
                <STREAMSTATS>
                    <TOTALSTREAMS>1</TOTALSTREAMS>
                    <ACTIVESTREAMS>1</ACTIVESTREAMS>
                    <CURRENTLISTENERS>1</CURRENTLISTENERS>
                    <PEAKLISTENERS>2</PEAKLISTENERS>
                    <MAXLISTENERS>50</MAXLISTENERS>
                    <UNIQUELISTENERS>1</UNIQUELISTENERS>
                    <AVERAGETIME>9</AVERAGETIME>
                    <VERSION>2.6.1.777 (posix(linux x64))</VERSION>
                    <STREAM id="1">
                        <CURRENTLISTENERS>1</CURRENTLISTENERS>
                        <PEAKLISTENERS>2</PEAKLISTENERS>
                        <MAXLISTENERS>50</MAXLISTENERS>
                        <UNIQUELISTENERS>1</UNIQUELISTENERS>
                        <AVERAGETIME>9</AVERAGETIME>
                        <SERVERGENRE>Misc</SERVERGENRE>
                        <SERVERURL>https://normalius.github.io/szrejdio/</SERVERURL>
                        <SERVERTITLE>Audycja</SERVERTITLE>
                        <SONGTITLE>cute trance song catJAM</SONGTITLE>
                        <DJ>Test</DJ>
                        <STREAMHITS>44</STREAMHITS>
                        <STREAMSTATUS>1</STREAMSTATUS>
                        <BACKUPSTATUS>0</BACKUPSTATUS>
                        <STREAMLISTED>0</STREAMLISTED>
                        <STREAMLISTEDERROR>847993365</STREAMLISTEDERROR>
                        <STREAMPATH>/</STREAMPATH>
                        <STREAMUPTIME>362</STREAMUPTIME>
                        <BITRATE>96</BITRATE>
                        <SAMPLERATE>44100</SAMPLERATE>
                        <CONTENT>audio/mpeg</CONTENT>
                    </STREAM>
                </STREAMSTATS>
            </SHOUTCASTSERVER>
        `;
        
        // Parsowanie XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseXML, "text/xml");
        const stream = xmlDoc.querySelector("STREAM");

        // Aktualizacja elementów na stronie z danymi statystycznymi
        document.getElementById("radioName").innerText = stream.querySelector("SERVERTITLE").textContent;
        document.getElementById("host").innerText = stream.querySelector("DJ").textContent;
        document.getElementById("listeners").innerText = stream.querySelector("CURRENTLISTENERS").textContent;
        document.getElementById("maxListeners").innerText = stream.querySelector("MAXLISTENERS").textContent;
        document.getElementById("currentListeners").innerText = stream.querySelector("CURRENTLISTENERS").textContent;
    }

    // Wywołanie funkcji do pobrania statystyk po załadowaniu strony
    fetchRadioStats();
});
