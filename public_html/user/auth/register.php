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

$first_name = Utils::sanitizeFormInput($_POST['first-name']);
$last_name = Utils::sanitizeFormInput($_POST['last-name']);
$email = Utils::sanitizeFormInput($_POST['email']);
$password = Utils::sanitizeFormInput($_POST['password']);

$passwordHash = password_hash($password, PASSWORD_BCRYPT);

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

// Check if e-mail already exists in database
$sql_check = "SELECT COUNT(*) FROM Customers WHERE email = ?";
$stmt = $conn->prepare($sql_check);
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();
if ($count > 0) {
    $response = ["status" => "error", "message" => "Već postoji račun s ovom e-mail adresom."];
    echo json_encode($response);
    $conn->close();
    die;
}

// Insert data into database, use prepared statements for protection against SQL injections
$sql = "INSERT INTO Customers (first_name, last_name, email, passwordHash) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $first_name, $last_name, $email, $passwordHash);

// Add session variable if query executes succesfully, handle potential error
if ($stmt->execute()) {
    $response = ["status" => "success", "message" => "Registracija uspješna."];
    Utils::addSession($email);
    echo json_encode($response); 
} else {
    $response = ["status" => "error", "message" => "Greška upisa u bazu podataka. Pokušajte ponovno kasnije."];
    echo json_encode($response);
}


$stmt->close();
$conn->close();
