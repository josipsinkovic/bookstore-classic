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

$orderID = $_POST['orderID'];
$status = $_POST['status'];

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

$sql = "UPDATE Orders SET status = ? WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $orderID);

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
