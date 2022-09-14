const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, mobile, email, collegeName } = data


        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "please provide mandatory itern details" }) }

        if (!name) return res.status(400).send({ status: false, msg: "Name of the intern is Mandatory" })
        if (!email) return res.status(400).send({ status: false, msg: "Email of the intern is Mandatory" })

        const dupEmail = await internModel.findOne({ email, isDeleted: false })
        if (dupEmail) return res.status(400).send({ status: false, msg: `${email} is aready in use` })


        if (!mobile) return res.status(400).send({ status: false, msg: "Mobile number of the internis Mandatory" })

        const dupMobile = await internModel.findOne({ mobile, isDeleted: false })
        if (dupMobile) return res.status(400).send({ status: false, msg: `${mobile} is aready in use` })

        let collegeDetail = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!collegeDetail) return res.status(400).send({ status: false, msg: "please enter a valid college name" })

        let collegeId = collegeDetail._id
        data["collegeId"] = collegeId;

        const internData = await internModel.create(data);
        return res.status(201).send({ status: true, data: internData })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.msg })
    }
}
module.exports.createIntern = createIntern;

