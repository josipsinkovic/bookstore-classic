CREATE TABLE Authors (
    author_id           int unsigned not null auto_increment,
    first_name          varchar(50),
    last_name           varchar(50) not null,
    PRIMARY KEY(author_id)
);

CREATE TABLE Books (
    book_id             int unsigned not null auto_increment,
    title               varchar(50) not null,
    publication_year    smallint unsigned,
    author              int unsigned,
    price               decimal(10, 2) not null,
    pages_number        int unsigned not null,
    original_language   varchar(30),
    binding             varchar(10) not null,
    format_width        smallint unsigned not null,
    format_height       smallint unsigned not null,
    description         text,
    image_url           varchar(255) not null,
    quantity            int unsigned not null,
    PRIMARY KEY(book_id),
    FOREIGN KEY (author) REFERENCES Authors(author_id)
);

CREATE TABLE Discounts (
    book_id             int unsigned not null,
    discount            decimal(5, 2) not null,
    PRIMARY KEY(book_id, discount),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

CREATE TABLE Reviews (
    review_id           int unsigned not null auto_increment,
    book_id             int unsigned not null,
    first_name          varchar(50) not null,
    last_name           varchar(50) not null,
    review_text         text not null,
    review_date         date default current_date(),
    PRIMARY KEY(review_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

CREATE TABLE Customers (
    customer_id         int unsigned not null auto_increment,
    first_name          varchar(50) not null,
    last_name           varchar(50) not null,
    email               varchar(255) not null,
    passwordhash        char(60) not null,
    address             varchar(255),
    city                varchar(50),
    postal_code         smallint,
    phone_number        varchar(20),
    PRIMARY KEY(customer_id)
);

CREATE TABLE Orders (
    order_id            int unsigned not null auto_increment,
    customer_id         int unsigned not null,
    order_date          date not null,
    PRIMARY KEY(order_id),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id)
);

CREATE TABLE OrderDetails (
    order_id            int unsigned not null,
    book_id             int unsigned not null,
    quantity            tinyint unsigned not null,
    price               decimal(10, 2) not null,
    PRIMARY KEY(order_id, book_id),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);
