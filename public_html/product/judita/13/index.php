<?php
session_start();
?>

<!DOCTYPE html>
<html lang="hr">
<head>
    <?php include('../../../includes/head.php'); ?>
    <title>Judita | Classic</title>
    <link rel="stylesheet" href="/assets/css/product_page.css">
    <script src="/assets/js/fetch_products.js"></script>
    <script src="/assets/js/fetch_books.js"></script>
    <script src="/assets/js/reviews.js"></script>
    <script src="/assets/js/cart.js"></script>
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