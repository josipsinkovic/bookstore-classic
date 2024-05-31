<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('../../includes/head.php'); ?>
    <title>Košarica | Classic</title>
    <link rel="stylesheet" href="/assets/css/checkout.css">
    <script src="/assets/js/cart.js"></script>
</head>
<body>
    <header>    
        <?php require_once("../../includes/header.php"); ?>
    </header>
    <main>
        <div class="container">
            <div class="cart-title">
                <h1>Košarica</h1>
            </div>
            <div class="cart-container">
                <div class="cart-no-products">
                    <p>Vaša košarica je trenutno prazna.</p>
                </div>
                <div class="cart-table"></div>
                <div class="cart-checkout"></div>
            </div>
        </div>
    </main>
    <footer>
        <?php require_once("../../includes/footer.php"); ?>
    </footer>
</body>
</html>