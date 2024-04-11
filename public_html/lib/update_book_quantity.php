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

$bookID = Utils::sanitizeFormInput($_POST['bookID']);
$quantityMode = Utils::sanitizeFormInput($_POST['quantityMode']);
$quantity = Utils::sanitizeFormInput($_POST['quantity']);

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

// Set appropriate operator for wanted quantity mode (add quantity or take away quantity)
if ($quantityMode == 'add') {
    $quantityMode = '+';
} else {
    $quantityMode = '-';
}

// SQL query for updating book quantity
$sql = "UPDATE Books SET quantity = quantity " . $quantityMode . " ? WHERE book_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $quantity, $bookID);

// Send success message if query executes successfully, otherwise send error message
if ($stmt->execute()) {
    $response = ["status" => "success", "message" => 'Uspješna promjena podataka!'];
    echo json_encode($response);
} else {
    $response = ["status" => "error", "message" => "Pojavila se greška kod promjene podataka. Pokušajte ponovno kasnije."];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
