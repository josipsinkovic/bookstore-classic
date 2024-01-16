<?php
require_once("db_login.php");

/**
 * Utility class (Utils) containing commonly used functions.
 */
class Utils {
    // Redirects the user to the specified location using the HTTP "Location" header
    public static function redirect($location) {
        header("Location: $location");
        die;
    }

    /**
     * Sanitizes form input by trimming whitespaces, removing HTML and PHP tags,
     * and converting special characters to HTML entities.
     */
    public static function sanitizeFormInput($input) {
        $input = trim($input);
        $input = strip_tags($input);
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

        return $input;
    }

    // Adds a user's ID to the session variable based on their e-mail
    public static function addSession($email) {
        // Get user's ID from database
        $conn = new mysqli(SERVERNAME, USERNAME, PASSWORD, DATABASE);
        $sql = "SELECT customer_id FROM Customers WHERE email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($id);
        $stmt->fetch();
        $stmt->close();
        $conn->close();

        // Add ID to session variable
        $_SESSION['userID'] = $id;
    }
}
