const jwt = require("jsonwebtoken")
const SECRETKEY = "sofin21noi5dnsd51561"

exports.tokenChecker = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]
  const bearerToken = bearerHeader.split(" ")
  const token = bearerToken[1]

  var verify_token = jwt.verify(token, SECRETKEY)

  if (!verify_token) {
    res.json({
      error: "Unauthorized route please login first",
    })
  }

  next()
}
