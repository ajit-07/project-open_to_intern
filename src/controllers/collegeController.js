const collegeModel = require("../models/collegeModel.js")
const validator = require("../validator/validator.js")
const internModel = require("../models/internModel")



const createCollege = async function (req, res) {
    try {
        let data = req.body;
        let { name, fullName, logoLink } = data;

        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "please provide mandatory college details" }) }


        if (!validator.isValid(name)) return res.status(400).send({ status: false, msg: "name of the college is mandatory" })
        if (!validator.isVaildName(name)) return res.status(400).send({ status: false, msg: "please enter valid college name" })

        if (!validator.isValid(fullName)) return res.status(400).send({ status: false, msg: "Full Name of the college is Mandatory" })
        if (!validator.isValidFname(fullName)) return res.status(400).send({ status: false, msg: "Enter valid fullName" })


        if (!validator.isValid(logoLink)) return res.status(400).send({ status: false, msg: "LogoLink  is mandatory" })
        if (!validator.isValidUrl(logoLink)) return res.status(400).send({ status: false, msg: "enter a valid logoLink url" })



        const duplicateName = await collegeModel.findOne({ name, isDeleted: false });
        if (duplicateName) return res.status(400).send({ status: false, msg: `College ${name} is already in use` })


        const collegeData = await collegeModel.create(data);
        return res.status(201).send({ status: true, data: collegeData })
    }
    catch (error) {
        return res.status(500).send({ status: false, msg: error.messsage })
    }

}

const getCollegeInterns = async function (req, res) {
    try {
        let data = req.query;
        if (Object.keys(filter).length == 0) return res.status(400).send({ status: false, msg: "Please give query to fetch intern details" })
        let collegeName = data.collegeName;
        if (!collegeName) return res.status(400).send({ status: false, msg: "College name is required" })


        let collegeDetails = await collegeModel.findOne({ name: collegeName, isDeleted: false })

        if (!collegeDetails) return res.status(400).send({ status: false, msg: `${collegeName} is not available` })

        let collegeId = collegeDetails._id;
        let name = collegeDetails.name;
        let fullName = collegeDetails.fullName;
        let logoLink = collegeDetails.logoLink;

        let interns = await internModel.find({ collegeId }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        if (interns.length == 0) return res.status(400).send({ status: false, msg: "No inerns applied for this college " })

        let internsDetails = {
            name: name,
            fullName: fullName,
            logoLink: logoLink,
            interns: interns
        }
        return res.status(200).send({ status: true, data: internsDetails })


    } catch (error) {
        return res.status(500).send({ status: false, msg: error.messsage })
    }
}

module.exports.createCollege = createCollege;
module.exports.getCollegeInterns = getCollegeInterns;

