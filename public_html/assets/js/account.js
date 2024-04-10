async function onLoad() {
    // Check if user is logged in, if not redirect him to the login page
    const response = await fetch("/lib/check_session.php");
    if (await response.text() === 'false') {
        window.location.href = '/user/login/';
    }

    // If user tries to access order that he isn't the author of, redirect him to account page
    if (window.location.pathname === '/user/account/order/') {
        const response = await fetch("/lib/fetch_user_details.php", { method: "POST" });
        let userID = await response.json();
        userID = "userID=" + encodeURIComponent(userID.customer_id);

        // Get order ID from URL parameter
        let params = new URLSearchParams(window.location.search);
        let orderID = params.get('order_id');

        const order = await fetch("/lib/get_orders.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: userID
        });
        let orders = await order.json();

        // Check if the the user is accessing the right order
        let found = false;
        orders.forEach(function(element) {
            if (element.order_id == orderID) {
                found = true;
            }
        });

        // If the order isn't correct, redirect the user to the account page
        if (!found) {
            window.location.href = '/user/account/';
        }
    }
}

window.onload = onLoad;

document.addEventListener('DOMContentLoaded', async function() {
    // Wait for function to complete
    await onLoad();

    let userID;

    // This function displays user data from database to the appropriate input fields
    async function displayUserDetails() {
        // Fetch current user details from the server
        let response = await fetch('/lib/fetch_user_details.php', {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        // Parse the server response as JSON
        let userData = await response.json();

        // Assign user ID from the retrieved data to the global userID variable
        userID = userData.customer_id;

        // Populate input fields on the webpage with the retrieved user data
        document.querySelector('#first-name').value = userData.first_name;
        document.querySelector('#last-name').value = userData.last_name;
        document.querySelector('#email').value = userData.email;

        // Populate optional input fields if the corresponding data exists
        if (userData.address !== null) {
            document.querySelector('#address').value = userData.address;
        }
        if (userData.city !== null) {
            document.querySelector('#city').value = userData.city;
        }
        if (userData.postal_code !== null) {
            document.querySelector('#postal-code').value = userData.postal_code;
        }
        if (userData.phone_number !== null) {
            document.querySelector('#phone-number').value = userData.phone_number;
        }
    }

    // This function displays information about all orders of the current user
    async function displayOrderInformation() {
        // Initialize HTML table string with table headers
        let HTMLtable = '<table><tr><th>Narudžba</th><th>Datum</th><th>Ukupni iznos</th><th>Status</th><th></th></tr>';

        // Fetch user orders from the server
        let response = await fetch('/lib/get_orders.php', {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        // Parse the server response as JSON
        let orders = await response.json();

        // Iterate over each order and format its details
        orders.forEach(function(order) {
            let id = order.order_id;
            let date = new Date(order.order_date).toLocaleDateString('hr-HR');
            let totalPrice = parseFloat(order.total_price);
            let status = order.status;

            // Adjust status text based on order status
            if (status === 'completed') {
                status = 'Isporučeno';
            } else if (status === 'canceled') {
                status = 'Otkazano';
            } else if (status === 'pending') {
                status = 'Na čekanju';
            }

            // Construct table row for the order and append it to the HTML table string
            HTMLtable += `<tr><td class="order-id">${id}</td><td>${date}</td><td>${totalPrice}€</td><td>${status}</td><td><a href="/user/account/order/?order_id=${id}">Prikaz narudžbe</a></td></tr>`;
        });

        HTMLtable += '</table>';

        // Set the innerHTML of the '.orders-table' element with the constructed HTML table string
        document.querySelector('.orders-table').innerHTML = HTMLtable;
    }

    // This function shows details of selected order
    async function displayOrderDetails() {
        // Extract order ID from URL parameters
        let params = new URLSearchParams(window.location.search);
        let orderID = params.get('order_id');

        document.querySelector('.order-header').innerHTML = `Narudžba #${orderID}`;

        // Fetch order information based on the order ID
        let param = "orderID=" + encodeURIComponent(orderID);
        let response = await fetch("/lib/get_order.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: param
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        // Parse the server response as JSON
        let orderInformation = await response.json();

        // Adjust display of status based on order status, enable cancelling the order if status is 'pending'
        if (orderInformation.status === 'pending') {
            document.querySelector('.order-status-show').textContent = `Status: Na čekanju`;
            document.querySelector('.order-status-cancel').style.display = 'flex';
        } else if (orderInformation.status === 'completed') {
            document.querySelector('.order-status-show').textContent = `Status: Isporučeno`;
            document.querySelector('.order-status-cancel').style.display = 'none';
        } else if (orderInformation.status === 'canceled') {
            document.querySelector('.order-status-show').textContent = `Status: Otkazano`;
            document.querySelector('.order-status-cancel').style.display = 'none';
        }

        // Display order date
        let date = new Date(orderInformation.order_date).toLocaleDateString('hr-HR');
        document.querySelector('.order-date').textContent = `Datum narudžbe: ${date}`;

        // Get information about delivery and total order price
        let delivery = orderInformation.delivery;
        delivery = (parseFloat(delivery)) ? parseFloat(delivery) + '€' : 'ne';
        let totalPrice = orderInformation.total_price;

        // Display the information about the order
        document.querySelector('.information-address').innerHTML = `${orderInformation.address}`;
        document.querySelector('.information-postal-city').innerHTML = `${orderInformation.postal_code} ${orderInformation.city}`;
        document.querySelector('.information-phone').innerHTML = `telefon: ${orderInformation.phone_number}`;
        document.querySelector('.information-payment-method').innerHTML = 'Metoda plaćanja: ';
        document.querySelector('.information-payment-method').innerHTML += (orderInformation.payment_method === 'on-delivery') ? 'pouzeće' : (orderInformation.payment_method === 'card') ? 'kartično' : (orderInformation.payment_method === 'slip') ? 'virmansko' : '';

        // Get user's first and last name
        response = await fetch('/lib/fetch_user_details.php', {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        let userData = await response.json();

        // Display first and last name of the user
        document.querySelector('.information-name').innerHTML = `${userData.first_name} ${userData.last_name}`;

        // Fetch order details based on the order ID
        response = await fetch("/lib/get_order_details.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: param
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        // Parse the server response as JSON
        let orderDetails = await response.json();

        let HTMLtable = '<table><tr><th>Naziv proizvoda</th><th>Cijena</th><th>Količina</th><th>Ukupna cijena</th></tr>';
        let total = 0;

        // Iterate over order details and display each product
        for (let book of orderDetails) {
            let id = book.book_id;
            let quantity = book.quantity;
            let price = book.price;
            let totalPrice = parseFloat(book.total_price);

            total += totalPrice;

            let param = "ids=" + encodeURIComponent(id);

            // Get book name from the database
            response = await fetch("/lib/get_book_details.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: param
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
    
            let bookDetails = await response.json();

            let bookName = bookDetails[0].book_name;

            HTMLtable += `<tr><td>${bookName}</td><td>${price}€</td><td>${quantity}</td><td>${totalPrice}€</td></tr>`;
        }

        HTMLtable += '</table>';

        // Display order details table
        document.querySelector('.order-details-table').innerHTML = HTMLtable;

        // Display summary about current order
        let HTMLorderSummary = `<table><tr><td>Ukupno:</td><td>${total.toFixed(2)}€</td></tr><tr><td>Dostava:</td><td>${delivery}</td></tr><tr><th>Ukupno:</th><th>${totalPrice}€</th></tr></table>`;
        document.querySelector('.order-details-summary').innerHTML = HTMLorderSummary;
    }

    // This function saves changed user data (first name, last name, email)
    async function saveUserData() {
        // Initialize error messages for each input field
        let fnameErr = '', lnameErr = '', emailErr = '';

        // Retrieve values of first name, last name, and email input fields
        let firstName = document.querySelector('#first-name').value;
        let lastName = document.querySelector('#last-name').value;
        let email = document.querySelector('#email').value;

        // Validate first name input
        if (firstName === "") {
            fnameErr = "Greška: Obvezno";
        } else if (!/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(firstName)) {
            fnameErr = "Greška: Neispravan format";
        } else {
            fnameErr = "";
        }

        // Validate last name input
        if (lastName === "") {
            lnameErr = "Greška: Obvezno";
        } else if (!/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(lastName)) {
            lnameErr = "Greška: Neispravan format";
        } else {
            lnameErr = "";
        }

        // Validate e-mail input
        if (email === "") {
            emailErr = "Greška: Obvezno";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            emailErr = "Greška: Unesite ispravnu e-mail adresu (npr. johndoe@domain.com)";
        } else {
            emailErr = "";
        }

        // Display error messages if any validation error occurs
        if (fnameErr !== "" || lnameErr !== "" || emailErr !== "") {
            document.getElementById("fnameErr").textContent = fnameErr;
            document.getElementById("lnameErr").textContent = lnameErr;
            document.getElementById("emailErr").textContent = emailErr;
        } else {
            // Clear previous error messages
            document.querySelectorAll('.user-data > span').forEach(span => span.textContent = '');

            // Construct parameters to be sent to the server
            let params = new URLSearchParams();
            params.append('customerID', userID);
            params.append('first_name', firstName);
            params.append('last_name', lastName);
            params.append('email', email);

            // Send request to update user data to the server
            let response = await fetch('/lib/update_customer.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
    
            // Parse the server response as JSON
            let returnMessage = await response.json();

            // Display appropriate message based on the status
            if (returnMessage.status === 'success') {
                document.querySelector('#globalMessage').textContent = returnMessage.message;
            } else if (returnMessage.status === 'error') {
                document.querySelector('#globalMessage').textContent = returnMessage.message;
            }
        }
    }

    // This function validates and changes user's password on the account page
    async function changePassword() {
        // Initialize error messages for each input field
        let oldPassErr = '', newPassErr = '', confPassErr = '';

        // Retrieve values of old password, new password, and confirm new password input fields
        let oldPassword = document.querySelector('#old-password').value;
        let newPassword = document.querySelector('#new-password').value;
        let confirmNewPassword = document.querySelector('#confirm-new-password').value;

        // Validate old password input
        if (oldPassword === "") {
            oldPassErr = "Greška: Obvezno";
        } else if (oldPassword.length < 8) {
            oldPassErr = "Greška: Minimalna dužina ovog polja je 8 znakova";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(oldPassword)) {
            oldPassErr = "Greška: Lozinka treba sadržavati mala i velika slova, brojeve i posebne znakove";
        } else {
            oldPassErr = "";
        }

        // Validate new password input
        if (newPassword === "") {
            newPassErr = "Greška: Obvezno";
        } else if (newPassword.length < 8) {
            newPassErr = "Greška: Minimalna dužina ovog polja je 8 znakova";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(newPassword)) {
            newPassErr = "Greška: Lozinka treba sadržavati mala i velika slova, brojeve i posebne znakove";
        } else if (newPassword == oldPassword) {
            newPassErr = "Greška: Nova lozinka ne smije biti ista kao i stara!";
        } else {
            newPassErr = "";
        }

        // Validate confirm password input: Check if password match
        if (confirmNewPassword === "") {
            confPassErr = "Greška: Obvezno";
        } else if (confirmNewPassword !== newPassword) {
            confPassErr = "Greška: Molimo unesite istu vrijednost";
        } else {
            confPassErr = "";
        }

        // Display error messages if any validation error occurs
        if (oldPassErr !== "" || newPassErr !== "" || confPassErr !== "") {
            document.getElementById("oldPassErr").textContent = oldPassErr;
            document.getElementById("newPassErr").textContent = newPassErr;
            document.getElementById("confPassErr").textContent = confPassErr;
        } else {
            // Clear previous error messages
            document.querySelectorAll('.user-change-password > span').forEach(span => span.textContent = '');

            // Construct parameters to be sent to the server
            let params = new URLSearchParams();
            params.append('customerID', userID);
            params.append('old-password', oldPassword);
            params.append('new-password', newPassword);

            // Send request to update user's password to the server
            let response = await fetch('/lib/update_password.php', {
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
            let returnMessage = await response.json();

            // Display appropriate message based on the status
            if (returnMessage.status === 'success') {
                document.querySelector('#globalMessage').textContent = returnMessage.message;
            } else if (returnMessage.status === 'error') {
                document.querySelector('#globalMessage').textContent = returnMessage.message;
            }
        }
    }

    // This function validates and updates user's address details in the database 
    async function changeAddress() {
        // Initialize error messages for each input field
        let addressErr = "", cityErr = "", postalErr = "", phoneErr = "";

        // Retrieve values of address, city, postal code, and phone number input fields
        let address = document.querySelector('#address').value;
        let city = document.querySelector('#city').value;
        let postalCode = document.querySelector('#postal-code').value;
        let phoneNumber = document.querySelector('#phone-number').value;

        // Validate city input
        if (city === "") {
            cityErr = "";
        } else if (!/^[a-zA-Z\u0080-\u024F]+(?:[\s-][a-zA-Z\u0080-\u024F]+)*$/.test(city)) {
            cityErr = "Greška: Neispravan format";
        } else {
            cityErr = "";
        }

        // Validate postal code input
        if (!parseInt(postalCode)) {
            postalCode = '';
        }

        // Display error messages if any validation error occurs
        if (addressErr !== "" || cityErr !== "" || postalErr !== "" || phoneErr !== "") {
            document.getElementById("addressErr").textContent = addressErr;
            document.getElementById("cityErr").textContent = cityErr;
            document.getElementById("postalErr").textContent = postalErr;
            document.getElementById("phoneErr").textContent = phoneErr;
        } else {
            // Clear previous error messages
            document.querySelectorAll('.my-address > span').forEach(span => span.textContent = '');

            // Construct parameters to be sent to the server
            let params = new URLSearchParams();
            params.append('customerID', userID);
            params.append('address', address);
            params.append('city', city);
            params.append('postal_code', postalCode);
            params.append('phone', phoneNumber);

            // Send request to update user's address details to the server
            let response = await fetch('/lib/update_customer.php', {
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
            let returnMessage = await response.json();

            // Display appropriate message based on the status
            if (returnMessage.status === 'success') {
                document.querySelector('#globalMessage').textContent = returnMessage.message;
            } else if (returnMessage.status === 'error') {
                document.querySelector('#globalMessage').textContent = returnMessage.message;
            }
        }
    }

    // This function cancels the order by updating its status to "canceled" on the server
    async function cancelOrder() {
        // Retrieve order ID from URL parameters
        let params = new URLSearchParams(window.location.search);
        let orderID = params.get('order_id');

        // Set status to 'canceled'
        let status = 'canceled';

        // Construct parameters to update order status
        let sendParams = new URLSearchParams();
        sendParams.append('orderID', orderID);
        sendParams.append('status', status);

        // Send request to update order status to the server
        let response = await fetch('/lib/update_order_status.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: sendParams
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        // Parse the server response as JSON
        let returnMessage = await response.json();

        // If the status was successfully updated, update the book quantities by adding book that have been canceled
        if (returnMessage.status === 'success') {
            // Retrieve order details from the server
            let param = "orderID=" + encodeURIComponent(orderID);
            response = await fetch("/lib/get_order_details.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: param
            });
    
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
    
            // Parse the server response as JSON
            let orderDetails = await response.json();

            // Set quantity mode to 'add'
            let quantityMode = 'add';

            // Update the quantity of each book in the canceled order
            for (let book of orderDetails) {
                let bookID = book.book_id;
                let quantity = book.quantity;

                // Construct parameters to update book quantity
                let quantityParams = new URLSearchParams();
                quantityParams.append('bookID', bookID);
                quantityParams.append('quantityMode', quantityMode);
                quantityParams.append('quantity', quantity);

                // Send request to update book quantity to the server
                response = await fetch("/lib/update_book_quantity.php", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: quantityParams
                });
        
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
            }
        }
        // Reload the page to reflect the updated order status and book quantities
        location.reload();
    }

    // If button for cancelling order has been clicked, display pop-up message for confirm the action
    function cancelOrderClicked() {
        document.querySelector('.cancel-popup-overlay').style.display = 'block';
        document.querySelector('.cancel-popup').style.display = 'block';
        document.querySelector('.cancel-popup-overlay').style.background = 'rgba(0, 0, 0, 0.5)';
    }

    // If cancel button has been clicked, hide pop-up message
    function exitCancelClicked() {
        document.querySelector('.cancel-popup-overlay').style.display = 'none';
    }

    // If user wants to cancel order, prevent them from interacting with the page until the page gets automatically reloaded
    function resumeCancelClicked() {
        document.querySelector('.cancel-popup').style.display = 'none';
        document.querySelector('.cancel-popup-overlay').style.display = 'block';
        document.querySelector('.cancel-popup-overlay').style.background = 'rgba(0, 0, 0, 0)';
        cancelOrder();
    }

    // If we are on the accounts page, executes proper functions and add event listeners for user account navigation
    if (window.location.pathname === '/user/account/') {
        displayUserDetails();
        displayOrderInformation();

        document.querySelector('.user-information').addEventListener('click', function() {
            document.querySelector('.user-information').classList.add('highlight');
            document.querySelector('.user-address').classList.remove('highlight');
            document.querySelector('.user-orders').classList.remove('highlight');
            document.querySelector('.my-information').classList.add('active');
            document.querySelector('.my-address').classList.remove('active');
            document.querySelector('.my-orders').classList.remove('active');
        });
        document.querySelector('.user-address').addEventListener('click', function() {
            document.querySelector('.user-information').classList.remove('highlight');
            document.querySelector('.user-address').classList.add('highlight');
            document.querySelector('.user-orders').classList.remove('highlight');
            document.querySelector('.my-information').classList.remove('active');
            document.querySelector('.my-address').classList.add('active');
            document.querySelector('.my-orders').classList.remove('active');
        });
        document.querySelector('.user-orders').addEventListener('click', function() {
            document.querySelector('.user-information').classList.remove('highlight');
            document.querySelector('.user-address').classList.remove('highlight');
            document.querySelector('.user-orders').classList.add('highlight');
            document.querySelector('.my-information').classList.remove('active');
            document.querySelector('.my-address').classList.remove('active');
            document.querySelector('.my-orders').classList.add('active');
        });

        // Event listeners for user account actions
        document.querySelector('#user-data-submit').addEventListener('click', saveUserData);
        document.querySelector('#user-password-change').addEventListener('click', changePassword);
        document.querySelector('#user-address-change').addEventListener('click', changeAddress);
    } else if (window.location.pathname === '/user/account/order/') {
        // If we are on order details page, execute the function for displaying order information and add event listeners for cancelling the order
        displayOrderDetails();

        document.querySelector('.cancel-order').addEventListener('click', cancelOrderClicked);
        document.querySelector('.popup-exit-cancel').addEventListener('click', exitCancelClicked);
        document.querySelector('.popup-resume-cancel').addEventListener('click', resumeCancelClicked);
    }
});