const express = require("express")
const ProductController = require("../controllers/ProductControler")
const router = express.Router()

router.post("/create", ProductController.create)

module.exports = router;