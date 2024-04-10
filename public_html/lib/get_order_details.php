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

$orderID = Utils::sanitizeFormInput($_POST['orderID']);

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

$sql = "SELECT book_id, quantity, price, totalPrice FROM OrderDetails WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $orderID);
$stmt->execute();
$result = $stmt->get_result();

$orderData = array();

// Put order details in $orderData array
while ($row = $result->fetch_assoc()) {
    $orderData[] = array(
        'book_id' => $row['book_id'],
        'quantity' => $row['quantity'],
        'price' => $row['price'],
        'total_price' => $row['totalPrice']
    );
}

$stmt->close();
$conn->close();

echo json_encode($orderData);