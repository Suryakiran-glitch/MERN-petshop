const jwt = require("jsonwebtoken")
const SECRETKEY = "sofin21noi5dnsd51561"

exports.generateToken = (email) => {
  const token = jwt.sign(email, SECRETKEY)
  return token
}
