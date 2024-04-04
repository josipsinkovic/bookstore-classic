<?php
session_start();
require_once("db_login.php");

$conn = new mysqli(SERVERNAME, USERNAME, PASSWORD, DATABASE);
if ($conn->connect_error) {
    die;
}

// Set character encoding to UTF-8 for proper handling of Unicode characters
mysqli_set_charset($conn, "utf8");

// Extract the book ID
$bookID = $_POST['bookID'];

// SQL query for getting book details
$sql = "SELECT B.title, A.first_name, A.last_name, YEAR(B.publication_date) AS publication_date, B.price, D.discount, B.pages_number, B.original_language, B.binding, B.format_width, B.format_height, B.description, B.image_url, B.quantity FROM Books AS B LEFT JOIN Authors AS A ON B.author = A.author_id LEFT JOIN Discounts AS D ON B.book_id = D.book_id WHERE B.book_id = ?;";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $bookID);
$stmt->execute();
$result = $stmt->get_result();

// Create an array to store book data
$bookData = array();

while ($row = $result->fetch_assoc()) {
    // Create an associative array for the book and append it to the bookData array
    $bookData[] = array(
        'title' => $row['title'],
        'first_name' => $row['first_name'],
        'last_name' => $row['last_name'],
        'publication_date' => $row['publication_date'],
        'price' => $row['price'],
        'discount' => $row['discount'],
        'pages_number' => $row['pages_number'],
        'original_language' => $row['original_language'],
        'binding' => $row['binding'],
        'format_width' => $row['format_width'],
        'format_height' => $row['format_height'],
        'description' => $row['description'],
        'image_url' => $row['image_url'],
        'quantity' => $row['quantity']
    );
}

$stmt->close();
$conn->close();

// Send data to the client
echo json_encode($bookData);
