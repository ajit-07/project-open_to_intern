const express = require('express');
const router = express.Router();
const internController=require("../controllers/internController")
const collegeController=require("../controllers/collegeController")

router.post("/functionup/colleges",collegeController.createCollege)
router.post("/functionup/interns",internController.createIntern)
router.get("/functionup/collegeDetails",collegeController.getCollegeInterns)


module.exports = router;