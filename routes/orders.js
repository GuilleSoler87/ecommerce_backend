const express = require("express")
const OrderController = require("../controllers/OrderControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/createOrder", authentication, OrderController.create)
router.get("/getAllUsOr", authentication, OrderController.getAll)
router.get("/getById/:id", authentication, OrderController.getById)
router.get("/getAllOrProd", authentication, OrderController.getAll)
router.delete("/deleteById/:id", authentication, OrderController.delete)

module.exports = router;