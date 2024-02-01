<?php
session_start();
require_once("db_login.php");

$conn = new mysqli(SERVERNAME, USERNAME, PASSWORD, DATABASE);
if ($conn->connect_error) {
    die;
}

// Extract div IDs from the POST request, convert them to integers
$divIds = isset($_POST['ids']) ? array_map('intval', explode(',', $_POST['ids'])) : [];

// If there are none IDs, end the script
if (empty($divIds)) {
    die;
}

// Fetch book details from database
$sql = "SELECT B.book_id, B.image_url, B.title, A.first_name, A.last_name, B.price FROM Books AS B LEFT JOIN Authors AS A ON B.author = A.author_id WHERE B.book_id IN (".implode(',', $divIds).")";
$stmt = $conn->prepare($sql);
$stmt->execute();
$result = $stmt->get_result();

// Create an array to store book data
$bookData = array();

while ($row = $result->fetch_assoc()) {
    // Extract individual data fields from the current row
    $id = $row["book_id"];
    $image_url = $row["image_url"];
    $book_name = $row["title"];
    $book_firstName = $row["first_name"];
    $book_lastName = $row["last_name"];
    $book_price = $row["price"];

    // Create an associative array for each book and append it to the bookData array
    $bookData[] = array(
        'id' => $id,
        'image_url' => $image_url,
        'book_name' => $book_name,
        'book_firstName' => $book_firstName,
        'book_lastName' => $book_lastName,
        'book_price' => $book_price
    );
}

$stmt->close();
$conn->close();

// Send data to the client
echo json_encode($bookData);
