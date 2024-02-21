<?php
session_start();
require_once("db_login.php");

$conn = new mysqli(SERVERNAME, USERNAME, PASSWORD, DATABASE);
if ($conn->connect_error) {
    die;
}

// Extract the SQL query from the POST request
$sqlQuery = $_POST['sql'];

// Fetch book ids from database
$stmt = $conn->prepare($sqlQuery);
$stmt->execute();
$result = $stmt->get_result();

// Create an array to store book IDs
$bookIds = array();

// Fetch book IDs from the database query result
while ($row = $result->fetch_assoc()) {
    // Add each book ID to the array
    $bookIds[] = $row['book_id'];
}

$stmt->close();
$conn->close();

// Send data to the client
echo json_encode($bookIds);
