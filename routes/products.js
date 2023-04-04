const express = require("express")
const ProductController = require("../controllers/ProductControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication, ProductController.create)
router.put("/updateProdById/:id", authentication, ProductController.update)
router.delete("/deleteById/:id", authentication, ProductController.delete)
router.get("/getAllProdCat", authentication, ProductController.getAll)

module.exports = router;