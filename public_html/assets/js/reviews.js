document.addEventListener("DOMContentLoaded", function() {
    let buttonDescription = document.querySelector('.button-description');
    let buttonReviews = document.querySelector('.button-reviews');
    let starValue = 0;
    let displayReview = 0;

    // Change slide (description and reviews) based on the button clicked
    function changeSlide(name) {
        let pageDescription = document.querySelector('.product-description');
        let pageReviews = document.querySelector('.product-reviews');

        if (name === 'description') {
            buttonDescription.classList.add('active');
            buttonReviews.classList.remove('active');

            pageDescription.classList.add('visible');
            pageReviews.classList.remove('visible');
        } else if (name === 'reviews') {
            buttonReviews.classList.add('active');
            buttonDescription.classList.remove('active');

            pageReviews.classList.add('visible');
            pageDescription.classList.remove('visible');
        }
    }

    // Handle hovering over specific star
    function hoverStar(number) {
        for (let i = number; i >= 1; i--) {
            document.querySelector(`.fa-star.value${i}`).classList.add('black-star')
        }
    }

    // Handle unhovering over specific star
    function unhoverStar(number) {
        for (let i = number; i >= 1; i--) {
            document.querySelector(`.fa-star.value${i}`).classList.remove('black-star');
        }
    }

    // When clicked on specific star, the darker color stays on the star even when unhovered
    function clickStar(number) {
        for (let i = 1; i <= 5; i++) {
            document.querySelector(`.fa-star.value${i}`).style.color = '';
        }
        for (let i = number; i >= 1; i--) {
            document.querySelector(`.fa-star.value${i}`).style.color = '#1e3050';
        }
        starValue = number;
    }

    async function sendReview() {
        let email = document.querySelector('#e-mail').value;
        let firstName = document.querySelector('#first-name').value;
        let lastName = document.querySelector('#last-name').value;
        let text = document.querySelector('#review-text').value;
        let globalMessage = '';


        // Validate e-mail input, first and last name input
        if (email === "") {
            globalMessage = "Greška: Niste unijeli e-mail";
        } else if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            globalMessage = "Greška: Unesite ispravnu e-mail adresu (npr. johndoe@domain.com)";
        } else if (firstName === "") {
            globalMessage = "Greška: Niste unijeli ime";
        } else if (!/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(firstName)) {
            globalMessage = "Greška: Neispravan format imena";
        } else if (lastName === "") {
            globalMessage = "Greška: Niste unijeli prezime";
        } else if (!/^[^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/.test(lastName)) {
            globalMessage = "Greška: Neispravan format prezimena";
        } else {
            globalMessage = "";
        }

        // Check if user inputted the review mark
        if (starValue === 0) {
            globalMessage = "Greška: Niste unijeli ocjenu";
        }

        // If the inputs contained errors display them, otherwise proceed sending the data to the server 
        if (globalMessage !== '') {
            document.querySelector('.globalMessage').textContent = globalMessage;
            document.querySelector('.globalMessage').classList.add('red');
            document.querySelector('.globalMessage').classList.remove('green');
        } else {
            // Retrieve book ID from page URL
            let url = window.location.href;
            let splitURL = url.split('/');
            let bookID = parseInt(splitURL[splitURL.length - 2]);

            // Prepare parameters to be sent to server
            let params = new URLSearchParams();
            params.append('bookId', bookID);
            params.append('e-mail', email);
            params.append('first-name', firstName);
            params.append('last-name', lastName);
            params.append('starValue', starValue);
            params.append('text', text);

            // Send POST request to insert review in the database
            let response = await fetch('/lib/review_insert.php', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: params
            });

            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }

            globalMessage = await response.json();

            // Remove content in the 'input' elements to prevent spamming
            if (globalMessage.status === 'success') {
                document.querySelector('#e-mail').value = '';
                document.querySelector('#first-name').value = '';
                document.querySelector('#last-name').value = '';
                document.querySelector('#review-text').value = '';
                for (let i = 1; i <= 5; i++) {
                    document.querySelector(`.fa-star.value${i}`).style.color = '';
                }
            }

            // Display message
            document.querySelector('.globalMessage').classList.add('green');
            document.querySelector('.globalMessage').classList.remove('red');
            document.querySelector('.globalMessage').textContent = globalMessage.message;
        }
    }

    async function displayReviews() {
        displayReview += 5;

        // Retrieve book ID from page URL
        let url = window.location.href;
        let splitURL = url.split('/');
        let bookID = parseInt(splitURL[splitURL.length - 2]);

        // Prepare parameters to be sent to server
        let params = new URLSearchParams();
        params.append('displayReview', displayReview);
        params.append('bookID', bookID);

        // Send POST request to get review information
        let response = await fetch('/lib/review_display.php', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });

        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }

        // Get HTML content and display it on the page
        let reviewData = await response.text();
        document.querySelector('.reviews-list').innerHTML = reviewData;

        if (document.querySelector('#show-more-reviews')) {
            document.querySelector('#show-more-reviews').addEventListener('click', displayReviews);
        }
    }

    // Adding event listeners for button clicks, star ratings, and review submission
    buttonDescription.addEventListener('click', () => changeSlide('description'));
    buttonReviews.addEventListener('click', () => changeSlide('reviews'));
    for (let i = 1; i <= 5; i++) {
        const star = document.querySelector(`.fa-star.value${i}`);
        star.addEventListener('mouseover', () => hoverStar(i));
        star.addEventListener('mouseleave', () => unhoverStar(i));
        star.addEventListener('click', () => clickStar(i));
    }

    document.querySelector('#submit-review').addEventListener('click', sendReview);

    // Call the function for displaying reviews on page loading and on button clicking
    window.onload = function() {
        displayReviews();
    }
});