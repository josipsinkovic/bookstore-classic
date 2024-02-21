/**
 * This script fetches book IDs and details from the server and updates HTML content accordingly
 * It consists of two main functions: fetchID and fetchBooks
 * Async/await method is used to ensure that the second function executes strictly after first had been executed 
 */

document.addEventListener("DOMContentLoaded", async function() {

    // This function fetches the book IDs and puts them in the appropriate HTML section
    async function fetchID() {
        return new Promise((resolve, reject) => {
            // Fetches book IDs from the server based on the provided SQL query
            function fetchData(sql) {
                return fetch("/lib/get_book_ids.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "sql=" + encodeURIComponent(sql)
                }).then(response => {
                    // Handle the server's response
                    if (!response.ok) {
                        throw new Error("HTTP error " + response.status);
                    }
                    return response.json();
                });
            }

            // Initialize arrays to store promises and class names
            let promises = [];
            let classNames = [];

            // Checking if the HTML sections exist and execute fetching with appropriate SQL queries
            if (document.querySelector(".new-products")) {
                promises.push(fetchData("SELECT book_id FROM Books ORDER BY publication_year DESC"));
                classNames.push("new-products");
            }
            if (document.querySelector(".discounts")) {
                promises.push(fetchData("SELECT Books.book_id FROM Books INNER JOIN Discounts ON Books.book_id = Discounts.book_id ORDER BY Discounts.discount DESC"));
                classNames.push("discounts");
            }
            if (document.querySelector(".croatian-literature")) {
                promises.push(fetchData("SELECT book_id FROM Books WHERE original_language = 'Hrvatski'"));
                classNames.push("croatian-literature");
            }
            
            // After all promises are resolved, assign book IDs to corresponding elements
            Promise.all(promises).then(results => {
                for (let i = 0; i < results.length; i++) {
                    let books = document.querySelectorAll("." + classNames[i] + " .book");
                    let bookIds = results[i];
                    for (let j = 0; j < books.length; j++) {
                        books[j].id = bookIds[j];
                    }
                }
                resolve(); // Resolve promise when all IDs are assigned
            }).catch(error => reject(error)); // Reject promise if there's an error
        });
    }

    // This function fetches book details based on fetched book IDs
    async function fetchBooks() {
        // Wait for fetchID function to complete
        await fetchID();

        // Select all elements with the class "book", excluding those with the id "undefined" which typically occurs upon failed fetching, and extract element IDs in array
        let books = document.querySelectorAll(`.book[id]:not([id="undefined"])`);
        let divIds = Array.from(books).map(div => div.id);

        // Prepare parameters (IDs) to be sent
        let params = "ids=" + encodeURIComponent(divIds.join(','));

        // Send POST request to get book details
        let response = await fetch("/lib/get_book_details.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        // Parse the server response as JSON
        let bookData = await response.json();

        // Iterate through each book element and update its HTML content
        books.forEach(function(div) {
            let id = div.id;

            // Get data array for the current id 
            let bookInfo = bookData.find(book => book.id == parseInt(id));

            if (bookInfo) {
                div.querySelector('img').src = bookInfo.image_url;
                div.querySelector('.book-name').textContent = bookInfo.book_name;

                // Display the author's full name based on conditions
                div.querySelector('.book-author').textContent = (bookInfo.book_firstName === null && bookInfo.book_lastName === null) ? "" : (bookInfo.book_firstName === null) ? bookInfo.book_lastName : bookInfo.book_firstName + " " + bookInfo.book_lastName;
                div.querySelector('.book-price').textContent = bookInfo.book_price;
            }
        });
    }
    fetchBooks();
});