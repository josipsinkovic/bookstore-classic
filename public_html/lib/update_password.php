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

$userID = Utils::sanitizeFormInput($_POST['customerID']);
$oldPassword = Utils::sanitizeFormInput($_POST['old-password']);
$newPassword = Utils::sanitizeFormInput($_POST['new-password']);

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

// Retrieve old password hash from the database
$sqlCheck = "SELECT passwordHash FROM Customers WHERE customer_id = ?";
$stmt = $conn->prepare($sqlCheck);
$stmt->bind_param("i", $userID);
$stmt->execute();
$stmt->bind_result($oldHash);
$stmt->fetch();
$stmt->close();

// Verify if the provided old password matches the one stored in the database
if (!password_verify($oldPassword, $oldHash)) {
    $response = ["status" => "error", "message" => "Trenutna lozinka nije točna!"];
    echo json_encode($response);
    $conn->close();
    die;
}

// Hash the new password
$newHash = password_hash($newPassword, PASSWORD_BCRYPT);

// Prepare and execute SQL query to update password
$sql = "UPDATE Customers SET passwordhash = ? WHERE customer_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $newHash, $userID);

// Send success message if query executes successfully, otherwise send error message
if ($stmt->execute()) {
    $response = ["status" => "success", "message" => "Lozinka uspješno promijenjena!"];
    echo json_encode($response); 
} else {
    $response = ["status" => "error", "message" => "Greška upisa u bazu podataka. Pokušajte ponovno kasnije."];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
