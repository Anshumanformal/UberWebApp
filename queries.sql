-- Create table query - driver

create table driver(
    driver_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    vehicle_id INT DEFAULT NULL,
    driver_name VARCHAR(30) DEFAULT NULL,
    driver_phone VARCHAR(30) DEFAULT NULL ,
    driver_email VARCHAR(30) UNIQUE DEFAULT NULL,
    created_at DATETIME DEFAULT NULL,
    updated_at DATETIME DEFAULT NULL,
    driver_password VARCHAR(100) DEFAULT NULL
);

-- Create table query - customer

create table customer(
    customer_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    customer_name VARCHAR(30) DEFAULT NULL,
    customer_phone VARCHAR(30) DEFAULT NULL ,
    customer_email VARCHAR(30) UNIQUE DEFAULT NULL,
    customer_password VARCHAR(100) DEFAULT NULL,
    created_at DATETIME DEFAULT NULL,
    updated_at DATETIME DEFAULT NULL
);

-- Create table query - booking

create table booking(
    customer_id INT NOT NULL,
    booking_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    booking_date_time VARCHAR(30) DEFAULT NULL,
    source_ride VARCHAR(30) DEFAULT NULL ,
    destination_ride VARCHAR(30) DEFAULT NULL,
    status VARCHAR(30) DEFAULT NULL,
    driver_id INT DEFAULT NULL
);

-- Add MUL key in customer_id

alter table booking MODIFY COLUMN customer_id INT,
add key(customer_id);

desc booking;
