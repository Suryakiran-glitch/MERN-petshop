const express = require("express")
const router = express.Router()
const { postPetsController, getPetById } = require("../controllers/pets")
const { tokenChecker } = require("../middlewares/checks")

router.post("/postpet", tokenChecker, postPetsController)
router.get("/pet/:id", tokenChecker, getPetById)

module.exports = router
