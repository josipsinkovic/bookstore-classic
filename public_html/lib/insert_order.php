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

$userID = Utils::sanitizeFormInput($_POST['userID']);
$address = Utils::sanitizeFormInput($_POST['address']);
$city = Utils::sanitizeFormInput($_POST['city']);
$postalCode = Utils::sanitizeFormInput($_POST['postalCode']);
$phone = Utils::sanitizeFormInput($_POST['phone']);
$delivery = Utils::sanitizeFormInput($_POST['delivery']);
$payment = Utils::sanitizeFormInput($_POST['payment']);
$totalPrice = Utils::sanitizeFormInput($_POST['totalPrice']);
$status = 'pending';

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

// SQL query for inserting order in database
$sql = "INSERT INTO Orders (customer_id, address, city, postal_code, phone_number, delivery, payment_method, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ississsds", $userID, $address, $city, $postalCode, $phone, $delivery, $payment, $totalPrice, $status);

// If query executes successfully return the order ID to the client, otherwise send error message
if ($stmt->execute()) {
    // SQL query for getting order ID
    $sql = "SELECT order_id FROM Orders WHERE customer_id = ? AND address = ? AND city = ? AND postal_code = ? AND phone_number = ? AND delivery = ? AND payment_method = ? AND status = ? ORDER BY order_id DESC LIMIT 1";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ississss", $userID, $address, $city, $postalCode, $phone, $delivery, $payment, $status);
    $stmt->execute();
    $stmt->bind_result($orderId);
    $stmt->fetch();

    $response = ["status" => "success", "message" => $orderId];
    echo json_encode($response);
} else {
    $response = ["status" => "error", "message" => "Greška upisa u bazu podataka. Pokušajte ponovno kasnije."];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
