const express = require("express")
const { authentication, isAdmin } = require("../middleware/authentication");
const ReviewController = require("../controllers/ReviewControler");
const router = express.Router()

router.post("/create", authentication, ReviewController.create)
router.put("/updateRevById/:id", authentication, ReviewController.update)
router.delete("/deleteById/:id", authentication, ReviewController.delete)
router.get("/getAllRevUs", authentication, ReviewController.getAll)  


module.exports = router;