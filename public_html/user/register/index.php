<?php
session_start();
?>

<!DOCTYPE html>
<html lang="hr">
<head>
    <?php include('../../includes/head.php'); ?>
    <title>Registrirajte se | Classic</title>
    <link rel="stylesheet" href="/assets/css/account.css">
    <script src="/assets/js/validation.js"></script>
</head>
<body>
    <header>
        <?php require_once("../../includes/header.php")?>
    </header>
    <main>
    <div class="container">
        <span id="globalMessage"></span>
        <div class="register">
            <div class="register-header">
                <h1>Registracija</h1>
            </div>
            <form id="registerForm">
                <label for="first-name">Ime</label>
                <input type="text" name="first-name" id="first-name" required>
                <span id="fnameErr"></span>
                <br>
                <label for="last-name">Prezime</label>
                <input type="text" name="last-name" id="last-name" required>
                <span id="lnameErr"></span>
                <br>
                <label for="email">E-mail</label>
                <input type="text" name="email" id="email" required>
                <span id="emailErr"></span>
                <br>
                <label for="password">Lozinka</label>
                <input type="password" name="password" id="password" required>
                <span id="passErr"></span>
                <br>
                <label for="confirmPassword">Ponovi lozinku</label>
                <input type="password" name="confirmPassword" id="confirmPassword" required>
                <span id="confPassErr"></span>
                <br>
                <span id="globalMessage"></span>
                <input type="button" id="registerSubmit" value="Registriraj se">
                <small>
                    Imate račun? <a href="/user/login/" id="register-to-login">Prijavite se</a>
                </small>
            </form>
        </div>
    </main>
    <footer>
        <?php require_once("../../includes/footer.php")?>
    </footer>
</body>
</html>