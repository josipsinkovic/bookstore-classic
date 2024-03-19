CREATE TABLE Authors (
    author_id           int unsigned not null auto_increment,
    first_name          nvarchar(50),
    last_name           nvarchar(50) not null,
    PRIMARY KEY(author_id)
);

CREATE TABLE Books (
    book_id             int unsigned not null auto_increment,
    title               nvarchar(50) not null,
    publication_date    date,
    author              int unsigned,
    price               decimal(10, 2) not null,
    pages_number        int unsigned not null,
    original_language   nvarchar(30),
    binding             varchar(10) not null,
    format_width        smallint unsigned not null,
    format_height       smallint unsigned not null,
    description         nvarchar(3000),
    image_url           varchar(255) not null,
    quantity            int unsigned not null,
    PRIMARY KEY(book_id),
    FOREIGN KEY (author) REFERENCES Authors(author_id)
);

CREATE TABLE Discounts (
    book_id             int unsigned not null,
    discount            int not null,
    PRIMARY KEY(book_id, discount),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

CREATE TABLE Reviews (
    review_id           int unsigned not null auto_increment,
    book_id             int unsigned not null,
    first_name          nvarchar(50) not null,
    last_name           nvarchar(50) not null,
    review_text         nvarchar(1000) not null,
    review_date         date default current_date(),
    PRIMARY KEY(review_id),
    FOREIGN KEY (book_id) REFERENCES Books(book_id)
);

CREATE TABLE Customers (
    customer_id         int unsigned not null auto_increment,
    first_name          nvarchar(50) not null,
    last_name           nvarchar(50) not null,
    email               varchar(255) not null,
    passwordhash        char(60) not null,
    address             nvarchar(255),
    city                nvarchar(50),
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
