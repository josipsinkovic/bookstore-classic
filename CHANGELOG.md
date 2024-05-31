# Changelog

## v0.6.0 (2024-05-31)

- added CSS styling throughout the whole project
- began with implementing responsive design
- added SQL queries for remaining elements in the categories
- added product pages for every book
- various code improvements

## v0.5.0 (2024-04-11)

- implemented checkout process
    - users must input their personal information to continue with checkout
    - users can choose from three methods of payment: on-delivery, card and virman payment
    - upon successful checkout, users are redirected to a page with order details
- implemented user account management features
    - users can view and modify information about their account
    - users can change their password
    - users can see list of all their orders, and they can click on every order to access order details

## v0.4.0 (2024-04-02)

- added pages for book sections (new products, croatian literature...)
- implemented search functionality
- implemented user reviews functionality
    - users can put a review on each book
    - in order to leave a review, user must input e-mail (not shown to other users), first name, last name, grading and (optionally) description about the book
- implemented shopping cart functionality
    - users can add items and choose quantity of items that they want to add to cart
    - on the cart page, users can edit their order (delete elements from the cart, change quantity...)
    - the total order price is calculated and everything is ready for implementation of checkout process

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