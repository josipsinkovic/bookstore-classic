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
        <button id="cart">
            <i class="fa-solid fa-cart-shopping fa-2x"></i>
        </button>
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
                        echo '<a href="/user/login/">Korisnički račun</a>';
                        echo '<a href="/user/auth/logout.php">Odjavite se</a>';
                    }
                ?>
            </div>
        </div>
        
    </div>
</div>
<div class="navigation">
    <div class="header-nav">
        <a href="">Svjetski klasici</a>
        <a href="">Hrvatski klasici</a>
        <a href="">Drama</a>
        <a href="">Poezija</a>
        <a href="">Fikcija</a>
        <a href="">Romani</a>
        <a href="">Popusti</a>
    </div>
</div>


