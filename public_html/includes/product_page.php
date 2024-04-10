<div class="container">
    <div class="added-to-cart-message">
        <p class="cart-message"></p>
        <div class="see-cart">
            <a href="/checkout/cart">
                <p>Vidi košaricu</p>
            </a>
        </div>
    </div>
    <div class="product-details">
        <div class="image">
            <img src="" alt="">
            <p class="price-reduction"></p> 
        </div>
        <div class="product-info">
            <p class="product-author"></p>
            <p class="product-name"></p>
            <div class="product-price">
                <p class="old-price"></p>
                <p class="book-price"></p>
            </div>
            <div class="product-cart">
                <div class="quantity">
                    <label for="quantity">Količina:</label>
                    <input class="product-quantity" id="quantity" type="number" min="1" step="1" value="1" name="quantity" oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                </div>
                <div class="cart-button">
                    <p>Dodaj u košaricu</p>
                </div>
                <div class="cart-button-unavailable">
                    <p>Nije dostupno</p>
                </div>
            </div>
            <div class="product-attributes">
                <div class="product-publication">
                    <div class="icon">
                        <i class="fa-regular fa-calendar-days"></i>
                    </div>
                    <div class="details">
                        <p>Godina izdanja</p>
                        <p id="product-year"></p>
                    </div>
                </div>
                <div class="product-pages">
                    <div class="icon">
                        <i class="fa-solid fa-grip-lines"></i>
                    </div>
                    <div class="details">
                        <p>Broj stranica</p>
                        <p id="product-pages"></p>
                    </div>
                </div>
                <div class="product-language">
                    <div class="icon">
                        <i class="fa-solid fa-language"></i>
                    </div>
                    <div class="details">
                        <p>Izvorni jezik</p>
                        <p id="product-language"></p>
                    </div>
                </div>
                <div class="product-binding">
                    <div class="icon">
                        <i class="fa-solid fa-book"></i>
                    </div>
                    <div class="details">
                        <p>Uvez</p>
                        <p id="product-binding"></p>
                    </div>
                </div>
                <div class="product-format-width">
                    <div class="icon">
                        <i class="fa-solid fa-arrows-left-right"></i>
                    </div>
                    <div class="details">
                        <p>Širina knjige</p>
                        <p id="product-width"></p>
                    </div>
                </div>
                <div class="product-format-height">
                    <div class="icon">
                        <i class="fa-solid fa-arrows-up-down"></i>
                    </div>
                    <div class="details">
                        <p>Visina knjige</p>
                        <p id="product-height"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="product-about">
        <div class="buttons">
            <div class="button-description active">Opis proizvoda</div>
            <div class="button-reviews">Recenzije</div>
        </div>
        <div class="product-description visible"></div>
        <div class="product-reviews">
            <?php require('reviews.php'); ?>
        </div>
    </div>
    <div class="similar-products">
        <h2>Povezani proizvodi</h2>
        <div class="similar-products-container">
            <div class="book">
                <?php require("book.php"); ?>
            </div>
            <div class="book">
                <?php require("book.php"); ?>
            </div>
            <div class="book">
                <?php require("book.php"); ?>
            </div>
            <div class="book">
                <?php require("book.php"); ?>
            </div>
            <div class="book">
                <?php require("book.php"); ?>
            </div>
        </div>
    </div>
</div>