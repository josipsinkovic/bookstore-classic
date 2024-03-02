document.addEventListener("DOMContentLoaded", function() {
    function moveRight(section) {
        let activeItem = document.querySelector(`.${section} .carousel-item.active`);
        let nextItem = activeItem.nextElementSibling;

        if (nextItem !== null) {
            activeItem.classList.remove('active');
            nextItem.classList.add('active');
        } else {
            // If there is no next sibling, loop back to the first item
            let firstItem = document.querySelector(`.${section} .carousel-item`);
            activeItem.classList.remove('active');
            firstItem.classList.add('active');
        }
    }

    function moveLeft(section) {
        let activeItem = document.querySelector(`.${section} .carousel-item.active`);
        let prevItem = activeItem.previousElementSibling;

        if (prevItem !== null) {
            activeItem.classList.remove('active');
            prevItem.classList.add('active');
        } else {
            // If there is no previous sibling, loop to the last item
            let lastItem = document.querySelector(`.${section} .carousel-item:last-child`);
            activeItem.classList.remove('active');
            lastItem.classList.add('active');
        }
    }
    document.getElementById("new-product-left").addEventListener("click", () => moveLeft("new-products"));
    document.getElementById("new-product-right").addEventListener("click", () => moveRight("new-products"));
    document.getElementById("croatian-literature-left").addEventListener("click", () => moveLeft("croatian-literature"));
    document.getElementById("croatian-literature-right").addEventListener("click", () => moveRight("croatian-literature"));
});