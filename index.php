
<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nowy Układ Czcionek</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="icon" href="favicon.ico" type="image/x-icon">
</head>
<body>
<header id="sub-header">
    <div class="container">
        <div class="logo">
            <img src="images/logo.png" alt="Logo SZRejdio">
    </div>
        </div>
    </div>
</header>
<nav>
    <ul>
        <li><a href="#"><i class="fas fa-home"></i> Index</a></li>
        <li><a href="#"><i class="fas fa-newspaper"></i> Aktualności</a></li>
        <li><a href="#"><i class="fas fa-comments"></i> Forum</a></li>
        <li><a href="#"><i class="fas fa-headphones"></i> Jak słuchać?</a></li>
        <li><a href="#"><i class="fas fa-calendar-alt"></i> Ramówka</a></li>
        <li><a href="#"><i class="fas fa-users"></i> Ekipa</a></li>
        <li><a href="#"><i class="fas fa-music"></i> Audycje</a></li>
        <li><a href="#"><i class="fas fa-star"></i> Lista Przebojów</a></li>
        <li><a href="#"><i class="fas fa-question-circle"></i> Pomoc</a></li>
    </ul>
</nav>
<main>
    <section id="radio-stats">
        <h2>Statystyki Radia</h2>
        <ul>
            <li><span class="label">Prowadzący:</span> <span id="serverTitle">...</span></li>
            <li><span class="label">Liczba Słuchaczy:</span> <span id="currentListeners">...</span></li>
            <li><span class="label">Rekord ilości słuchaczy:</span> <span id="peakListeners">...</span></li>
            <li><span class="label">Maxymalna Liczba Słuchaczy:</span> <span id="maxListeners">...</span></li>
            <li><span class="label">Aktualna Piosenka:</span> <span id="currentSong">...</span></li>
        </ul>
    </section>
<div id="audioWrapper">
  <audio id="audioPlayer" controls>
    <source src="https://s3.slotex.pl:7466/;" type="audio/mpeg">
    Twoja przeglądarka nie obsługuje elementu audio.
  </audio>
</div>
    <section class="news-section">
        <h2>Aktualności</h2>
        <ul class="news-list">
            <li>
                <h3>Nowy program na antenie - "Szalona Niedziela"</h3>
                <p>Mamy przyjemność ogłosić premierę naszego najnowszego programu radiowego - "Szalona Niedziela"! To niezwykłe wydarzenie, które ma na celu zapewnić Ci rozrywkę i radość w każdą niedzielę wieczorem.</p>
                <p>W programie "Szalona Niedziela" możesz spodziewać się dynamicznej muzyki, fascynujących rozmów z gośćmi specjalnymi oraz konkursów z atrakcyjnymi nagrodami. Przygotuj się na niezapomniane doświadczenie, które sprawi, że każda niedziela stanie się wyjątkowa!</p>
                <p>Dołącz do nas już w najbliższą niedzielę o godzinie 20:00 i weź udział w szalonym show, które rozświetli Twój wieczór!</p>
                <p>Nie przegap premiery programu "Szalona Niedziela" tylko na SZRejdio!</p>
            </li>
        </ul>

<form action="add_comment.php" method="POST">
    <input type="hidden" name="news_id" value="1">
    <input type="hidden" name="user_id" value="1">
    <input type="text" name="username" placeholder="Twoja nazwa użytkownika" required><br> <!-- Dodajemy pole do wprowadzenia nazwy użytkownika -->
    <textarea name="content" placeholder="Dodaj komentarz" required></textarea>
    <button type="submit">Dodaj komentarz</button>
</form>

    <!-- Dodaj przyciski sortowania tutaj -->
    <div class="sort-buttons">
        <button onclick="sortComments('date')">Sortuj wg daty</button>
        <button onclick="sortComments('rating')">Sortuj wg oceny</button>
    </div>

<div id="comments-container">
    <h2>Komentarze:</h2>
<div id="comments-list">
    <!-- Tutaj będą wyświetlane komentarze -->
    <?php include 'show_comments.php'; ?>
</div>
</div>
<div class="pagination">
    <a href="?page=<?php echo $page - 1; ?>&limit=3">Poprzednia strona</a>
    <a href="?page=<?php echo $page + 1; ?>&limit=3">Następna strona</a>
</div>


    </section>
</main>
<footer class="footer">
    <div class="footer-container">
        <div class="footer-section">
            <h3>O Nas</h3>
            <p>Jesteśmy firmą zajmującą się...</p>
            <p>Nasze biuro znajdziesz pod adresem:</p>
            <p>ul. Przykładowa 123, 00-000 Warszawa</p>
        </div>
        <div class="footer-section">
            <h3>Linki Szybkiego Dostępu</h3>
            <ul>
                <li><a href="#">Warunki Korzystania</a></li>
                <li><a href="#">Polityka Prywatności</a></li>
                <li><a href="#">Regulaminy</a></li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Kontakt</h3>
            <p>Telefon: 123-456-789</p>
            <p>Email: kontakt@example.com</p>
        </div>
    </div>
    <div class="social-icons-right">
        <a href="#" class="social-icon facebook"><i class="fab fa-facebook-f"></i></a>
        <a href="#" class="social-icon instagram"><i class="fab fa-instagram"></i></a>
        <a href="#" class="social-icon discord"><i class="fab fa-discord"></i></a>
        <a href="#" class="social-icon twitter"><i class="fa-brands fa-x-twitter"></i></a>
    </div>
    <div class="back-to-top">
        <a href="#top">Do Góry</a>
    </div>
</footer>
<script src="script.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</body>
</html>
