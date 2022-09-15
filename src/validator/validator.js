
//for valid data entered by user
const isValid= function(value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value !== "string" || value.trim() == "") { return false };
    return true
}

// email
const isValidEmail = function (value) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value)) { return true }
    else return false
}

// valid Number

const isValidNumber = function(value){
    if(/^\(?([6-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
        return true
    }else{
        return false
    }
}

//for valid url
const isValidUrl = function(value){
    if(/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i.test(value)){
        return true
    }else{
        return false
    }
}


//for valid college abbreviation

const isVaildName = function(value){
    if(/^[a-z]+$/.test(value)){
        return true
    }else{
        return false
    }
}


//for valid interns name

const isVaildInternName = function(value){
    if(/^[a-zA-z]+([\s][a-zA-Z]+)*$/
    .test(value)){
        return true
    }else{
        return false
    }
}

//for valid full name of the college

const isValidFname= function(value){
    if(/^[a-zA-Z ]+$/.test(value)){
        return true
    }else{
        return false
    }
}




module.exports = { isValid, isValidEmail, isValidNumber,isValidUrl,isVaildName,isValidFname,isVaildInternName }