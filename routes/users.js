const express = require("express")
const UserController = require("../controllers/UserControler")
const router = express.Router()

router.post("/createUser", UserController.create)
router.get("/getAllUsOr", UserController.getAll)
router.get("/getById/:id", UserController.getById)
router.get("/getByName/:name", UserController.getOneByName)
router.delete("/deleteById/:id", UserController.delete)
router.put("/updateUserById/:id", UserController.update)

module.exports = router;