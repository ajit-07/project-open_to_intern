const authorModel = require("../models/authorModel")

// ----------------------------------------------------- create Author ------ done -----------------------------------------------


const createAuthor = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "credentials are manadatory" })
        const authorData = await authorModel.create(data)
        return res.status(201).send({ status: true, data: authorData })
    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createAuthor = createAuthor
