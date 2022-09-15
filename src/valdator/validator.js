

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
    if(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value)) {
        return true
    }else{
        return false
    }
}

const isValidUrl = function(value){
    if(/^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif))$/i.test(value)){
        return true
    }else{
        return false
    }
}

const isAlphabet = function(value){
    if(/^[a-zA-Z]{2,30}$/.test(value)){
        return true
    }else{
        return false
    }
}



///^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/--email

module.exports = { isValid, isValidEmail, isValidNumber,isValidUrl,isAlphabet,isValidFname }