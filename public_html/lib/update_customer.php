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

$customerID = Utils::sanitizeFormInput($_POST['customerID']);
$first_name = Utils::sanitizeFormInput($_POST['first_name']);
$last_name = Utils::sanitizeFormInput($_POST['last_name']);
$email = Utils::sanitizeFormInput($_POST['email']);
$address = Utils::sanitizeFormInput($_POST['address']);
$city = Utils::sanitizeFormInput($_POST['city']);
$postal_code = Utils::sanitizeFormInput($_POST['postal_code']);
$phone = Utils::sanitizeFormInput($_POST['phone']);

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

// SQL query for updating user information
$sql = "UPDATE Customers SET first_name = ?, last_name = ?, email = ?, address = ?, city = ?, postal_code = ?, phone_number = ? WHERE customer_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssisi", $first_name, $last_name, $email, $address, $city, $postal_code, $phone, $customerID);

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
