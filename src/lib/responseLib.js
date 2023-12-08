const ResponceWithOutEncode = (err, message, data) => {
  return {
    err,
    message,
    data,
  };
};
module.exports = {
    Generate : ResponceWithOutEncode
}