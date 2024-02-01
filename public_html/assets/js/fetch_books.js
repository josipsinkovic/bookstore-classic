document.addEventListener("DOMContentLoaded", function() {
    // Select all elements with class "books" and extract element IDs in array
    let books = document.querySelectorAll(".books");
    let divIds = Array.from(books).map(div => div.id);

    let xhttp = new XMLHttpRequest();

    // Configure AJAX request to send POST request to the fetch_books.php endpoint
    xhttp.open("POST", "/lib/fetch_books.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Prepare parameters (IDs) to be sent, send the request
    let params = "ids=" + encodeURIComponent(divIds.join(','));
    xhttp.send(params);

    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            // Get server's response
            let bookData = JSON.parse(xhttp.responseText);

            // Iterate through each book element and update its HTML content
            books.forEach(function (div) {
                let id = div.id;

                // Get data array for the current id 
                let bookInfo = bookData.find(book => book.id === parseInt(id));

                if (bookInfo) {
                    div.querySelector('img').src = bookInfo.image_url;
                    div.querySelector('.book-name').textContent = bookInfo.book_name;

                    // Display the author's full name based on conditions
                    div.querySelector('.book-author').textContent = (bookInfo.book_firstName === null && bookInfo.book_lastName === null) ? "" : (bookInfo.book_firstName === null) ? bookInfo.book_lastName : bookInfo.book_firstName + " " + bookInfo.book_lastName;
                    div.querySelector('.book-price').textContent = bookInfo.book_price;
                }
            })
        }
    };
})
