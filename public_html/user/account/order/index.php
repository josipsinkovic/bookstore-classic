<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <?php include('../../../includes/head.php'); ?>
    <title>Narudžba | Classic</title>
    <link rel="stylesheet" href="/assets/css/account.css">
    <script src="/assets/js/cart.js"></script>
    <script src="/assets/js/account.js"></script>
</head>
<body>
    <header>    
        <?php require_once("../../../includes/header.php"); ?>
    </header>
    <main>
        <div class="container">
            <div class="order-container">
                <h1 class="order-header"></h1>
                <div class="order-status-date">
                    <div class="order-status">
                        <div class="order-status-show"></div>
                        <div class="order-status-cancel">
                            <div class="cancel-order">
                                <span>Otkaži narudžbu</span>
                            </div>
                            <div class="cancel-popup-overlay">
                                <div class="cancel-popup">
                                    Jeste li sigurni da želite otkazati ovu narudžbu?
                                    <div class="">
                                        <button class="popup-exit-cancel">Odustani</button>
                                        <button class="popup-resume-cancel">U redu</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="order-date"></div>
                </div>
                <div class="order-details">
                    <h3>Naručene stavke</h3>
                    <div class="order-details-table"></div>
                    <div class="order-details-summary"></div>
                </div>
                <div class="order-information">
                    <div class="order-information-details">
                        <h3>Podaci o narudžbi</h3>
                        <div class="information-name"></div>
                        <div class="information-address"></div>
                        <div class="information-postal-city"></div>
                        <div class="information-phone"></div>
                        <div class="information-payment-method"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <footer>
        <?php require_once("../../../includes/footer.php"); ?>
    </footer>
</body>
</html>