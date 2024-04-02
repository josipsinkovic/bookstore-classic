<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/base.css">
    <link rel="stylesheet" href="/assets/css/checkout.css">
    <script src="/assets/js/cart.js"></script>
    <script src="https://kit.fontawesome.com/8bbbed924d.js" crossorigin="anonymous"></script>
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