document.addEventListener("DOMContentLoaded", function() {
    let quote = document.querySelector(".quote-text > span");
    let author = document.querySelector(".quote-person");

    // Random stuff, need to replace with actual quotes
    const quotes = [{
        quote: 'Onaj tko ne voli čitati nije pronašao pravu knjigu za sebe.',
        person: 'J.K. Rowling'
    }, {
        quote: 'Knjiga je dar koji možeš otvarati opet i opet.',
        person: 'Garrison Kellior'
    }, {
        quote: 'Čovjek koji ne čita dobre knjige nije nimalo bolji od čovjeka koji uopće ne čita.',
        person: 'Mark Twain'
    }, {
        quote: 'Nikad ne odgađaj do sutra knjigu koju možeš pročitati danas.',
        person: 'Holbrook Jackson'
    }, {
        quote: 'Knjiga je san koji držite u ruci.',
        person: 'Neil Gaiman'
    }, {
        quote: 'Knjiga za čitanje nije ona koja misli za tebe, već ona koja te natjera na mišljenje.',
        person: 'Harper Lee'
    }, {
        quote: 'Knjige su jedinstvena magija koja se prenosi.',
        person: 'Stephen King'
    }, {
        quote: 'Oh, kako je dobro biti među ljudima koji čitaju knjige.',
        person: 'Rainer Maria Rilke'
    }, {
        quote: 'Knjige i vrata su ista stvar - otvoriš ih i odeš u drugi svijet.',
        person: 'Jeanette Winterson'
    }, {
        quote: 'Knjige su ogledala duše.',
        person: 'Virginia Woolf'
    }, {
        quote: 'Čitatelj živi 1000 života prije nego što umre. Čovjek koji nikada ne čita živi samo jedan.',
        person: 'George R.R. Martin'
    }, {
        quote: 'U znanosti čitaj radije novija djela; u književnosti, najstarija. Klasična književnost je uvijek moderna.',
        person: 'Edward Bulwer-Lytton'
    }, {
        quote: 'Dajte mi osobu koja je pročitala tisuću knjiga i dali ste mi zanimljivo društvo. Dajte mi osobu koja je pročitala tri knjige i dali ste mi opasnog neprijatelja.',
        person: 'Anne Rice'
    }, {
        quote: 'Knjige su naše najtiše i najvjernije prijateljice, najlakše je doći do njih, daju najmudrije savjete i najstrpljivije su učiteljice.',
        person: 'Charles W. Eliot'
    }, {
        quote: 'Soba bez knjiga je kao tijelo bez duše.',
        person: 'Ciceron'
    }, {
        quote: 'Dobar nam roman kazuje istinu o svom junaku; loš nam roman kazuje istinu o svom piscu.',
        person: 'G.K. Chesterton'
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