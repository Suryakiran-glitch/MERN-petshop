const client = require("../db")
const bcrypt = require("bcrypt")
const { generateToken } = require("../utils/token")

exports.registerController = async (req, res) => {
  const { name, email, password } = req.body
  const token = generateToken(email)
  const hash_password = bcrypt.hashSync(password, 10)
  const query = {
    text:
      "INSERT INTO users(name,email,password,is_admin) VALUES ($1,$2,$3,$4) RETURNING *",
    values: [name, email, hash_password, false],
  }
  client
    .query(query)
    .then((result) => {
      res.json({
        token,
        id: result.rows[0].id,
        email: result.rows[0].email,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.loginController = (req, res) => {
  const { email, password } = req.body
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  }

  client.query(query, (err, result) => {
    if (err) {
      console.log(err.stack)
    } else if (result) {
      const compare_password = bcrypt.compareSync(
        password,
        result.rows[0].password
      )
      if (compare_password) {
        var token = generateToken(email)
        res.json({
          token,
          email: result.rows[0].email,
          id: result.rows[0].id,
        })
      } else {
        res.json({
          error: "Username and Password does not match",
        })
      }
    } else {
      res.json({
        error: "User does not exist please register first",
      })
    }
  })
}
