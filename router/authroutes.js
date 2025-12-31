const express = require("express")
const router = express.Router();
const {protect} = require("../middleware/authmiddleware");

const {
    registeruser,
    loginuser,

} = require("../controllers/authcontrollers");

router.post("/register",registeruser);
router.post("/login",loginuser);

module.exports = router;
