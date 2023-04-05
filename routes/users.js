const express = require("express")
const UserController = require("../controllers/UserControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/createUser", UserController.create)
router.post("/login", UserController.login)
router.get("/confirm/:emailToken",UserController.confirm)
router.delete("/logout", authentication, UserController.logout)
router.get("/getAllUsOr", authentication, UserController.getAll)
router.get("/getById/:id", authentication,  UserController.getById)
router.get("/getByName/:name", authentication, UserController.getOneByName)
router.get("/getUserOrders", authentication, UserController.getUserOrders)
router.delete("/deleteById/:id", authentication, isAdmin, UserController.delete)
router.put("/updateUserById/:id", authentication, UserController.update)

module.exports = router;