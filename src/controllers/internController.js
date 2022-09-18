const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require("../validator/validator")

const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, mobile, email, collegeName } = data //object destructuring


        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "please provide mandatory itern details" }) }

        
        if (!validator.isValid(name)) return res.status(400).send({ status: false, msg: "Name of the intern is mandatory,please enter valid name" })
        if (!validator.isVaildInternName (name)) return res.status(400).send({ status: false, msg: "Name is only allowed in lowercase letters with no special characters" })


        if (!validator.isValid(email)) return res.status(400).send({ status: false, msg: "Email of the intern is Mandatory,please enter valid email" })
        if (!validator.isValidEmail(email)) return res.status(400).send({ status: false, msg: "Email should be a valid type of email,e.g-abc123@gmail.com" })

        const dupEmail = await internModel.findOne({ email, isDeleted: false })
        if (dupEmail) return res.status(400).send({ status: false, msg: `${email} is aready in use` })


        if (!validator.isValid(mobile)) return res.status(400).send({ status: false, msg: "Mobile number of the intern is Mandatory,please enter valid mobile number" })
        if (!validator.isValidNumber(mobile)) return res.status(400).send({ status: false, msg: "Mobile no should be a valid Indian mobile no,e.g-9878272837 ." })

        const dupMobile = await internModel.findOne({ mobile, isDeleted: false })
        if (dupMobile) return res.status(400).send({ status: false, msg: `${mobile} mobile no is aready in use` })

        

        let collegeDetail = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!collegeDetail) return res.status(404).send({ status: false, msg: "College name not found in Db" })

        let collegeId = collegeDetail._id
        data["collegeId"] = collegeId;

        const internData = await internModel.create(data);
        return res.status(201).send({ status: true, data: internData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.msg })
    }
}
module.exports.createIntern = createIntern;

