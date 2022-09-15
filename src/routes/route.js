const express = require('express');
const router = express.Router();
const internController=require("../controllers/internController")
const collegeController=require("../controllers/collegeController")


//for creating college details

router.post("/functionup/colleges",collegeController.createCollege)

//for creating interns details

router.post("/functionup/interns",internController.createIntern)

//for getting details of interns for a specific college details

router.get("/functionup/collegeDetails",collegeController.getCollegeInterns)


module.exports = router;