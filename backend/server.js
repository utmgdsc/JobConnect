const dodtenc = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const port = process.env.port || 5000;

const app = express()

app.listen(port, () => console.log(`Server started on port {port}`))

connectDB()