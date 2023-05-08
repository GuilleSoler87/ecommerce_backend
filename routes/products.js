const express = require("express")
const ProductController = require("../controllers/ProductControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const upload = require("../middleware/multer");
const router = express.Router()

router.post("/create", authentication, isAdmin, upload.single("img"), ProductController.create)
router.put("/updateProdById/:id", authentication, isAdmin, upload.single("img"), ProductController.update)
router.delete("/deleteById/:id", authentication, isAdmin, ProductController.delete)
router.get("/getAllProdCat", authentication, ProductController.getAll)
router.get("/getById/:id", authentication, ProductController.getById)
router.get("/getByName/:name", authentication, ProductController.getOneByName)
router.get("/searchByPrice", authentication, ProductController.searchByPrice)
router.get("/priceDesc", authentication, ProductController.getByPriDesc)

module.exports = router;