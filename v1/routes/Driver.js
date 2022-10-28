const router = require("express").Router();

const Controller = require("../controllers");

router.post("/register", Controller.DriverController.register)
router.post("/login", Controller.DriverController.login)
router.post("/logout", Controller.DriverController.logout)

module.exports = router;