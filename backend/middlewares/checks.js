const jwt = require("jsonwebtoken")
const SECRETKEY = "sofin21noi5dnsd51561"
const client = require("../db")

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

exports.adminCheck = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]
  const bearerToken = bearerHeader.split(" ")
  const token = bearerToken[1]

  const decoded = jwt.verify(token, SECRETKEY)
  const email = decoded.email

  if (!token) {
    res.json({
      error: "Unauthorized token not available",
    })
  } else {
    const query = {
      text: "SELECT * FROM admins where email = $1",
      values: [email],
    }

    client
      .query(query)
      .then((result) => {
        if (result.rows[0].is_admin === true) {
          req.body.email = result.rows[0].email
        }
      })
      .catch((err) => {
        console.log(err.stack)
        res.json({
          error: "Unaothorized routes",
        })
      })
  }
  next()
}
