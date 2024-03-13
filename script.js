document.addEventListener("DOMContentLoaded", function() {
    // Logika dla przycisków "Pokaż komentarze"
    const showCommentsButtons = document.querySelectorAll('.show-comments');
    showCommentsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const commentSection = this.nextElementSibling;
            commentSection.classList.toggle('show');
        });
    });

    // Obsługa dodawania komentarzy
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const textarea = this.querySelector('textarea');
            const commentText = textarea.value.trim();
            if (commentText !== '') {
                const commentList = this.previousElementSibling;
                const newComment = document.createElement('li');
                newComment.classList.add('comment-item');
                newComment.innerHTML = `
                    <p class="comment-text">${commentText}</p>
                    <span class="comment-author">Autor</span>
                    <span class="comment-date">${new Date().toLocaleString()}</span>
                `;
                commentList.appendChild(newComment);
                textarea.value = ''; // Wyczyść pole textarea po dodaniu komentarza
            }
        });
    });

    // Kod dla modala z pozdrowieniami i piosenkami
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

function updateRadioStats(data) {
    document.getElementById("radioName").textContent = data.name;
    document.getElementById("host").textContent = data.host;
    document.getElementById("listeners").textContent = data.listeners;
    document.getElementById("maxListeners").textContent = data.maxListeners;
    document.getElementById("currentListeners").textContent = data.currentListeners;
}
