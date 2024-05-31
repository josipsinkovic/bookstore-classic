document.addEventListener("DOMContentLoaded", function() {
    function moveRight(section) {
        let carousel = document.querySelectorAll(`.${section} .carousel`);

        carousel.forEach(element => {
            let activeItem = element.querySelector(`.carousel-item.active`);
            let nextItem = activeItem.nextElementSibling;

            if (nextItem !== null) {
                activeItem.classList.remove('active');
                nextItem.classList.add('active');
            } else {
                // If there is no next sibling, loop back to the first item
                let firstItem = element.querySelector(`.carousel-item`);
                activeItem.classList.remove('active');
                firstItem.classList.add('active');
            }
        });
    }

    function moveLeft(section) {
        let carousel = document.querySelectorAll(`.${section} .carousel`);

        carousel.forEach(element => {
            let activeItem = element.querySelector(`.carousel-item.active`);
            let prevItem = activeItem.previousElementSibling;

            if (prevItem !== null) {
                activeItem.classList.remove('active');
                prevItem.classList.add('active');
            } else {
                // If there is no previous sibling, loop to the last item
                let lastItem = element.querySelector(`.carousel-item:last-child`);
                activeItem.classList.remove('active');
                lastItem.classList.add('active');
            }
        });
    }
    document.getElementById("new-product-left").addEventListener("click", () => moveLeft("new-products"));
    document.getElementById("new-product-right").addEventListener("click", () => moveRight("new-products"));
    document.getElementById("croatian-literature-left").addEventListener("click", () => moveLeft("croatian-literature"));
    document.getElementById("croatian-literature-right").addEventListener("click", () => moveRight("croatian-literature"));
    document.getElementById("banner-left").addEventListener("click", () => moveLeft("banner"));
    document.getElementById("banner-right").addEventListener("click", () => moveRight("banner"));
});