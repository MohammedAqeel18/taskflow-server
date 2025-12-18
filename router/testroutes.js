const express = require("express")
const{testPost} = require("../controllers/testcontrollers")

const router = express.Router();

router.post("/test",testPost)

module.exports = router;

