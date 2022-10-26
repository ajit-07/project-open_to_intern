const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const route = require('./routes/route.js');
const app = express();


app.use(bodyParser.json());


mongoose.connect("mongodb+srv://ajit-07:pzD85GscINrNEeKB@cluster0.mzumpor.mongodb.net/ajit070698-project-2", {
    useNewUrlParser: true  
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);// -->  url starts from ' / '

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
