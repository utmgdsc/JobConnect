const dodtenv = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const port = process.env.PORT || 5000;
const passportConfig = require("./lib/passportConfig");
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express()

// Enable CORS for all origins


app.use(cors())

app.listen(port, () => console.log(`Server started on port ${port}`))
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(passportConfig.initialize());
// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobSeekersRoutes', require("./routes/jobSeekersRoutes"))
app.use('/api/jobPostingRoutes', require("./routes/jobPostingRoutes"))
app.use('/api/employerRoutes', require("./routes/employerRoutes"))
app.use('/api/assetPostingRoutes', require("./routes/assetPostingRoutes"))
app.use('/api/eventsRoutes', require("./routes/eventsRoutes"))
app.use('/api/subscribe', require("./routes/subscribeRoutes"))

connectDB()
