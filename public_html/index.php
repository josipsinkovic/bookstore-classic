<?php
session_start();
?>

<!DOCTYPE html>
<html lang="hr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/base.css">
    <script src="/assets/js/fetch_books.js"></script>
    <script src="https://kit.fontawesome.com/8bbbed924d.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <?php require_once('includes/header.php'); ?>
    </header>
    <main>
        <div id="4" class="books">
            <img src="" alt="">
            <h4 class="book-name"></h4>
            <p class="book-author"></p>
            <p class="book-price"></p>
        </div>
        <div id="1" class="books">
            <img src="" alt="">
            <h4 class="book-name"></h4>
            <p class="book-author"></p>
            <p class="book-price"></p>
        </div>
        <div id="3" class="books">
            <img src="" alt="">
            <h4 class="book-name"></h4>
            <p class="book-author"></p>
            <p class="book-price"></p>
        </div>
    </main>
    <footer>
        <?php require_once("includes/footer.php"); ?>
    </footer>
</body>
</html>