<?php
session_start();
?>

<!DOCTYPE html>
<html lang="hr">
<head>
    <?php include('includes/head.php'); ?>
    <title>Web knjižara | Classic</title>
    <link rel="stylesheet" href="/assets/css/main_page.css">
    <script src="/assets/js/fetch_books.js"></script>
    <script src="/assets/js/carousel.js"></script>
    <script src="/assets/js/quotes.js"></script>
    <script src="/assets/js/cart.js"></script>
</head>
<body>
    <header>
        <?php require_once('includes/header.php'); ?>
    </header>
    <main>
        <div class="container">
            <section class="banner">
                <div class="buttons">
                    <i class="fa-solid fa-chevron-left fa-xl left" id="banner-left"></i>
                    <i class="fa-solid fa-chevron-right fa-xl right" id="banner-right"></i>
                </div>
                <div class="carousel">
                    <div class="carousel-item active">
                        <a href="">
                            <img src="/assets/images/banners/iliad.png" alt="">
                        </a>
                    </div>
                    <div class="carousel-item">
                        <a href="">
                            <img src="/assets/images/banners/bible.png" alt="">
                        </a>
                    </div>
                    <div class="carousel-item">
                        <a href="">
                            <img src="" alt="">
                        </a>
                    </div>
                    <div class="carousel-item">
                        <a href="">
                            <img src="" alt="">
                        </a>
                    </div>
                </div>
            </section>
            <section class="new-products">
                <div class="buttons">
                    <i class="fa-solid fa-chevron-left fa-xl left" id="new-product-left"></i>
                    <i class="fa-solid fa-chevron-right fa-xl right" id="new-product-right"></i>
                </div>
                <div class="new-products-header">
                    <h1>Novi proizvodi</h1>
                    <div class="show-all">
                        <a href="/product/category/new-products/">
                            <p>Prikaži sve</p>
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="carousel px1200">
                    <div class="carousel-item active">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                </div>
                <div class="carousel px1000">
                    <div class="carousel-item active">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                </div>
            </section>
            <section class="discounts">
                <div class="discounts-header">
                    <h1>Proizvodi na akciji</h1>
                    <div class="show-all">
                        <a href="/product/category/discounts/">
                            <p>Prikaži sve</p>
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="carousel px1200">
                    <div class="carousel-item active">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                </div>
                <div class="carousel px1000">
                    <div class="carousel-item active">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                </div>
            </section>
            <section class="quote">
                <div class="quote-header">
                    <h1>Citat dana</h1>
                </div>
                <div class="quote-content">
                    <div class="quote-text">
                        <span></span>
                    </div>
                    <div class="quote-person"></div>
                    <div class="quote-left">
                        <i class="fa-solid fa-quote-left fa-2x"></i>
                    </div>
                    <div class="quote-right">
                        <i class="fa-solid fa-quote-right fa-2x"></i>
                    </div>
                </div>
            </section>
            <section class="croatian-literature">
                <div class="buttons">
                    <i class="fa-solid fa-chevron-left fa-xl left" id="croatian-literature-left"></i>
                    <i class="fa-solid fa-chevron-right fa-xl right" id="croatian-literature-right"></i>
                </div>
                <div class="croatian-literature-header">
                    <h1>Hrvatski klasici</h1>
                    <div class="show-all">
                        <a href="/product/category/croatian-literature/">
                            <p>Prikaži sve</p>
                            <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="carousel px1200">
                    <div class="carousel-item active">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                </div>
                <div class="carousel px1000">
                    <div class="carousel-item active">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                        <div class="book">
                            <?php require("includes/book.php"); ?>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </main>
    <footer>
        <?php require_once("includes/footer.php"); ?>
    </footer>
</body>
</html>