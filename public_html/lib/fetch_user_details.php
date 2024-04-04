<?php
session_start();
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

// SQL query for getting user details, using prepared statements
$sql = "SELECT customer_id, first_name, last_name, email, address, city, postal_code, phone_number FROM Customers WHERE customer_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

// Put user details in $userData array
while ($row = $result->fetch_assoc()) {
    $userData = array(
        'customer_id' => $row['customer_id'],
        'first_name' => $row['first_name'],
        'last_name' => $row['last_name'],
        'email' => $row['email'],
        'address' => $row['address'],
        'city' => $row['city'],
        'postal_code' => $row['postal_code'],
        'phone_number' => $row['phone_number']
    );
}

$stmt->close();
$conn->close();

// Send data to the client
echo json_encode($userData);
