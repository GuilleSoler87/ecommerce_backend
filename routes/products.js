const express = require("express")
const ProductController = require("../controllers/ProductControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const upload = require("../middleware/multer");
const router = express.Router()

router.post("/create", upload.single("image"), ProductController.create) //authentication, isAdmin, 
router.put("/updateProdById/:id", upload.single("image"), ProductController.update) //authentication, isAdmin,
router.delete("/deleteById/:id", ProductController.delete) //authentication, isAdmin
router.get("/getAllProdCat", ProductController.getAll)
router.get("/getById/:id", ProductController.getById) //authentication,
router.get("/getByName/:name", authentication, ProductController.getOneByName)
router.get("/searchByPrice", authentication, ProductController.searchByPrice)
router.get("/priceDesc", authentication, ProductController.getByPriDesc)

module.exports = router;