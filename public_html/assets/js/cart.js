document.addEventListener("DOMContentLoaded", async function() {

    // Function to update the header cart icon with the total number of products
    function updateCartHeader() {
        let cart = [];

        // Check if 'cart' key exists in localStorage, if it exists parse it as an array to the 'cart' variable
        if (localStorage.getItem('cart') !== null) {
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            cart = [];
        }

        // Loop through each element in cart and add up the quantities
        let productNumber = 0;
        cart.forEach(function(element) {
            productNumber += element.quantity;
        });

        // Display the number of products on the cart icon, if there are no products display nothing
        let cartCounter = document.querySelector('.cart-counter');
        if (productNumber === 0) {
            cartCounter.style.display = 'none';
        } else {
            cartCounter.style.display = 'block';
            cartCounter.textContent = productNumber;
        }
    }

    // Function for displaying the cart information on the cart page
    async function displayCartInformation() {
        let cart = [];

        // Check if 'cart' key exists in localStorage, if it exists parse it as an array to the 'cart' variable
        if (localStorage.getItem('cart') !== null) {
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            cart = [];
        }

        // If there are no products in the cart, display the page where it says 'No products in the cart', else display the cart information
        if (cart.length === 0) {
            document.querySelector('.cart-no-products').style.display = 'flex';
            document.querySelector('.cart-table').style.display = 'none';
            document.querySelector('.cart-checkout').style.display = 'none';
        } else {
            document.querySelector('.cart-table').style.display = 'flex';
            document.querySelector('.cart-checkout').style.display = 'flex';
            document.querySelector('.cart-no-products').style.display = 'none';

            // Collect the book IDs of all the products in the cart
            let ids = [];
            cart.forEach(function(element) {
                ids.push(element.bookId);
            });

            // Prepare parameters (IDs) to be sent to the server
            let params = "ids=" + encodeURIComponent(ids.join(','));

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
            
            // Initialize variables that contain HTML structure for the cart information and checkout information (HTML will be generated dynamically using JavaScript)
            let HTMLtable = '<table><tr class="table-header"><th>Naziv proizvoda</th><th>Količina</th><th>Cijena</th><th>Ukupna cijena</th><th></th></tr>';
            let HTMLcheckout = '<div class="checkout-header">Sadržaj</div><div class="checkout-data"><table>';

            // Variable for total price (needed for checkout)
            let cartPrice = 0;

            // Loop through each element in the cart and create appropriate HTML content for each product
            cart.forEach(function(element) {
                let id = element.bookId;

                // Get data array for the current id 
                let bookInfo = bookData.find(book => book.id == parseInt(id));

                if (bookInfo) {
                    // Create a link for the current book
                    const replacements = { 'Č': 'c', 'č': 'c', 'Ć': 'c', 'ć': 'c', 'Ž': 'z', 'ž': 'z', 'Š': 's', 'š': 's', 'Đ': 'd', 'đ': 'd' };
                    function convertToSlug(text) {
                        return text.toLowerCase()
                            .replace(/ /g, '-') // Replace spaces with '-'
                            .replace(/[ČĆŽŠĐčćžšđ]/g, function(match) { // Replace non-ASCII characters
                                return replacements[match] || match;
                            });
                    }
                    let link = '/product/' + convertToSlug(bookInfo.book_name) + '/' + id;

                    let imageURL = bookInfo.image_url;
                    let bookName = bookInfo.book_name;
                    let quantity = element.quantity;

                    HTMLtable += '<tr><td><a href="' + link + '"><img src="' + imageURL + '"></a><a href="' + link + '">' + bookName + `</a></td><td><input class="product-quantity" id="quantity" type="number" min="1" step="1" value="` + quantity + `" name="quantity" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></td>`;

                    // Calculate and display book prices
                    let oldPrice = null;
                    let newPrice;
                    if (bookInfo.book_discount === null) {
                        // If there is no discount, display the book's regular price
                        newPrice = bookInfo.book_price;
                        HTMLtable += `<td><p class="old-price"></p><p class="book-price">` + newPrice + '€' + '</p></td>';
                    } else {
                        // Calculate new price and display the book's new price along with old price
                        oldPrice = bookInfo.book_price;
                        let discount = bookInfo.book_discount;
                        newPrice = (bookInfo.book_price * (1 - discount / 100)).toFixed(2);
                        HTMLtable += `<td><p class="old-price" style="display:inline;">` + oldPrice + '€' + '</p><p class="book-price" style="display:inline;">' + newPrice + '€' + '</p></td>';
                    }
                    // Calculate total price for current product (price of the product * quantity of the product)
                    let totalPrice = (newPrice * quantity).toFixed(2);
                    cartPrice += parseFloat(totalPrice);
                    HTMLtable += '<td>' + totalPrice + '€' + '</td><td><i class="fa-solid fa-trash"></i></td></tr>';        
                }
            });
            
            // Add HTML content for buttons that return to the home page, update the cart and remove all items from the cart
            HTMLtable += '</table><div class="cart-buttons"><div class="buttons-left"><a href="/"><button class="back-to-webshop">Povratak na webshop</button></a></div><div class="buttons-right"><button class="cart-delete-all">Očisti košaricu</button><button class="cart-refresh">Ažuriraj košaricu</button></div></div>';

            // Calculate the price for delivery (if the total price of products exceeds 50€, delivery is free)
            let delivery = (cartPrice > 50) ? 0.00 : 5.00;

            // Create HTML content for checkout part
            HTMLcheckout += '<tr><th>Košarica</th><td class="cart-checkout-price">' + cartPrice.toFixed(2) + '€</td></tr><tr><th>Dostava</th><td><input type="radio" id="cart-checkout-delivery" name="cart-checkout" checked><label for="cart-checkout-delivery">Dostavna služba: ' + delivery + '€</label><br><input type="radio" id="cart-checkout-local" name="cart-checkout"><label for="cart-checkout-local">Lokalno preuzimanje: 0€</label></td></tr>';
            HTMLcheckout += '<tr><th>Ukupno</th><td class="cart-checkout-total">' + (cartPrice + delivery).toFixed(2) + '€</td></tr>';
            HTMLcheckout += '</table></div><div class="checkout-button"><a href="/checkout/"><button class="button-checkout">Plaćanje</button></a></div>';
            
            // Append HTML content to the appropriate elements
            document.querySelector('.cart-table').innerHTML = HTMLtable;
            document.querySelector('.cart-checkout').innerHTML = HTMLcheckout;

            // Add event listeners for trash icons to remove items from cart
            let trashButtons = document.querySelectorAll('.fa-trash');
            trashButtons.forEach(function(button) {
                button.addEventListener('click', function(event) {
                    let link = event.target.closest('tr').querySelector('a').href;
                    let splitURL = link.split('/');
                    let bookId = splitURL[splitURL.length - 1];
                    removeFromCart(bookId);
                });
            });

            // Add event listeners for buttons to remove all items from cart and update cart
            document.querySelector('.cart-delete-all').addEventListener('click', removeAllFromCart);
            document.querySelector('.cart-refresh').addEventListener('click', updateCart);

            // Add event listeners for radio buttons to update checkout information
            document.querySelector('#cart-checkout-delivery').addEventListener('change', updateCheckoutInformation);
            document.querySelector('#cart-checkout-local').addEventListener('change', updateCheckoutInformation);

            document.querySelector('.checkout-button a').addEventListener('click', function(event) {
                event.preventDefault();
                checkout();
            });
        }
    }

    // Function to update checkout information based on selected delivery option
    function updateCheckoutInformation() {
        // Extract the value of the cart price
        let cartPrice = parseFloat(document.querySelector('.cart-checkout-price').textContent.slice(0, -1));

        if (document.querySelector('#cart-checkout-delivery').checked) {
            // If delivery service is selected, update the total checkout price by adding the delivery cost
            let delivery = parseFloat(document.querySelector('label[for="cart-checkout-delivery"]').textContent.match(/\d+/)[0]);
            document.querySelector('.cart-checkout-total').textContent = (cartPrice + delivery).toFixed(2) + '€';
        } else if (document.querySelector('#cart-checkout-local').checked) {
            // If local pickup is selected, update the total checkout price to be equal to the cart price
            document.querySelector('.cart-checkout-total').textContent = cartPrice.toFixed(2) + '€';
        }
    }

    // Function is called on clicking the button for checkout
    // Function checks if user is logged in, and it redirects to appropriate page with URL Search parameters
    async function checkout() {
        let params = new URLSearchParams();

        // Check if delivery option is selected and set the appropriate value for 'del' parameter
        if (document.querySelector('#cart-checkout-delivery').checked) {
            params.append('del', 'true');
        } else if (document.querySelector('#cart-checkout-local').checked) {
            params.append('del', 'false');
        }

        const response = await fetch("/lib/check_session.php");
        const exists = await response.text();
        if (exists === 'false') {
            // If user isn't logged in, redirect to login page with 'del' and 0return' parameter
            params.append('return', 'checkout');
            window.location.href = '/user/login/?' + params.toString();
        } else {
            // If user is logged in, redirect to checkout page with 'del' parameter
            window.location.href = '/checkout/?' + params.toString();
        }
    }

    // Function to remove a book from the cart based on its ID
    function removeFromCart(bookId) {
        let cart = [];

        // Check if 'cart' key exists in localStorage, if it exists parse it as an array to the 'cart' variable
        if (localStorage.getItem('cart') !== null) {
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            cart = [];
        }

        // Loop through each element in the 'cart' array, if an element is found remove the element from the 'cart' array
        cart.forEach(function(element, index) {
            if (element.bookId === bookId) {
                cart.splice(index, 1);
            }
        });

        // Update the 'cart' data in localStorage after removing the book
        localStorage.setItem('cart', JSON.stringify(cart));

        // Call functions to update the cart display after removing the book
        displayCartInformation();
        updateCartHeader();
    }

    // Function to remove all items from the cart
    function removeAllFromCart() {
        // Remove the 'cart' key from local storage, effectively clearing the cart
        localStorage.removeItem('cart');

        // Call functions to update the cart display after removing all items
        displayCartInformation();
        updateCartHeader();
    }

    // Function for updating the quantities of items in the cart
    async function updateCart() {
        let cart = [];

        // Check if 'cart' key exists in localStorage, if it exists parse it as an array to the 'cart' variable
        if (localStorage.getItem('cart') !== null) {
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            cart = [];
        }

        // Collect the book IDs of all the products in the cart
        let ids = [];
        cart.forEach(function(element) {
            ids.push(element.bookId);
        });

        // Prepare parameters (IDs) to be sent to the server
        let params = "ids=" + encodeURIComponent(ids.join(','));

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

        // Variable to track if the update operation was successful
        let success = true;

        // Select all input fields for quantities
        let quantities = document.querySelectorAll('.product-quantity');

        // Loop through each product quantity input field
        for (let i = 0; i < quantities.length; i++) {
            // Check if there are enough items in stock for the updated quantity
            if (bookData[i].book_quantity < parseInt(quantities[i].value)) {
                // If there are not enough items in stock, display error message and reset the input field value to its original quantity
                quantities[i].setAttribute('title', 'Nemamo toliko proizvoda u skladištu!');
                quantities[i].focus();
                success = false;
                quantities[i].value = cart[i].quantity;
            } else {
                // If there are enough items in stock, update the quantity in the cart array
                cart[i].quantity = parseInt(quantities[i].value);
            }
        }

        // If the update operation was successful, update the 'cart' data in localStorage and call functions to update the cart display and header
        if (success) {
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartInformation();
            updateCartHeader();
        }
    }
    
    // Function for adding a book to the cart
    async function addToCart(bookId, quantity) {
        let message; // Variable to store the message indicating success or failure
        let cart = [];

        // Check if 'cart' key exists in localStorage, if it exists parse it as an array to the 'cart' variable
        if (localStorage.getItem('cart') !== null) {
            cart = JSON.parse(localStorage.getItem('cart'));
        } else {
            cart = [];
        }

        // Prepare the ID of the current book to be sent to the server
        let params = "ids=" + encodeURIComponent(bookId);

        // Send POST request to get current book detail
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

        // Variable to track if the book is found in the cart
        let found = false;

        // Loop through each element in the 'cart' array
        cart.forEach(function(element) {
            // Check if the book ID matches any element in the cart, if it matches that just update the quantity of existing item in the cart
            if (element.bookId === bookId) {
                // Check if the quantity exceeds the available stock
                if (bookData[0].book_quantity < element.quantity + quantity) {
                    // If there are not enough items in stock, display error message
                    if (document.querySelector('.product-quantity')) {
                        document.querySelector('.product-quantity').setAttribute('title', 'Nemamo toliko proizvoda u skladištu!');
                        document.querySelector('.product-quantity').focus();
                    }
                    found = true;
                    message = 'fail'; // Set message to 'fail'
                } else {
                    // If the quantity does not exceed the available stock, update the quantity and set found to true
                    if (document.querySelector('.product-quantity')) {
                        document.querySelector('.product-quantity').removeAttribute('title');
                    }
                    element.quantity += quantity;
                    found = true;
                    message = 'success'; // Set message to 'success'
                }
            }
        });

        // If the element was not found among current products in the cart, add new product to the cart
        if (!found) {
            // Check if the quantity exceeds the available stock
            if (bookData[0].book_quantity < quantity) {
                // If there are not enough items in stock, display error message
                if (document.querySelector('.product-quantity')) {
                    document.querySelector('.product-quantity').setAttribute('title', 'Nemamo toliko proizvoda u skladištu!');
                    document.querySelector('.product-quantity').focus();
                }
                message = 'fail'; // Set message to 'fail'
            } else {
                // If the quantity does not exceed the available stock, add the item to the cart
                if (document.querySelector('.product-quantity')) {
                    document.querySelector('.product-quantity').removeAttribute('title');
                }
                let item = {
                    bookId: bookId,
                    quantity: quantity
                };
                cart.push(item);
                message = 'success'; // Set message to 'success'
            }
        }

        // Update the 'cart' data in localStorage after adding the item
        localStorage.setItem('cart', JSON.stringify(cart));

        // Update the cart header
        updateCartHeader();

        // Return the message indicating success or failure
        return message;
    }

    // Select all elements responsible for adding the items to the cart
    let cartButtons = document.querySelectorAll('.cart-button');

    // Iterate over each cart button
    cartButtons.forEach(function(button) {
        // Add event listener to each cart button for 'click' event
        button.addEventListener('click', async function(event) {
            // Check if the button has not been already clicked (only for elements with class 'book')
            if (!button.classList.contains('added-to-cart')) {
                // Check if the button is on the product page
                if (document.querySelector('.product-quantity')) {
                    // Extract book ID from URL and quantity input field
                    let url = window.location.href;
                    let splitURL = url.split('/');
                    let bookId = splitURL[splitURL.length - 2];
                    let quantity = parseInt(document.querySelector('.product-quantity').value);

                    // Ensure quantity input is valid; default to 1 if invalid
                    if (quantity === '' || isNaN(quantity) || quantity === 0) {
                        quantity = 1;
                    }

                    // Extract book name
                    let bookName = document.querySelector('.product-name').textContent;

                    // Add book to cart and await response message ('success' or 'fail')
                    let message = await addToCart(bookId, quantity);

                    // Display success message if addition to cart is successful
                    if (message === 'success') {
                        document.querySelector('.added-to-cart-message').style.display = 'flex';
                        
                        if (quantity > 1) {
                            document.querySelector('.cart-message').textContent = quantity + ' proizvoda "' + bookName + '" uspješno su dodana u košaricu!';
                        } else {
                            document.querySelector('.cart-message').textContent = 'Proizvod "' + bookName + '" uspješno je dodan u košaricu!';
                        }
                    }
                        
                } else {
                    // Get the element with class 'cart-button' that was clicked
                    let clickedElement = event.target.closest('.cart-button');

                    // Get the 'div' element that contains the book ID
                    let parentElement = clickedElement.parentElement;

                    if (parentElement) {
                        let bookId = parentElement.id;
                        let quantity = 1;
    
                        // Add book to cart and await response message ('success' or 'fail')
                        let message = await addToCart(bookId, quantity);

                        // Update button appearance if addition to cart is successful
                        if (message === 'success') {
                            clickedElement.classList.add('added-to-cart');
                            clickedElement.querySelector('.icon').innerHTML = '<i class="fa-solid fa-check"></i>';
                            clickedElement.querySelector('.add-to-cart').textContent = "Dodano";
                        }
                    }
                }
            }
        });
    });

    // Update the cart header on page loading (setTimeout is set because window.onload is already used by another function)
    setTimeout(updateCartHeader, 1000);

    // Check if we are located on the cart page; if so, display cart information
    if (document.querySelector('.cart-container')) {
        displayCartInformation();
    }
});