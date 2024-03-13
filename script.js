document.addEventListener("DOMContentLoaded", function() {
    const greetingModal = document.getElementById("greetingModal");
    const songModal = document.getElementById("songModal");
    const openGreetingModalButton = document.getElementById("openGreetingModal");
    const openSongModalButton = document.getElementById("openSongModal");
    const closeButtons = document.querySelectorAll(".close");
    const commentForms = document.querySelectorAll('.comment-form');

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

    // Obsługa przesłania formularza komentarza
    commentForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const textarea = this.querySelector('textarea');
            const commentText = textarea.value.trim();
            if (commentText !== '') {
                const commentList = this.nextElementSibling.querySelector('.comment-list');
                const newComment = document.createElement('li');
                newComment.classList.add('comment-item');
                newComment.innerHTML = `
                    <p class="comment-text">${commentText}</p>
                    <span class="comment-author">Autor</span>
                    <span class="comment-date">${new Date().toLocaleString()}</span>
                `;
                commentList.appendChild(newComment);
                textarea.value = ''; // Czyszczenie pola tekstowego po dodaniu komentarza
            }
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

    // Aktualizacja statystyk radia
    updateRadioStats(radioData);
});

// Funkcja do aktualizacji statystyk radia
function updateRadioStats(data) {
    document.getElementById("radioName").textContent = data.name;
    document.getElementById("host").textContent = data.host;
    document.getElementById("listeners").textContent = data.listeners;
    document.getElementById("maxListeners").textContent = data.maxListeners;
    document.getElementById("currentListeners").textContent = data.currentListeners;
}
