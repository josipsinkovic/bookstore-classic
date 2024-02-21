document.addEventListener("DOMContentLoaded", function() {
    let quote = document.querySelector(".quote-text > span");
    let author = document.querySelector(".quote-person");

    // Random stuff, need to replace with actual quotes
    const quotes = [{
        quote: `fdgd`,
        person: `dfgdf`
    }, {
        quote: `aaaaa`,
        person: `aaaaa`
    }];

    var quotesLength = quotes.length;
    var date = new Date();
    var timeZone = date.getTimezoneOffset() * 60000; // Calculate the time zone offset in milliseconds
    var currentTime = date.getTime() - timeZone; // Calculate the current time adjusted for the user's time zone
    var daysSinceEpoch = Math.floor(currentTime / 86400000); // Calculate the number of 'local' days since Jan 1, 1970
    var quoteToday = daysSinceEpoch % quotesLength;

    quote.textContent = quotes[quoteToday].quote;
    author.textContent = quotes[quoteToday].person;
})