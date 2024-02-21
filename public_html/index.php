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
    <link rel="stylesheet" href="/assets/css/main_page.css">
    <script src="/assets/js/fetch_books.js"></script>
    <script src="/assets/js/carousel.js"></script>
    <script src="/assets/js/quotes.js"></script>
    <script src="https://kit.fontawesome.com/8bbbed924d.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <?php require_once('includes/header.php'); ?>
    </header>
    <main>
        <div class="container">
            <section class="banner">
                <div class="buttons">
                    <i class="fa-solid fa-chevron-left fa-xl left"></i>
                    <i class="fa-solid fa-chevron-right fa-xl right"></i>
                </div>
                <div class="carousel">
                    <div class="carousel-item active">
                        <a href="">
                            <img src="/assets/images/banners/images.jpg" alt="">
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
                        <a href="">Prikaži sve</a>
                    </div>
                </div>
                <div class="carousel">
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
                        <a href="">Prikaži sve</a>
                    </div>
                </div>
                <div class="carousel">
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
                        <a href="">Prikaži sve</a>
                    </div>
                </div>
                <div class="carousel">
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
            </section>
        </div>
    </main>
    <footer>
        <?php require_once("includes/footer.php"); ?>
    </footer>
</body>
</html>