<?php
session_start();

if (isset($_SESSION['userID'])) {
    echo 'true';
} else {
    echo 'false';
}
