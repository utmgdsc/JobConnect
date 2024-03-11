const dodtenv = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const port = process.env.port || 3000;

const cors = require('cors');
const app = express()

// Enable CORS for all origins
app.use(cors());

app.use(express.json());

app.listen(port, () => console.log(`Server started on port ${port}`))

app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobSeekersRoutes', require("./routes/jobSeekersRoutes"))
app.use('/api/jobPostingsRoutes', require("./routes/jobPostingRoutes"))
try {
    app.use('/api/jobPostingsRoutes', require("./routes/jobPostingRoutes"))
} catch (error) {
    console.log("not working")
}
app.use('/api/employerRoutes', require("./routes/employerRoutes"))
app.use('/api/assetPostingRoutes', require("./routes/assetPostingRoutes"))
app.use('/api/eventsRoutes', require("./routes/eventsRoutes"))

connectDB()