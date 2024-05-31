<?php
session_start();
?>

<!DOCTYPE html>
<html lang="hr">
<head>
    <?php include('../../includes/head.php'); ?>
    <title>Prijavite se | Classic</title>
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
            <div class="login">
                <div class="login-header">
                    <h1>Prijava</h1>
                </div>
                <form id="loginForm">
                    <label for="email">E-mail</label>
                    <input type="text" name="email" id="email" required>
                    <span id="emailErr"></span>
                    <br>
                    <label for="password">Lozinka</label>
                    <input type="password" name="password" id="password" required>
                    <span id="passErr"></span>
                    <br>
                    <input type="button" id="loginSubmit" value="Prijavi se">
                    <small>
                        Nemate račun? <a href="/user/register/" id="login-to-register">Registrirajte se</a>
                    </small>
                </form>
            </div>
        </div>
    </main>
    <footer>
        <?php require_once("../../includes/footer.php")?>
    </footer>
</body>
</html>