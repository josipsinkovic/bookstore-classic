<?php
session_start();
require_once("db_login.php");

$conn = new mysqli(SERVERNAME, USERNAME, PASSWORD, DATABASE);
if ($conn->connect_error) {
    die;
}

// Set character encoding to UTF-8 for proper handling of Unicode characters
mysqli_set_charset($conn, "utf8");

// Extract div IDs from the POST request, convert them to integers
$divIds = isset($_POST['ids']) ? array_map('intval', explode(',', $_POST['ids'])) : [];

// If there are no IDs, end the script
if (empty($divIds)) {
    die;
}

// SQL query for getting book details, condition should look like this: WHERE B.book_id IN (5,2,9,18,1,2,7)
$sql = "SELECT B.book_id, B.image_url, B.title, A.first_name, A.last_name, B.price, B.quantity, D.discount FROM Books AS B LEFT JOIN Authors AS A ON B.author = A.author_id LEFT JOIN Discounts AS D ON B.book_id = D.book_id WHERE B.book_id IN (" . implode(',', $divIds) . ")";

// Execute SQL query
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
    $book_quantity = $row["quantity"];
    $book_discount = $row["discount"];

    // Create an associative array for each book and append it to the bookData array
    $bookData[] = array(
        'id' => $id,
        'image_url' => $image_url,
        'book_name' => $book_name,
        'book_firstName' => $book_firstName,
        'book_lastName' => $book_lastName,
        'book_price' => $book_price,
        'book_quantity' => $book_quantity,
        'book_discount' => $book_discount
    );
}

$stmt->close();
$conn->close();

// Send data to the client
echo json_encode($bookData);
