const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const isValidForArray = function (value) { //function to check entered data is valid or not
    const newArr = []
    for (let i = 0; i < value.length; i++) {//  ["ghfgh","   ",56444,"freendon 1947,"ghhgf"]
        if (typeof value[i] == "string") {
            if (value[i].trim() !== "") {
                newArr.push(value[i])
            }
        }
    }
    if (newArr.length == 0) { return false }
    else { return newArr }
}


const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    body: {
        type: String,
        required: true,
        trim: true
    },

    authorId: {
        type: ObjectId,
        ref: "Author",
        required: true,
        trim: true
    },

    tags: {
        type: [String],
        trim:true
    },

    category: {
        type: [String],
        validate: [isValidForArray, "category cannot be empty"],
        required: true
    },

    subcategory: {
        type: [String],
        validate: [isValidForArray, "subcategory cannot be empty"],
    },

    deletedAt: {
        type: Date,
        default: null
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    publishedAt: {
        type: Date,
        default: null
    },

    isPublished: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


module.exports = mongoose.model("Blog", blogSchema) //blogs