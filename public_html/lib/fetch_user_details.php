<?php
session_start();
require_once('utils.php');
require_once("db_login.php");

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = ["status" => "error", "message" => "Greška poslužitelja. Pokušajte ponovno kasnije."];
    echo json_encode($response);
    die;
}

if(isset($_POST['userID'])) {
    $userID = $_POST['userID'];
} else {
    $userID = $_SESSION['userID'];
}

// Create connection and handle connection error
$conn = new mysqli(SERVERNAME, USERNAME, PASSWORD, DATABASE);
if ($conn->connect_error) {
    $response = ["status" => "error", "message" => "Greška spajanja na bazu podataka. Pokušajte ponovno kasnije."];
    echo json_encode($response);
    $conn->close();
    die;
}

// Set character encoding to UTF-8 for proper handling of Unicode characters
mysqli_set_charset($conn, "utf8");

// Get user data using function in 'utils' file
$userData = Utils::returnUserData($userID, $conn);


$conn->close();

// Send data to the client
echo json_encode($userData);
