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
                const newComment = {
                    text: commentText,
                    author: "Autor", // Tutaj można umieścić nazwę aktualnie zalogowanego użytkownika
                    date: new Date().toLocaleString()
                };
                saveComment(newComment); // Zapisz komentarz w IndexedDB
                appendComment(newComment); // Dodaj komentarz do interfejsu użytkownika
                textarea.value = ''; // Czyszczenie pola tekstowego po dodaniu komentarza
            }
        });
    });

    // Wczytaj komentarze po załadowaniu strony
    loadComments();

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

// Funkcja do zapisywania komentarza w IndexedDB
function saveComment(comment) {
    const request = indexedDB.open('commentsDB', 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        const objectStore = db.createObjectStore('comments', { keyPath: 'id', autoIncrement:true });
        objectStore.createIndex('text', 'text', { unique: false });
        objectStore.createIndex('author', 'author', { unique: false });
        objectStore.createIndex('date', 'date', { unique: false });
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['comments'], 'readwrite');
        const objectStore = transaction.objectStore('comments');
        objectStore.add(comment);
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.error);
    };
}

// Funkcja do wczytywania komentarzy z IndexedDB
function loadComments() {
    const request = indexedDB.open('commentsDB', 1);

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['comments'], 'readonly');
        const objectStore = transaction.objectStore('comments');
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = function(event) {
            const comments = event.target.result;
            comments.forEach(comment => {
                appendComment(comment);
            });
        };
    };

    request.onerror = function(event) {
        console.error('IndexedDB error:', event.target.error);
    };
}
// Funkcja do dodawania komentarza do interfejsu użytkownika
function appendComment(comment) {
    const commentList = document.querySelector('.comment-list');
    const newComment = document.createElement('li');
    newComment.classList.add('comment-item');
    newComment.innerHTML = `
        <p class="comment-text">${comment.text}</p>
        <span class="comment-author">${comment.author}</span>
        <span class="comment-date">${comment.date}</span>
    `;
    commentList.appendChild(newComment);
}

// Funkcja do aktualizowania statystyk radia
function updateRadioStats(data) {
    document.getElementById("radioName").textContent = data.name;
    document.getElementById("host").textContent = data.host;
    document.getElementById("listeners").textContent = data.listeners;
    document.getElementById("maxListeners").textContent = data.maxListeners;
    document.getElementById("currentListeners").textContent = data.currentListeners;
}
