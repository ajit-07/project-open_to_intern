const collegeModel = require("../models/collegeModel.js")
const validator = require("../valdator/validator.js")
const internModel = require("../models/internModel")

const createCollege = async function (req, res) {
    try {
        let data = req.body;
        let { name, fullName, logoLink } = data;

        if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, msg: "please provide mandatory college details" }) }

        if (!name) return res.status(400).send({ status: false, msg: "Name of the college is Mandatory" })
        if (!fullName) return res.status(400).send({ status: false, msg: "Full Name of the college is Mandatory" })
        if (!logoLink) return res.status(400).send({ status: false, msg: "Logo Link of the college is Mandatory" })


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
        let filter = req.query;
        if (Object.keys(filter).length == 0) return res.status(400).send({ status: false, msg: "Please give query to fetch intern details" })
        let collegeName = req.query.collegeName;
        if (!collegeName) return res.status(400).send({ status: false, msg: "College name is required" })

        let collegeNameinDb = collegeName.toLowerCase();

        let collegeDetails = await collegeModel.findOne({ name: collegeNameinDb, isDeleted: false })

        if (!collegeDetails) return res.status(400).send({ status: false, msg: `${collegeName} is not available` })

        let collegeId = collegeDetails._id;
        let name = collegeDetails.name;
        let fullName = collegeDetails.fullName;
        let logoLink = collegeDetails.logoLink;

        let interns = await internModel.find({ collegeId }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        if (interns.length == 0) { return res.status(400).send({ status: false, msg: "No inerns for this college found" }) }
        else {
            let internsDetails = {
                name: name,
                fullName: fullName,
                logoLink: logoLink,
                interests: interns
            }
            return res.status(200).send({ status:true,data: internsDetails })

        }
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.messsage })
    }
}

module.exports.createCollege = createCollege;
module.exports.getCollegeInterns = getCollegeInterns;

