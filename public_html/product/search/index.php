<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css/base.css">
    <link rel="stylesheet" href="/assets/css/categories.css">
    <script src="/assets/js/fetch_books.js"></script>
    <script src="/assets/js/cart.js"></script>
    <script src="https://kit.fontawesome.com/8bbbed924d.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>    
        <?php require_once("../../includes/header.php"); ?>
    </header>
    <main>
        <div class="category category-search-products">
            <div class="search-products-header">
                <h1>Hrvatski klasici</h1>
                <div class="per-page">
                    <p>Prikaži</p>
                    <select>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                    <p>po stranici</p>
                </div>
            </div>
            <?php require_once("../../includes/categories.php"); ?>
        </div>
    </main>
    <footer>
        <?php require_once("../../includes/footer.php"); ?>
    </footer>
</body>
</html>