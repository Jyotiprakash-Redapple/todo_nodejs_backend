const slash = (value)=>{
    return value.toString().replace(/\//g, "").replace(/\\/g, "").replace(/\"/g, "")
}

module.exports = {
    Slash :slash
}