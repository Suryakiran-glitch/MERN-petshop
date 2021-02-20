const { Client } = require("pg")

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "anjana",
  database: "petshop",
  port: 5432,
})

var connection = client.connect()

if (connection) {
  console.log("Connected to Database")
}

module.exports = client
