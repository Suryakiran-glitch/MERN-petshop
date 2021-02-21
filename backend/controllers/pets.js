const client = require("../db")

exports.postPetsController = (req, res) => {
  const { name, breed, type, owner, contact, delivered } = req.body
  const query = {
    text:
      "INSERT INTO pets (name,breed,type,owner,contact,delivered) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    values: [name, breed, type, owner, contact, delivered],
  }
  client
    .query(query)
    .then((result) => {
      res.json({
        data: result.rows[0],
        message: "Pet Added successfully",
      })
    })
    .catch((err) => console.log(err.stack))
}

exports.getPetById = (req, res) => {
  const { id } = req.params
  const query = {
    text: "SELECT * FROM pets WHERE id = $1 RETURNING *",
    values: [id],
  }
  client
    .query(query)
    .then((result) => {
      res.json({
        data: result.rows[0],
      })
    })
    .catch((err) => console.log(err.stack))
}

exports.getAllPets = (req, res) => {
  const query = {
    text: "SELECT * FROM admins RETURNING *",
  }

  client
    .query(query)
    .then((result) => {
      res.json({
        data: result.rows[0],
      })
    })
    .catch((err) => {
      console.log(err.stack)
    })
}
