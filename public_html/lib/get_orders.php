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

$sql = "SELECT order_id, order_date, total_price, status FROM Orders WHERE customer_id = ? ORDER BY order_date DESC, order_id DESC; ";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

$orderData = array();

// Put order details in $orderData array
while ($row = $result->fetch_assoc()) {
    $orderData[] = array(
        'order_id' => $row['order_id'],
        'order_date' => $row['order_date'],
        'total_price' => $row['total_price'],
        'status' => $row['status'],
    );
}

$stmt->close();
$conn->close();

echo json_encode($orderData);