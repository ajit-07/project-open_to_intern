const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routes/route.js');
const app = express();
const moment = require("moment")

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); // -->  it is not mandatory

mongoose.connect("mongodb+srv://Debasish904:Nzi5BjnfyWQmSY9m@cluster0.eeozuz6.mongodb.net/project:2", {
    useNewUrlParser: true // 
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);// -->  url starts from ' / '

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
