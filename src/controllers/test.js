
// const getBlogs = async function (req, res) {
//     try {
//         const q = req.query // it gives an object
     
//         const temp = {}
//         if (q.category && q.category.trim() !== undefined) { temp.category = q.category.trim() }

//         if (q.authorId && q.authorId.trim() !== undefined) {
//             if (!ObjectId.isValid(q.authorId.trim())) return res.status(400).send({ status: false, msg: "AuthorId is not valid" })
//             temp.authorId = q.authorId.trim()
//         }

//         if (q.tag && q.tag.trim() !== undefined) { temp.tags = q.tag.trim() }

//         if (q.subcategory && q.subcategory.trim() !== undefined) { temp.subcategory = q.subcategory.trim() }
        
//         console.log(authorId, category, tags, subcategory);
//         if (Object.keys(temp) == 0) {
//             const result = await blogModel.find({ isDeleted: false, isPublished: true })//.count()
//             if (result.length == 0) return res.status(404).send({ status: false, msg: "no Data found" })

//             return res.status(200).send({ status: true, data: result })
//         }
//         // -------------------------------- this is for query param --------------------------------
//         else {
//             const result = await blogModel.find(temp).find({ isDeleted: false, isPublished: false })//.count()
//             if (result.length == 0) return res.status(404).send({ status: false, msg: "no data found" })

//             return res.status(200).send({ status: true, data: result })
//         }
//     }
//     catch (err) {
//         return res.status(500).send({ status: false, msg: err.message })
//     }
// }