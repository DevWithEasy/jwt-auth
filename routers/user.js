const { signup, signin, updateUser, deleteUser } = require("../controllers/user")
const verifyToken = require("../utils/verifyToken")

const router = require("express").Router()

router.post('/signup',signup)
router.post('/signin',signin)
router.put("/update/:userId",verifyToken,updateUser)
router.delete("/delete/:userId",verifyToken,deleteUser)

module.exports = router