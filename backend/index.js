const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const authRoutes = require("./router/auth")

const app = express()

//Middlewares
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use("/api", authRoutes)

//Initializing servers
const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server running on port ${port} 🔥`)
})
