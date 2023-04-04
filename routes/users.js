const express = require("express")
const UserController = require("../controllers/UserControler")
const { authentication, isAdmin } = require("../middleware/authentication")
const router = express.Router()

router.post("/createUser", UserController.create)
router.post("/login", UserController.login)
router.get("/confirm/:emailToken",UserController.confirm)
router.delete("/logout", authentication, UserController.logout)
router.get("/getAllUsOr", UserController.getAll)
router.get("/getById/:id", UserController.getById)
router.get("/getByName/:name", UserController.getOneByName)
router.delete("/deleteById/:id", authentication, isAdmin, UserController.delete)
router.put("/updateUserById/:id", authentication, UserController.update)

module.exports = router;