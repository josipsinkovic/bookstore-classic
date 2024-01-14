<h1>Classic</h1>

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
