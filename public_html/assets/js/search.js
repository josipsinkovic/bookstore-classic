document.addEventListener("DOMContentLoaded", function() {
    // Function to redirect to the search page with the entered query
    function redirect() {
        let searchQuery = document.querySelector("#search").value;
        window.location.href = '/product/search/?search_q=' + encodeURIComponent(searchQuery);
    }
    
    // Redirect to the page if the button for search had been clicked or if an enter key had been pressed while search bar is in focus
    document.querySelector("#search-button").addEventListener("click", redirect);
    document.querySelector("#search").addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            redirect();
        }
    });
});