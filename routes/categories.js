const express = require("express")
const CategoryController = require("../controllers/CategoryControler")
const router = express.Router()

router.post("/create", CategoryController.create)

module.exports = router;