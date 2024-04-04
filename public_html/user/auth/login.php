<?php
session_start();
require_once("../../lib/utils.php");
require_once("../../lib/db_login.php");

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = ["status" => "error", "message" => "Greška poslužitelja. Pokušajte ponovno kasnije."];
    echo json_encode($response);
    die;
}

$email = Utils::sanitizeFormInput($_POST['email']);
$password = Utils::sanitizeFormInput($_POST['password']);

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

// Fetch data from database
$sql = "SELECT email, passwordhash FROM Customers WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($db_email, $db_password);
$stmt->fetch();
$stmt->close();

// Check if e-mail and password are valid
if ($db_email && password_verify($password, $db_password)) {
    $response = ["status" => "success", "message" => "Prijava uspješna."];
    Utils::addSession($db_email);
    echo json_encode($response); 
} else {
    $response = ["status" => "error", "message" => "Pogrešan e-mail ili lozinka."];
    echo json_encode($response);
}


$conn->close();
