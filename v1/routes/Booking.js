const router = require("express").Router();
const Controller = require("../controllers");

router.post("/find-driver", Controller.BookingController.findDrivers)
router.post("/check-bookings", Controller.BookingController.checkBookings)
router.post("/cancel-booking", Controller.BookingController.cancelBooking)
router.post("/completed-booking", Controller.BookingController.completedBooking)
router.post("/book-rides", Controller.BookingController.bookRides)

module.exports = router;
