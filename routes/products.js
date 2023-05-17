const express = require("express")
const ProductController = require("../controllers/ProductControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const upload = require("../middleware/multer");
const router = express.Router()

router.post("/create", authentication, upload.single("image"), ProductController.create) // isAdmin, 
router.put("/updateProdById/:id", authentication, upload.single("image"), ProductController.update) // isAdmin,
router.delete("/deleteById/:id", authentication, ProductController.delete) // isAdmin
router.get("/getAllProdCat", ProductController.getAll)
router.get("/getById/:id", ProductController.getById) //authentication,
router.get("/getByName/:name", ProductController.getOneByName) //authentication,
router.get("/searchByPrice", authentication, ProductController.searchByPrice)
router.get("/priceDesc", authentication, ProductController.getByPriDesc)

module.exports = router;