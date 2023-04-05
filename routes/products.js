const express = require("express")
const ProductController = require("../controllers/ProductControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication, ProductController.create)
router.put("/updateProdById/:id", authentication, ProductController.update)
router.delete("/deleteById/:id", authentication, ProductController.delete)
router.get("/getAllProdCat", authentication, ProductController.getAll)
router.get("/getById/:id", authentication, ProductController.getById)
router.get("/getByName/:name", authentication, ProductController.getOneByName)
router.get("/searchByPrice", authentication, ProductController.searchByPrice)
router.get("/priceDesc", authentication, ProductController.getByPriDesc)

module.exports = router;