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

// Sanitize input data
$customerID = Utils::sanitizeFormInput($_POST['customerID']);
$first_name = isset($_POST['first_name']) ? Utils::sanitizeFormInput($_POST['first_name']) : NULL;
$last_name = isset($_POST['last_name']) ? Utils::sanitizeFormInput($_POST['last_name']) : NULL;
$email = isset($_POST['email']) ? Utils::sanitizeFormInput($_POST['email']) : NULL;
$address = isset($_POST['address']) ? Utils::sanitizeFormInput($_POST['address']) : NULL;
$city = isset($_POST['city']) ? Utils::sanitizeFormInput($_POST['city']) : NULL;
$postal_code = isset($_POST['postal_code']) ? Utils::sanitizeFormInput($_POST['postal_code']) : NULL;
$phone = isset($_POST['phone']) ? Utils::sanitizeFormInput($_POST['phone']) : NULL;

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

// Check if email is provided and not used by another account
if (isset($_POST['email'])) {
    $sql = 'SELECT customer_id FROM Customers WHERE email = ? AND customer_id != ?';
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $email, $customerID);
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
}

// Fetch user data
$userData = Utils::returnUserData($customerID, $conn);

// Assign values to variables if not provided or empty
$first_name = $first_name ?? $userData['first_name'];
$last_name = $last_name ?? $userData['last_name'];
$email = $email ?? $userData['email'];
if (is_null($address)) {
    $address = (is_null($userData['address'])) ? NULL : $userData['address'];
} else if ($address === '') {
    $address = NULL;
}

if (is_null($city)) {
    $city = (is_null($userData['city'])) ? NULL : $userData['city'];
} else if ($city === '') {
    $city = NULL;
}

if (is_null($postal_code)) {
    $postal_code = (is_null($userData['postal_code'])) ? NULL : $userData['postal_code'];
} else if ($postal_code === '') {
    $postal_code = NULL;
}

if (is_null($phone)) {
    $phone = (is_null($userData['phone_number'])) ? NULL : $userData['phone_number'];
} else if ($phone === '') {
    $phone = NULL;
}


// SQL query for updating user information
$sql = "UPDATE Customers SET first_name = ?, last_name = ?, email = ?, address = ?, city = ?, postal_code = ?, phone_number = ? WHERE customer_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssisi", $first_name, $last_name, $email, $address, $city, $postal_code, $phone, $customerID);

// Send success message if query executes successfully, otherwise send error message
if ($stmt->execute()) {
    $response = ["status" => "success", "message" => 'Korisnički podatci uspješno promijenjeni!'];
    echo json_encode($response);
} else {
    $response = ["status" => "error", "message" => "Pojavila se greška kod promjene podataka. Pokušajte ponovno kasnije."];
    echo json_encode($response);
}

$stmt->close();
$conn->close();
