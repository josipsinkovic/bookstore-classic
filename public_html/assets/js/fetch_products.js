document.addEventListener("DOMContentLoaded", async function() {

    // Retrieve book ID from page URL
    let url = window.location.href;
    let splitURL = url.split('/');
    let bookID = "bookID=" + parseInt(splitURL[splitURL.length - 2]);

    let response = await fetch("/lib/fetch_product.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: bookID
    });

    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }

    let bookData = await response.json();

    let main = document.querySelector("main");
    
    main.querySelector('img').src = bookData[0].image_url;
    main.querySelector('.product-author').textContent = (bookData[0].first_name === null && bookData[0].last_name === null) ? "" : (bookData[0].first_name === null) ? bookData[0].last_name : bookData[0].first_name + " " + bookData[0].last_name;
    main.querySelector('.product-name').textContent = bookData[0].title;

    if (bookData[0].discount === null) {
        // If there is no discount, display the book's regular price and hide elements related to discounts
        main.querySelector('.book-price').textContent = bookData[0].price + '€';
        main.querySelector('.old-price').style.display = 'none';
        main.querySelector('.price-reduction').style.display = 'none';
    } else {
        // If the book has a discount, display the book's new price and price reduction indicator
        main.querySelector('.old-price').style.display = 'block';
        main.querySelector('.old-price').textContent = bookData[0].price + '€';

        // Calculate new price
        let discount = bookData[0].discount;
        let newPrice = (bookData[0].price * (1 - discount / 100)).toFixed(2);

        main.querySelector('.book-price').textContent = newPrice + '€';
        main.querySelector('.price-reduction').style.display = 'block';
        main.querySelector('.price-reduction').textContent = '-' + discount + '%';
    }

    main.querySelector('#product-year').textContent = bookData[0].publication_date;
    main.querySelector('#product-pages').textContent = bookData[0].pages_number;
    main.querySelector('#product-language').textContent = bookData[0].original_language;
    main.querySelector('#product-binding').textContent = bookData[0].binding;
    main.querySelector('#product-width').textContent = bookData[0].format_width + " mm";
    main.querySelector('#product-height').textContent = bookData[0].format_height + " mm";
    main.querySelector('.product-description').textContent = bookData[0].description;

    if (bookData[0].quantity == 0) {
        document.querySelector('.cart-button').style.display = 'none';
        document.querySelector('.cart-button-unavailable').style.display = 'block';
    }
});
