const authorModel = require("../models/authorModel")
const blogModel = require("../models/blogModel")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId //check whether the format or objectid is of 24 digit or not


// ------------------------------------------- authentication --------------------------------------------------

const authenticate = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        // console.log(token);
        if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

        let decodedToken = jwt.verify(token, "project-1-group-59");
        if (!decodedToken) return res.status(401).send({ status: false, msg: "token is invalid" });
        req.decodedToken = decodedToken
        // console.log(req.decodedToken.authorId);    
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}


// ------------------------------------------- authriztion --------------------------------------------------

const authorisation = async function (req, res, next) {
    try {
        const p = req.params.blogId
        const q = req.query
        const b = req.body.authorId
        // console.log(q);

        let userLoggedIn = req.decodedToken.authorId

        if (p) {
            //console.log("p - " + p);
            const userToBeModified = await blogModel.findOne({ _id: p })

            if (!userToBeModified) return res.status(403).send({ status: false, msg: "Access denied from body" })


            if (userToBeModified.authorId.toString() !== userLoggedIn) return res.status(403).send({ status: false, msg: 'Access denied from body' })
            next()
        }
        else if (b) {
            console.log(b);

            const userToBeModified = await authorModel.findOne({ _id: b })
            console.log(" userToBeModified - " + userToBeModified);

            if (!userToBeModified) return res.status(403).send({ status: false, msg: "Access denied from body" })

            if (userToBeModified._id.toString() !== userLoggedIn) return res.status(403).send({ status: false, msg: 'Access denied from body' })
            next()
        }

        else {  //this is for query 
            //authorId for the logged-in user

            const temp = {}
            if (q.category && q.category.trim() !== "") { temp.category = q.category.trim() }

            if (q.authorid && q.authorid.trim() !== "") {
                if (!ObjectId.isValid(q.authorid.trim())) return res.status(400).send({ status: false, msg: "AuthorId is not valid" })
                temp.authorId = q.authorid.trim()
            }

            if (q.tags && q.tags.trim() !== "") { temp.tags = q.tags.trim() }

            if (q.subcategory && q.subcategory.trim() !== "") { temp.subcategory = q.subcategory.trim() }

            if (q.unpublished && q.unpublished.trim() !== "") {
                if (q.unpublished.trim() == "false") {
                    temp.isPublished = false
                } else { temp.isPublished = true }
            }

            // console.log(Object.values(temp))
            if (Object.values(temp) == 0) return res.status(400).send({ status: false, msg: "please apply filter  1" })

            const userToBeModified = await blogModel.findOne(temp)
            console.log("temp - " + userToBeModified);

            if (!userToBeModified) return res.status(403).send({ status: false, msg: 'Access denied' })

            //userId comparision to check if the logged-in user is requesting for their own data

            // console.log(" userLoggedIn - " + userLoggedIn);
            // console.log("userToBeModified - " + userToBeModified.authorId);

            if (userToBeModified.authorId.toString() !== userLoggedIn) return res.status(403).send({ status: false, msg: 'Access denied' })


            req.savedTemp = temp

            next()
        }


    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.authenticate = authenticate
module.exports.authorisation = authorisation