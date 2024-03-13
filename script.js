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

    // Dane statystyk radia
    const radioData = {
        name: "SZRejdio",
        host: "John Doe",
        listeners: 150,
        maxListeners: 200,
        currentListeners: 180
    };

    updateRadioStats(radioData);
});

// Funkcja do aktualizowania statystyk radia
function updateRadioStats(data) {
    document.getElementById("radioName").textContent = data.name;
    document.getElementById("host").textContent = data.host;
    document.getElementById("listeners").textContent = data.listeners;
    document.getElementById("maxListeners").textContent = data.maxListeners;
    document.getElementById("currentListeners").textContent = data.currentListeners;
}
