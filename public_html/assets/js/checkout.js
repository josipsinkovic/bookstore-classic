// Function is called upon loading the page, checks if user is logged in and if there are elements in the cart, redirects accordingly
async function onLoad() {
    // Check if 'cart' key exists in localStorage, if it exists parse it as an array to the 'cart' variable
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // If the cart is empty, redirect the user to the cart page
    if (cart.length === 0) {
        window.location.href = '/checkout/cart';
    } else {
        // Check if user is logged in, if not redirect him to the login page
        const response = await fetch("/lib/check_session.php");
        if (await response.text() === 'false') {
            // Create new URL Search parameters which hold information about delivery and where to redirect after successful login
            let url = window.location.search;
            let params = new URLSearchParams(url);
            let newParams = new URLSearchParams();
            newParams.append('del', params.get('del') || 'true');
            newParams.append('return', 'checkout');
            window.location.href = '/user/login/?' + newParams.toString();
        }
    }
}

window.onload = onLoad;

document.addEventListener('DOMContentLoaded', function() {
    let userID;
    let userNoData = false;
    let cartPrice;

    // Function for displaying products from the cart (on page loading)
    async function displayCartInformation() {
        // Check if 'cart' key exists in localStorage, if it exists parse it as an array to the 'cart' variable
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Extract book IDs from cart items
        let ids = cart.map(element => element.bookId);

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
        
        // Initialize variables for HTML structure and cart price
        let HTMLtable = '<table><tr class="table-header"><th>Naziv proizvoda</th><th>Količina</th><th>Cijena</th><th>Ukupna cijena</th></tr>';
        cartPrice = 0;

        // Iterate over each element in the cart
        cart.forEach(function(element) {
            let id = element.bookId;

            // Find the book information corresponding to the current ID
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

                let bookName = bookInfo.book_name;
                let quantity = element.quantity;

                // Add book details to the HTML table
                HTMLtable += `<tr><td><a href="${link}">${bookName}</a></td><td>${quantity}</td>`;

                // Calculate and display book prices
                let oldPrice = null;
                let newPrice;
                if (bookInfo.book_discount === null) {
                    // If there is no discount, display the book's regular price
                    newPrice = bookInfo.book_price;
                    HTMLtable += `<td><p class="old-price"></p><p class="book-price">${newPrice}€</p></td>`;
                } else {
                    // Calculate new price and display the book's new price along with old price
                    oldPrice = bookInfo.book_price;
                    let discount = bookInfo.book_discount;
                    newPrice = (oldPrice * (1 - discount / 100)).toFixed(2);
                    HTMLtable += `<td><p class="old-price" style="display:inline;">${oldPrice}€</p><p class="book-price" style="display:inline;">${newPrice}€</p></td>`;
                }

                // Calculate total price for current product (price of the product * quantity of the product)
                let totalPrice = (newPrice * quantity).toFixed(2);
                cartPrice += parseFloat(totalPrice);
                HTMLtable += `<td>${totalPrice}€`;        
            }
        });

        // Calculate the price for delivery (if the total price of products exceeds 50€, delivery is free)
        let delivery = (cartPrice > 50) ? 0.00 : 5.00;
        let HTMLprice = `<p class="cart-checkout-price">Zbroj košarice:${cartPrice.toFixed(2)}€</p>`;
        
        // Determine if the delivery option is set to 'local' by checking the 'del' parameter in the URL
        let url = window.location.search;
        let urlParams = new URLSearchParams(url);
        let isLocal = urlParams.get('del') && urlParams.get('del') === 'false';

        // Construct HTML for delivery options based on whether it's local or not
        HTMLprice += `<div class="checkout-delivery"><input type="radio" id="cart-checkout-delivery" name="cart-checkout"${isLocal ? '' : ' checked'}><label for="cart-checkout-delivery">Dostavna služba: ${delivery}€</label><br><input type="radio" id="cart-checkout-local" name="cart-checkout"${isLocal ? ' checked' : ''}><label for="cart-checkout-local">Lokalno preuzimanje: 0€</label>`;

        // If the delivery is set to local, hide 'on-delivery' billing method
        document.querySelector('.billing-on-delivery').style.display = isLocal ? 'none' : 'block';

        // Change the default checked billing method based on delivery option
        if (isLocal && document.querySelector('#payment-on-delivery').checked) {
            document.querySelector('#payment-card').checked = 'true';
            document.querySelector('#payment-card').dispatchEvent(new Event('change'));
        } else {
            document.querySelector('#payment-on-delivery').checked = 'true';
            document.querySelector('#payment-on-delivery').dispatchEvent(new Event('change'));
        }

        HTMLprice += `<p class="cart-checkout-total">Ukupna cijena: ${(cartPrice + delivery).toFixed(2)}€</p>`;

        // Append HTML content to the appropriate elements
        document.querySelector('.checkout-cart-table').innerHTML = HTMLtable;
        document.querySelector('.checkout-cart-price').innerHTML = HTMLprice;

        // Add event listeners for radio buttons to update checkout information
        document.querySelector('#cart-checkout-delivery').addEventListener('change', updateCheckoutInformation);
        document.querySelector('#cart-checkout-local').addEventListener('change', updateCheckoutInformation);
    }

    // Function to update checkout information based on selected delivery option
    function updateCheckoutInformation() {
        // Extract the value of the cart price
        let cartPrice = parseFloat(document.querySelector('.cart-checkout-price').textContent.match(/\d+(\.\d+)?/)[0]);

        if (document.querySelector('#cart-checkout-delivery').checked) {
            // If delivery service is selected, update the total checkout price by adding the delivery cost
            let delivery = parseFloat(document.querySelector('label[for="cart-checkout-delivery"]').textContent.match(/\d+/)[0]);
            document.querySelector('.cart-checkout-total').textContent = `Ukupna cijena: ${(cartPrice + delivery).toFixed(2)}€`;
            document.querySelector('.billing-on-delivery').style.display = 'block';
        } else if (document.querySelector('#cart-checkout-local').checked) {
            // If local pickup is selected, update the total checkout price to be equal to the cart price and hide 'on-delivery' billing option
            document.querySelector('.cart-checkout-total').textContent = `Ukupna cijena: ${cartPrice.toFixed(2)}€`;
            document.querySelector('.billing-on-delivery').style.display = 'none';

            // Change the default checked billing method
            if (document.querySelector('#payment-on-delivery').checked) {
                document.querySelector('#payment-card').checked = 'true';
                document.querySelector('#payment-card').dispatchEvent(new Event('change'));
            }
        }
    }

    // Function to display personal information of the user for delivery
    async function displayPersonalInformation() {
        // Send a POST request to fetch user details from the server
        const response = await fetch("/lib/fetch_user_details.php", {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        // Parse the server response as JSON
        let userData = await response.json();

        // Assign the user's ID to the global variable
        userID = userData.customer_id;

        // Set user details in delivery form fields
        document.querySelector('#delivery-first-name').value = userData.first_name;
        document.querySelector('#delivery-first-name').readOnly = 'true';

        document.querySelector('#delivery-last-name').value = userData.last_name;
        document.querySelector('#delivery-last-name').readOnly = 'true';

        document.querySelector('#delivery-email').value = userData.email;
        document.querySelector('#delivery-email').readOnly = 'true';

        // Check if user has no address, city, postal code, or phone number data
        if (userData.address === null && userData.city === null && userData.postal_code === null && userData.phone_number === null) {
            userNoData = true;
        }

        // Set user's address, city, postal code, and phone number if available
        if (userData.address !== null) {
            document.querySelector('#delivery-address').value = userData.address;
        }
        if (userData.city !== null) {
            document.querySelector('#delivery-city').value = userData.city;
        }
        if (userData.postal_code !== null) {
            document.querySelector('#delivery-postal-code').value = userData.postal_code;
        }
        if (userData.phone_number !== null) {
            document.querySelector('#delivery-phone').value = userData.phone_number;
        }
    }

    // Function to toggle between payment methods and display proper billing bodies based on the selected option
    function togglePaymentMethods(method) {
        // Check the selected payment method and adjust the display accordingly
        if (method === 'on-delivery') {
            document.querySelector('.billing-on-delivery .billing-body').style.display = 'block';
            document.querySelector('.billing-on-delivery .billing-header').style.borderBottomLeftRadius = 0;
            document.querySelector('.billing-on-delivery .billing-header').style.borderBottomRightRadius = 0;
            document.querySelector('.billing-card .billing-body').style.display = 'none';
            document.querySelector('.billing-card .billing-header').style.borderBottomLeftRadius = '10px';
            document.querySelector('.billing-card .billing-header').style.borderBottomRightRadius = '10px';
            document.querySelector('.billing-slip .billing-body').style.display = 'none';
            document.querySelector('.billing-slip .billing-header').style.borderBottomLeftRadius = '10px';
            document.querySelector('.billing-slip .billing-header').style.borderBottomRightRadius = '10px';
        } else if (method === 'card') {
            document.querySelector('.billing-on-delivery .billing-body').style.display = 'none';
            document.querySelector('.billing-on-delivery .billing-header').style.borderBottomLeftRadius = '10px';
            document.querySelector('.billing-on-delivery .billing-header').style.borderBottomRightRadius = '10px';
            document.querySelector('.billing-card .billing-body').style.display = 'block';
            document.querySelector('.billing-card .billing-header').style.borderBottomLeftRadius = 0;
            document.querySelector('.billing-card .billing-header').style.borderBottomRightRadius = 0;
            document.querySelector('.billing-slip .billing-body').style.display = 'none';
            document.querySelector('.billing-slip .billing-header').style.borderBottomLeftRadius = '10px';
            document.querySelector('.billing-slip .billing-header').style.borderBottomRightRadius = '10px';
        } else if (method === 'slip') {
            document.querySelector('.billing-on-delivery .billing-body').style.display = 'none';
            document.querySelector('.billing-on-delivery .billing-header').style.borderBottomLeftRadius = '10px';
            document.querySelector('.billing-on-delivery .billing-header').style.borderBottomRightRadius = '10px';
            document.querySelector('.billing-card .billing-body').style.display = 'none';
            document.querySelector('.billing-card .billing-header').style.borderBottomLeftRadius = '10px';
            document.querySelector('.billing-card .billing-header').style.borderBottomRightRadius = '10px';
            document.querySelector('.billing-slip .billing-body').style.display = 'block';
            document.querySelector('.billing-slip .billing-header').style.borderBottomLeftRadius = 0;
            document.querySelector('.billing-slip .billing-header').style.borderBottomRightRadius = 0;
        }
    }

    async function orderItem() {
        let addressErr = "", cityErr = "", postalErr = "", phoneErr = "";

        let orderAddress = document.querySelector('#delivery-address').value;
        let orderCity = document.querySelector('#delivery-city').value;
        let orderPostalCode = document.querySelector('#delivery-postal-code').value;
        let orderPhoneNumber = document.querySelector('#delivery-phone').value;

        // Validate address input
        if (orderAddress === '') {
            addressErr = 'Greška: Obvezno';
        } else {
            addressErr = '';
        }

        // Validate city input
        if (orderCity === "") {
            cityErr = "Greška: Obvezno";
        } else if (!/^[a-zA-Z\u0080-\u024F]+(?:[\s-][a-zA-Z\u0080-\u024F]+)*$/.test(orderCity)) {
            cityErr = "Greška: Neispravan format";
        } else {
            cityErr = "";
        }

        // Validate postal code input
        if (!parseInt(orderPostalCode)) {
            postalErr = "Greška: Odaberite poštanski broj!";
        } else {
            postalErr = "";
        }

        // Validate phone number input
        if (orderPhoneNumber === '') {
            phoneErr = 'Greška: Obvezno';
        } else {
            phoneErr = '';
        }

        // Display error messages if any, otherwise, proceed with order process
        if (addressErr !== '' || cityErr !== '' || postalErr !== '' || phoneErr !== '') {
            document.querySelector('#addressErr').textContent = addressErr;
            document.querySelector('#cityErr').textContent = cityErr;
            document.querySelector('#postalErr').textContent = postalErr;
            document.querySelector('#phoneErr').textContent = phoneErr;

            // Let user have the control of the page
            document.querySelector('.order-popup-overlay').style.display = 'none';
        } else {
            // Clear previous error messages
            document.querySelectorAll('.delivery-form > span').forEach(span => span.textContent = '');

            // Determine the selected delivery method and fetch its cost if applicable
            let delivery;
            if (document.querySelector('#cart-checkout-delivery').checked) {
                delivery = parseFloat(document.querySelector('label[for="cart-checkout-delivery"]').textContent.match(/\d+/)[0]);
            } else if (document.querySelector('#cart-checkout-local').checked) {
                delivery = 'no';
            }

            // Initialize variables for payment method and error handling
            let paymentMethod = '';
            let paymentError = false;

            // Determine the selected payment method and perform validation if needed
            if (document.querySelector('#payment-on-delivery').checked) {
                paymentMethod = 'on-delivery';
            } else if (document.querySelector('#payment-card').checked) {
                paymentMethod = 'card';

                // Retrieve card information and perform validation
                let cardNumber = document.querySelector('#creditCardNumber').value; //length: 19
                let expiryDate = document.querySelector('#cardExpiryDate').value; //length: 5 + check date
                let CVV = document.querySelector('#cardCVV').value; //length: 3 or 4
                let date = expiryDate.match(/\d+/g);

                // Validate card number length
                if (cardNumber.length !== 19) {
                    paymentError = true;
                    document.querySelector('#cardNumberError').style.display = 'block';
                } else {
                    document.querySelector('#cardNumberError').style.display = 'none';
                }

                // Validate expiry date format and expiration
                if (expiryDate.length !== 5 || parseInt(date[0]) > 12) {
                    paymentError = true;
                    document.querySelector('#cardDateInputError').style.display = 'block';
                } else if (parseInt(date[1]) < new Date().getFullYear().toString().slice(-2)) {
                    paymentError = true;
                    document.querySelector('#cardDateExpiryError').style.display = 'block';
                } else if (parseInt(date[1]) == new Date().getFullYear().toString().slice(-2) && parseInt(date[0]) < new Date().getMonth() + 1) {
                    paymentError = true;
                    document.querySelector('#cardDateExpiryError').style.display = 'block';
                } else {
                    document.querySelector('#cardDateInputError').style.display = 'none';
                    document.querySelector('#cardDateExpiryError').style.display = 'none';
                }

                // Validate CVV length
                if (CVV.length < 3) {
                    paymentError = true;
                    document.querySelector('#cardCVVError').style.display = 'block';
                } else {
                    document.querySelector('#cardCVVError').style.display = 'none';
                }
            } else if (document.querySelector('#payment-slip').checked) {
                paymentMethod = 'slip';
            }

            // Proceed if there are no payment errors
            if (!paymentError) {
                // Prepare order details for submission
                const params = new URLSearchParams();
                params.append('userID', userID);
                params.append('address', orderAddress);
                params.append('city', orderCity);
                params.append('postalCode', orderPostalCode);
                params.append('phone', orderPhoneNumber);
                params.append('delivery', delivery);
                params.append('payment', paymentMethod);

                if (parseFloat(delivery)) {
                    cartPrice += parseFloat(delivery);
                }
                params.append('totalPrice', cartPrice);

                // Send order details to the server
                let response = await fetch('/lib/insert_order.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: params
                });

                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
        
                // Parse the server response as JSON
                let orderData = await response.json();

                if (orderData.status === "success") {
                    // Extract order ID from response
                    let orderID = parseInt(orderData.message);

                    // Retrieve cart items from localStorage
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];

                    // Extract IDs of items in the cart
                    const ids = cart.map(element => element.bookId);

                    // Prepare parameters (IDs) to be sent to the server
                    let params = "ids=" + encodeURIComponent(ids.join(','));

                    // Retrieve book details from the server
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

                    // For each element of the order save its information in OrderDetails database table
                    for (const element of cart) {
                        let id = element.bookId;

                        // Retrieve book information
                        let bookInfo = bookData.find(book => book.id == parseInt(id));

                        // Extract quantity and calculate price
                        let quantity = element.quantity;
                        let price;
                        if (bookInfo.book_discount === null) {
                            price = bookInfo.book_price;
                        } else {
                            let oldPrice = bookInfo.book_price;
                            let discount = bookInfo.book_discount;
                            price = oldPrice * (1 - discount / 100);
                        }
                        price = parseFloat(price).toFixed(2);
                        let totalPrice = parseFloat(price * quantity).toFixed(2);

                        let quantityMode = 'take';

                        // Prepare order details for insertion
                        let orderParams = new URLSearchParams();
                        orderParams.append('orderID', orderID);
                        orderParams.append('bookID', id);
                        orderParams.append('quantity', quantity);
                        orderParams.append('price', price);
                        orderParams.append('totalPrice', totalPrice);
                        orderParams.append('quantityMode', quantityMode);

                        // Insert order details into the database
                        let response = await fetch("/lib/insert_order_details.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: orderParams
                        });

                        if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                        }

                        // Update book quantity in the database
                        response = await fetch("/lib/update_book_quantity.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: orderParams
                        });

                        if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                        }
                    }

                    // If user has no optional data, set this data to be the data entered in the form
                    if (userNoData) {
                        let updateUserInformation = new URLSearchParams();
                        updateUserInformation.append('customerID', userID);
                        updateUserInformation.append('first_name', document.querySelector('#delivery-first-name').value);
                        updateUserInformation.append('last_name', document.querySelector('#delivery-last-name').value);
                        updateUserInformation.append('email', document.querySelector('#delivery-email').value);
                        updateUserInformation.append('address', orderAddress);
                        updateUserInformation.append('city', orderCity);
                        updateUserInformation.append('postal_code', orderPostalCode);
                        updateUserInformation.append('phone', orderPhoneNumber);

                        // Update customer information
                        let response = await fetch("/lib/update_customer.php", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: updateUserInformation
                        });

                        if (!response.ok) {
                            throw new Error("HTTP error " + response.status);
                        }
                    }

                    localStorage.removeItem('cart');

                    // Redirect user to the details page of the current order
                    window.location.href = `/user/account/order/?order_id=${orderID}`;
                } else {
                    // If order fails, allow user to have control of the page
                    document.querySelector('.order-popup-overlay').style.display = 'none';
                }
            } else {
                // If payment error occurs, allow user to have control of the page
                document.querySelector('.order-popup-overlay').style.display = 'none';
            }
        }
    }

    function formatCardNumberInput(input) {
        // Group the digits into groups of four, separated by a space
        let formattedValue = input.value.replace(/(\d{4})(?=\d)/g, '$1 ');

        // Update the input value with the formatted value
        input.value = formattedValue;
    }

    function formatCardExpiryInput(input) {
        let formattedValue = input.value;

        // Insert '/' after the second number if needed
        if (formattedValue.length > 2) {
            formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
        }
        
        // Update the input value with the formatted value
        input.value = formattedValue;
    }

    // If button for ordering has been clicked, display pop-up message for confirm order
    function buttonOrderClicked() {
        document.querySelector('.order-popup-overlay').style.display = 'block';
        document.querySelector('.order-popup').style.display = 'block';
        document.querySelector('.order-popup-overlay').style.background = 'rgba(0, 0, 0, 0.5)';
    }

    // If cancel button has been clicked, hide pop-up message
    function cancelOrderClicked() {
        document.querySelector('.order-popup-overlay').style.display = 'none';
    }

    // If user wants to make order, prevent them from interacting with the page until they are automatically redirected
    function resumeOrderClicked() {
        document.querySelector('.order-popup').style.display = 'none';
        document.querySelector('.order-popup-overlay').style.display = 'block';
        document.querySelector('.order-popup-overlay').style.background = 'rgba(0, 0, 0, 0)';
        orderItem();
    }

    // Get all the input elements within the billing-header class
    let methods = document.querySelectorAll('.billing-header > input');

    // Add the event listener for togglePaymentMethods function when payment method gets changed
    methods.forEach(function(method) {
        method.addEventListener('change', function(event) {
            let clickedElement = event.target.closest('.billing-header');
            let elementClass = clickedElement.parentElement.className;
            togglePaymentMethods(elementClass.substring(elementClass.indexOf('-') + 1));
        })
    });
    

    document.querySelector('.button-order').addEventListener('click', buttonOrderClicked);
    document.querySelector('.popup-cancel-order').addEventListener('click', cancelOrderClicked);
    document.querySelector('.popup-resume-order').addEventListener('click', resumeOrderClicked);

    // Format the credit card number input
    document.querySelector('#creditCardNumber').addEventListener('input', function() {
        formatCardNumberInput(this);
    });

    // Format the credit card expiry date input
    document.querySelector('#cardExpiryDate').addEventListener('input', function() {
        formatCardExpiryInput(this);
    });

    displayCartInformation();
    displayPersonalInformation();
});