const dodtenv = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const port = process.env.port || 5000;

const cors = require('cors');
const app = express()

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.listen(port, () => console.log(`Server started on port ${port}`))

app.use('/api/jobSeekers', require("./routes/jobSeekers"))

connectDB()