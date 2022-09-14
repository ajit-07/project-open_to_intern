
function isValidName(value) {
    if (typeof value == "undefined" || value == null) return false;
    if (typeof value !== "string" || value.trim() == "") { return false };
    return value
}

function isValidFullName(value) {
    if (typeof value !== "string" || value.trim() == "") { return false };
    return value;
}

function isValid(value) {
    if (typeof value !== "string" || value.trim() == "") { return false };
    return value;
}

///^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/--email

module.exports = { isValid, isValidFullName, isValidName }