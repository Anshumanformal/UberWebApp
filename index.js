"use strict";
require("dotenv").config();

const express = require('express');
const app = express();

app.set('view engine', 'ejs')

const cors = require('cors');
const path = require("path");
const port = process.env.PORT || 3000;

const v1Routes = require("./v1/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')))

app.get("/", function(req, res) {  
    res.render("index.ejs");
});

app.get("/api/v1/customer/register", function(req, res) {  
    res.render("register_customer.ejs");
});

app.get("/api/v1/driver/register", function(req, res) {  
    res.render("register_driver.ejs");
});

app.get("/api/v1/booking/book-rides", function(req, res) {  
    res.render("book_rides.ejs");
});

app.get("/api/v1/booking/find-driver", function(req, res) {  
    res.render("find_driver.ejs");
});

app.get("/api/v1/booking/check-bookings", function(req, res) {  
    res.render("check_bookings.ejs");
});

app.get("/api/v1/booking/cancel-booking", function(req, res) {  
    res.render("cancel_booking.ejs");
});

app.get("/api/v1/booking/completed-booking", function(req, res) {  
    res.render("completed_booking.ejs");
});

app.use("/api/v1", v1Routes);

app.listen(port, ()=> {
    console.log(`Environment:`, process.env.NODE_ENV);
    console.log(`Running on:`, process.env.PORT);
});
