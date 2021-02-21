const express = require("express")
const router = express.Router()
const {
  postPetsController,
  getPetById,
  getAllPets,
} = require("../controllers/pets")
const { tokenChecker } = require("../middlewares/checks")
const { adminCheck } = require("../middlewares/checks")

router.post("/postpet", tokenChecker, adminCheck, postPetsController)
router.get("/pet/:id", tokenChecker, adminCheck, getPetById)
router.get("/pets", tokenChecker, adminCheck, getAllPets)

module.exports = router
