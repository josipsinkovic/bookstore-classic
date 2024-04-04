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
    <script src="/assets/js/validation.js"></script>
    <script src="https://kit.fontawesome.com/8bbbed924d.js" crossorigin="anonymous"></script>
</head>
<body>
    <header>
        <?php require_once("../../includes/header.php")?>
    </header>
    <main>
        <form id="loginForm">
            <label for="email">E-mail</label>
            <input type="text" name="email" id="email" required>
            <span id="emailErr"></span>
            <br>
            <label for="password">Lozinka</label>
            <input type="password" name="password" id="password" required>
            <span id="passErr"></span>
            <br>
            <span id="globalMessage"></span>
            <input type="button" id="loginSubmit" value="Prijavi se">
            <small>
                Nemate račun? <a href="/user/register/" id="login-to-register">Registrirajte se</a>
            </small>
        </form>
    </main>
    <footer>
        <?php require_once("../../includes/footer.php")?>
    </footer>
</body>
</html>