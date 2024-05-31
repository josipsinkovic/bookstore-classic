document.addEventListener("DOMContentLoaded", function() {
    
    /**
     * Validates user registration form input fields and displays error messages if validation fails.
     * If all input is valid, sends a POST request to the register.php file and handles the server response.
     */
    async function registerValidate() {
        let fnameErr = "", lnameErr = "", emailErr = "", passErr = "", confPassErr = "";

        let inputFirstName = document.getElementById("first-name").value;
        let inputLastName = document.getElementById("last-name").value;
        let inputEmail = document.getElementById("email").value;
        let inputPassword = document.getElementById("password").value;
        let inputConfirmPassword = document.getElementById("confirmPassword").value;

        // Validate first name input
        if (inputFirstName === "") {
            fnameErr = "Greška: Obvezno";
        } else if (!/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(inputFirstName)) {
            fnameErr = "Greška: Neispravan format";
        } else {
            fnameErr = "";
        }

        // Validate last name input
        if (inputLastName === "") {
            lnameErr = "Greška: Obvezno";
        } else if (!/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(inputLastName)) {
            lnameErr = "Greška: Neispravan format";
        } else {
            lnameErr = "";
        }

        // Validate e-mail input
        if (inputEmail === "") {
            emailErr = "Greška: Obvezno";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail)) {
            emailErr = "Greška: Unesite ispravnu e-mail adresu (npr. johndoe@domain.com)";
        } else {
            emailErr = "";
        }

        /**
         * Validate password input: Password must have a minimum of 8 characters, including at least one lowercase letter,
         * one uppercase letter, one number, and one special character
         */
        if (inputPassword === "") {
            passErr = "Greška: Obvezno";
        } else if (inputPassword.length < 8) {
            passErr = "Greška: Minimalna dužina ovog polja je 8 znakova";
        } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(inputPassword)) {
            passErr = "Greška: Lozinka treba sadržavati mala i velika slova, brojeve i posebne znakove";
        } else {
            passErr = "";
        }

        // Validate confirm password input: Check if password are the same
        if (inputConfirmPassword === "") {
            confPassErr = "Greška: Obvezno";
        } else if (inputConfirmPassword !== inputPassword) {
            confPassErr = "Greška: Molimo unesite istu vrijednost";
        } else {
            confPassErr = "";
        }


        // Display error messages if any, otherwise, proceed with form submission
        if (fnameErr !== "" || lnameErr !== "" || emailErr !== "" || passErr !== "" || confPassErr !== "") {
            document.getElementById("fnameErr").textContent = fnameErr;
            document.getElementById("lnameErr").textContent = lnameErr;
            document.getElementById("emailErr").textContent = emailErr;
            document.getElementById("passErr").textContent = passErr;
            document.getElementById("confPassErr").textContent = confPassErr;
        } else {
            // Clear previous error messages
            document.querySelectorAll('form > span').forEach(span => span.textContent = '');

            // Prepare form data for submission
            let form = document.getElementById('registerForm');
            let formData = new FormData(form);

            // Send a POST request to the registration script
            let response = await fetch('/user/auth/register.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            let message = await response.json();

            if (message.status === "error") {
                // Display error message
                let HTML = `<i class="fa-solid fa-circle-exclamation fa-2x" style="color: #80000d;"></i><p>${message.message}</p>`;
                document.getElementById("globalMessage").innerHTML = HTML;
                document.getElementById("globalMessage").classList.add('red');
                document.getElementById("globalMessage").classList.remove('green');
            } else if (message.status === "success") {
                // Display success message and redirect to home page
                let HTML = `<i class="fa-solid fa-circle-check fa-2x" style="color: #03651a;"></i><p>${message.message}</p>`;
                document.getElementById("globalMessage").innerHTML = HTML;
                document.getElementById("globalMessage").classList.add('green');
                document.getElementById("globalMessage").classList.remove('red');

                // If we were redirected from the checkout page redirect back, else redirect to the home page
                let url = window.location.search;
                let params = new URLSearchParams(url);
                if (params.get('return') === 'checkout') {
                    // Add delivery parameter if exists
                    let newParams = new URLSearchParams();
                    if (params.get('del')) {
                        newParams.append('del', params.get('del'));
                    }
                    window.location.href = '/checkout/?' + newParams.toString();
                } else {
                    window.location.href = "/";
                }
            }
        }
    }


    /**
     * Validates user login form input fields (e-mail and password).
     * If all input is valid, sends a POST request to the login.php file and handles the server response.
     */
    async function loginValidate() {
        let emailErr = "", passErr = "";

        let inputEmail = document.getElementById("email").value;
        let inputPassword = document.getElementById("password").value;

        // Validate e-mail input
        if (inputEmail === "") {
            emailErr = "Greška: Obvezno";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(inputEmail)) {
            emailErr = "Greška: Unesite ispravnu e-mail adresu (npr. johndoe@domain.com)";
        } else {
            emailErr = "";
        }

        // Validate password input
        if (inputPassword === "") {
            passErr = "Greška: Obvezno";
        } else if (inputPassword.length < 8) {
            passErr = "Greška: Minimalna dužina ovog polja je 8 znakova";
        } else {
            passErr = "";
        }

        // Display error messages if any, otherwise, proceed with form submission
        if (emailErr !== "" || passErr !== "") {
            document.getElementById("emailErr").textContent = emailErr;
            document.getElementById("passErr").textContent = passErr;
        } else {
            // Clear previous error messages
            document.querySelectorAll('form > span').forEach(span => span.textContent = '');

            // Prepare form data for submission
            let form = document.getElementById('loginForm');
            let formData = new FormData(form);

            // Send a POST request to the login script
            let response = await fetch('/user/auth/login.php', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            let message = await response.json();

            if (message.status === "error") {
                // Display error message
                let HTML = `<i class="fa-solid fa-circle-exclamation fa-2x" style="color: #80000d;"></i><p>${message.message}</p>`
                document.getElementById("globalMessage").innerHTML = HTML;
                document.getElementById("globalMessage").classList.add('red');
                document.getElementById("globalMessage").classList.remove('green');
            } else if (message.status === "success") {
                // Display success message and redirect to home page
                let HTML = `<i class="fa-solid fa-circle-check fa-2x" style="color: #03651a;"></i><p>${message.message}</p>`;
                document.getElementById("globalMessage").innerHTML = HTML;
                document.getElementById("globalMessage").classList.add('green');
                document.getElementById("globalMessage").classList.remove('red');
                       
                // If we were redirected from the checkout page redirect back, else redirect to the home page
                let url = window.location.search;
                let params = new URLSearchParams(url);
                if (params.get('return') === 'checkout') {
                    // Add delivery parameter if exists
                    let newParams = new URLSearchParams();
                    if (params.get('del')) {
                        newParams.append('del', params.get('del'));
                    }
                    window.location.href = '/checkout/?' + newParams.toString();
                } else {
                    window.location.href = "/";
                }
           }
       }
    }

    // Function for redirecting from login page to register page and vice versa
    function redirect() {
        // Extract the URL parameters from the current window location
        let url = window.location.search;
        let params = new URLSearchParams(url);
        let wantedURL = '';

        // Append appropriate wanted URL based on the current page
        if (document.querySelector('#login-to-register')) {
            wantedURL = document.querySelector('#login-to-register').href;
        } else if (document.querySelector('#register-to-login')) {
            wantedURL = document.querySelector('#register-to-login').href;
        }

        // If parameters exist in the current URL, add them to wanted URL
        if (params.toString()) {
            window.location.href = wantedURL + '?' + params.toString();
        } else {
            window.location.href = wantedURL;
        }
    }


    // Add event listener with the appropriate function to the existing submit button
    if (document.getElementById("registerSubmit")) {
        document.getElementById("registerSubmit").addEventListener("click", registerValidate);
        document.getElementById("register-to-login").addEventListener("click", function(event) {
            event.preventDefault();
            redirect();
        });
    } else if (document.getElementById("loginSubmit")) {
        document.getElementById("loginSubmit").addEventListener("click", loginValidate);
        document.getElementById("login-to-register").addEventListener("click", function(event) {
            event.preventDefault();
            redirect();
        });
    }
});
