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
    <link rel="stylesheet" href="/assets/css/product_page.css">
    <script src="/assets/js/fetch_products.js"></script>
    <script src="/assets/js/fetch_books.js"></script>
    <script src="/assets/js/reviews.js"></script>
    <script src="https://kit.fontawesome.com/8bbbed924d.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <?php require_once("../../../includes/header.php"); ?>
    </header>
    <main>
        <?php require_once("../../../includes/product_page.php"); ?>
    </main>
    <footer>
        <?php require_once("../../../includes/footer.php"); ?>
    </footer>
</body>
</html>