# Changelog

## v0.3.0 (2024-03-01)

- implemented structuring for the index.php file
- added structure for website header
- implemented automatic retrieval of basic book information from database on the homepage
    - book information: name, author, image, price, discount, stock availability
- implemented separate page for individual books
    - page has extensive book information, section "book description", book reviews (*need to be implemented) and related products 

## v0.2.0 (2024-01-16)

Implement register and login functionality for user

- register form
    - check if input fields are in the correct format
    - check for duplicate e-mail addresses
    - implement AJAX to asynchronously send registration data to the server
- login form
    - check if input fields are in the correct format
    - check if e-mail and password are correct
- dynamic header
    - store user information in the '$_SESSION' variable
    - display "Account" and "Log Out" if the user is logged in
    - display "Log In" and "Register" when the user isn't logged in

## v0.1.0 (2024-01-06)

This is an initial project setup. Everything is ready for development of website.

- added basic folder structure
- added SQL table definitions
- added basic documentation
- added initial index.php and base.css files