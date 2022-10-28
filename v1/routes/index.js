const router = require("express").Router();
const DriverRoutes = require("./Driver");
const CustomerRoutes = require("./Customer");
const BookingRoutes = require("./Booking");

router.use("/driver", DriverRoutes);
router.use("/customer", CustomerRoutes);
router.use("/booking", BookingRoutes);

module.exports = router;
