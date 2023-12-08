const empty = (value) => {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === "NAN" ||
    value === false ||
    value?.length === 0 ||
    Object.keys(value)?.length === 0
  ) {
    return true
  }else{
    return false
  }
};


module.exports = {
    Empty: empty
}
