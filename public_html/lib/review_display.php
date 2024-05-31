<?php
session_start();
require_once('db_login.php');

// Allow only POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $response = ["status" => "error", "message" => "Greška poslužitelja. Pokušajte ponovno kasnije."];
    echo json_encode($response);
    die;
}

// Get number of reviews per page and book ID
$displayReview = $_POST['displayReview'];
$bookID = $_POST['bookID'];


$conn = new mysqli(SERVERNAME, USERNAME, PASSWORD, DATABASE);
if ($conn->connect_error) {
    $response = ["status" => "error", "message" => "Greška spajanja na bazu podataka. Pokušajte ponovno kasnije."];
    echo json_encode($response);
    $conn->close();
    die;
}

// Set character encoding to UTF-8 for proper handling of Unicode characters
mysqli_set_charset($conn, "utf8");

// SQL query for getting review details
$sql = "SELECT first_name, last_name, email, review_rating, review_text, review_date FROM Reviews WHERE book_id = ? ORDER BY review_date DESC; ";

// Execute SQL query
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $bookID);
$stmt->execute();
$result = $stmt->get_result();

// Create an array to store review data
$reviews = array();

while ($row = $result->fetch_assoc()) {
    // Extract individual data fields from the current row
    $firstName = $row['first_name'];
    $lastName = $row['last_name'];
    $email = $row['email'];
    $reviewRating = $row['review_rating'];
    $reviewText = $row['review_text'];
    $reviewDate = strtotime($row['review_date']);

    // Create an associative array for each review and append it to the reviews array
    $reviews[] = array(
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'reviewRating' => $reviewRating,
        'reviewText' => $reviewText,
        'reviewDate' => $reviewDate
    );
}

// Create HTML content for book reviews
for ($i = 0; $i < $displayReview; $i++) {
    // If there are no reviews for current book display appropriate message and break the loop
    if (count($reviews) === 0) {
        echo 'Za ovaj proizvod ne postoje recenzije.';
        break;
    } else if ($i < count($reviews)) {
        echo '<div class="review-item">';
        echo '<div class="review-person-name">' . $reviews[$i]['firstName'] . ' ' . $reviews[$i]['lastName'] . '</div>';
        echo '<div class="review-about"><div class="review-rating">';
        for ($j = 1; $j <= 5; $j++) {
            if ($j <= $reviews[$i]['reviewRating']) {
                echo '<i class="fa-solid fa-star black-star"></i>';
            } else {
                echo '<i class="fa-solid fa-star"></i>';
            }
        }
        echo '</div><p>&bullet;</p><div class="review-date">' . date('d', $reviews[$i]['reviewDate']) . '.' . date('m', $reviews[$i]['reviewDate']) . '.' . date('Y', $reviews[$i]['reviewDate']) . ' ' . date('H', $reviews[$i]['reviewDate']) . ':' . date('i', $reviews[$i]['reviewDate']);
        echo '</div></div><div class="review-description">' . $reviews[$i]['reviewText'] . '</div></div>';
    }
}

// If there are more reviews than currently shown, display the button for showing more reviews
if (count($reviews) > $displayReview) {
    echo '<button id="show-more-reviews">Prikaži više</button>';
}

$stmt->close();
$conn->close();
