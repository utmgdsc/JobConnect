const dodtenv = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const port = process.env.PORT || 5000;

const cors = require('cors');
const app = express()

// Enable CORS for all origins


app.use(express.json());
app.use(cors())

app.listen(port, () => console.log(`Server started on PORT ${port}`))

app.listen(port, () => console.log(`Server started on port ${port}`))

app.use('/api/jobSeekersRoutes', require("./routes/jobSeekersRoutes"))
app.use('/api/jobPostingsRoutes', require("./routes/jobPostingRoutes"))
app.use('/api/employerRoutes', require("./routes/employerRoutes"))
app.use('/api/assetPostingRoutes', require("./routes/assetPostingRoutes"))

connectDB()