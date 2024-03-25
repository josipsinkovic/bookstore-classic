<?php
session_start();
require_once('utils.php');
require_once('db_login.php');

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = ["status" => "error", "message" => "Greška poslužitelja. Pokušajte ponovno kasnije."];
    echo json_encode($response);
    die;
}

$bookID = $_POST['bookId'];
$first_name = Utils::sanitizeFormInput($_POST['first-name']);
$last_name = Utils::sanitizeFormInput($_POST['last-name']);
$email = Utils::sanitizeFormInput($_POST['e-mail']);
$starValue = Utils::sanitizeFormInput($_POST['starValue']);
$text = Utils::sanitizeFormInput($_POST['text']);

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

// Insert data into database, use prepared statements for protection against SQL injections
$sql = "INSERT INTO Reviews (book_id, first_name, last_name, email, review_rating, review_text) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isssis", $bookID, $first_name, $last_name, $email, $starValue, $text);

// Send success message if query executes succesfully, otherwise send error message
if ($stmt->execute()) {
    $response = ["status" => "success", "message" => "Vaša recenzija je uspješno zabilježena!"];
    echo json_encode($response); 
} else {
    $response = ["status" => "error", "message" => "Greška upisa u bazu podataka. Pokušajte ponovno kasnije."];
    echo json_encode($response);
}

$stmt->close();
$conn->close();