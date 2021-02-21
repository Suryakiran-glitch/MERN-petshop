const { generateToken } = require("../utils/token")
const bcrypt = require("bcrypt")
const client = require("../db")

exports.registerAdmin = (req, res) => {
  const { name, email, password } = req.body
  const token = generateToken(email)
  const hash_password = bcrypt.hashSync(password, 10)

  const query = {
    text:
      "INSERT INTO admins (name,email,password,is_admin) VALUES ($1,$2,$3,$4) RETURNING *",
    values: [name, email, hash_password, true],
  }

  client
    .query(query)
    .then((result) => {
      res.json({
        token,
        id: result.rows[0].id,
        email: result.rows[0].email,
        message: "Login successful",
      })
    })
    .catch((err) => console.log(err.stack))
}

exports.loginAdmin = (req, res) => {
  const { email, password } = req.body
  const token = generateToken(email)

  const query = {
    text: "SELECT * FROM admins where email = $1",
    values: [email],
  }

  client
    .query(query)
    .then((result) => {
      const password_check = bcrypt.compareSync(
        password,
        result.rows[0].password
      )
      if (!password_check || !result) {
        res.json({
          error: "User does not exist",
        })
      }
      res.json({
        token,
        email: result.rows[0].email,
        id: result.rows[0].id,
      })
    })
    .catch((err) => console.log(err.stack))
}
