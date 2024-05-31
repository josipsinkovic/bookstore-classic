<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('../../../includes/head.php'); ?> 
    <title>Poezija | Classic</title>
    <link rel="stylesheet" href="/assets/css/categories.css">
    <script src="/assets/js/fetch_books.js"></script>
    <script src="/assets/js/cart.js"></script>
</head>
<body>
    <header>    
        <?php require_once("../../../includes/header.php"); ?>
    </header>
    <main>
        <div class="category category-poetry">
            <div class="category-header">
                <h1>Poezija</h1>
                <div class="per-page">
                    <p>Prikaži</p>
                    <select>
                        <option value="12">12</option>
                        <option value="18">18</option>
                        <option value="24">24</option>
                        <option value="32">32</option>
                    </select>
                    <p>po stranici</p>
                </div>
            </div>
            <?php require_once("../../../includes/categories.php"); ?>
        </div>
    </main>
    <footer>
        <?php require_once("../../../includes/footer.php"); ?>
    </footer>
</body>
</html>