document.addEventListener("DOMContentLoaded", function() {
    
    /**
     * Validates user registration form input fields and displays error messages if validation fails.
     * If all input is valid, sends a POST request to the register.php file and handles the server response.
     */
    function registerValidate() {
        let fnameErr = "", lnameErr = "", emailErr = "", passErr = "", confPassErr = "";

        let inputFirstName = document.getElementById("first-name").value;
        let inputLastName = document.getElementById("last-name").value;
        let inputEmail = document.getElementById("email").value;
        let inputPassword = document.getElementById("password").value;
        let inputConfirmPassword = document.getElementById("confirmPassword").value;

        // Validate first name input
        if (inputFirstName === "") {
            fnameErr = "Greška: Obvezno";
        } else if (!/^[a-zA-Z-' ]*$/.test(inputFirstName)) {
            fnameErr = "Greška: Neispravan format";
        } else {
            fnameErr = "";
        }

        // Validate last name input
        if (inputLastName === "") {
            lnameErr = "Greška: Obvezno";
        } else if (!/^[a-zA-Z-' ]*$/.test(inputLastName)) {
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
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "/user/auth/register.php", true);
            xhttp.send(formData);

            // Handle the server response
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    let response = JSON.parse(xhttp.responseText);
                    if (response.status === "error") {
                        // Display error message
                        document.getElementById("globalMessage").textContent = response.message;
                    } else if (response.status === "success") {
                        // Display success message and redirect to home page
                        document.getElementById("globalMessage").textContent = response.message;
                        window.location.href = "/";
                    }
                }
            }
        }
    }


    /**
     * Validates user login form input fields (e-mail and password).
     * If all input is valid, sends a POST request to the login.php file and handles the server response.
     */
    function loginValidate() {
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

           // Send a POST request to the registration script
           let xhttp = new XMLHttpRequest();
           xhttp.open("POST", "/user/auth/login.php", true);
           xhttp.send(formData);

           // Handle the server response
           xhttp.onreadystatechange = function() {
               if (xhttp.readyState === 4 && xhttp.status === 200) {
                   let response = JSON.parse(xhttp.responseText);
                   if (response.status === "error") {
                       // Display error message
                       document.getElementById("globalMessage").textContent = response.message;
                   } else if (response.status === "success") {
                       // Display success message and redirect to home page
                       document.getElementById("globalMessage").textContent = response.message;
                       window.location.href = "/";
                   }
               }
           }
        }
    }


    // Add event listener with the appropriate function to the existing submit button
    if (document.getElementById("registerSubmit")) {
        document.getElementById("registerSubmit").addEventListener("click", registerValidate);
    } else if (document.getElementById("loginSubmit")) {
        document.getElementById("loginSubmit").addEventListener("click", loginValidate);
    }
});
