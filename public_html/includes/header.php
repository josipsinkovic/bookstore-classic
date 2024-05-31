<script src="/assets/js/search.js"></script>

<div class="container">
    <div class="header-logo">
        <a href="/">
            <img src="/assets/images/logo/cover.png" alt="classic" >
        </a>
    </div>
    <div class="header-search">
        <input type="text" id="search" placeholder="Pretraga">
        <button id="search-button">
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
    </div>
    <div class="header-account">
        <a href="/checkout/cart/">
            <button id="cart">
                <i class="fa-solid fa-cart-shopping fa-2x"></i>
                <div class="cart-counter"></div>
            </button>
        </a>
        <div class="user-hover">
            <button id="user">
                <i class="fa-solid fa-user fa-2x"></i>
            </button>
            <div class="user-dropdown">
                <?php 
                    if (!isset($_SESSION['userID'])) {
                        echo '<a href="/user/login/">Prijavite se</a>';
                        echo '<a href="/user/register/">Registracija</a>';
                    }
                    else {
                        echo '<a href="/user/account/">Korisnički račun</a>';
                        echo '<a href="/user/auth/logout.php">Odjavite se</a>';
                    }
                ?>
            </div>
        </div>
        
    </div>
</div>
<div class="navigation">
    <div class="header-nav">
        <a href="/product/category/world-literature/">Svjetski klasici</a>
        <a href="/product/category/croatian-literature/">Hrvatski klasici</a>
        <a href="/product/category/drama/">Drama</a>
        <a href="/product/category/poetry/">Poezija</a>
        <a href="/product/category/fiction/">Fikcija</a>
        <a href="/product/category/novels/">Romani</a>
        <a href="/product/category/discounts/">Popusti</a>
    </div>
</div>


