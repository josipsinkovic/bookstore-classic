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

    // Retrieves user data from the database based on the provided user ID
    public static function returnUserData($userID, $conn) {
        // Prepare SQL statement to select user data
        $sql = "SELECT customer_id, first_name, last_name, email, address, city, postal_code, phone_number FROM Customers WHERE customer_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userID);
        $stmt->execute();
        $result = $stmt->get_result();

        // Iterate through the result set and populate $userData array with user details
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

        // Return the array containing user data
        return $userData;
    }
}
