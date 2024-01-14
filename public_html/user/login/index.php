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
</head>
<body>
    <header>
        <?php require_once("../../includes/header.php")?>
    </header>
    <main>
        <form action="/user/auth/login.php" method="post">
            <label for="email">E-mail</label>
            <input type="text" name="email" id="email" required>
            <br>
            <label for="password">Lozinka</label>
            <input type="password" name="password" id="password" required>
            <br>
            <input type="button" value="Prijavi se">
        </form>
    </main>
    <footer>
        <?php require_once("../../includes/footer.php")?>
    </footer>
</body>
</html>