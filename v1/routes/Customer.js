const router = require("express").Router();
const Controller = require("../controllers");

router.post("/register", Controller.CustomerController.register)
router.post("/login", Controller.CustomerController.login)
router.post("/logout", Controller.CustomerController.logout)
router.get("/get-all-customers", Controller.CustomerController.getAllCustomers)

module.exports = router;