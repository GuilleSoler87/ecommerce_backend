const express = require("express")
const CategoryController = require("../controllers/CategoryControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/create", authentication, CategoryController.create)
router.put("/updateCatById/:id", authentication, CategoryController.update)
router.delete("/deleteById/:id", authentication, CategoryController.delete)
router.get("/getAllProdCat", authentication, CategoryController.getAll)

module.exports = router;