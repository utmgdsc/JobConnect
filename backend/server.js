const dodtenv = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const port = process.env.PORT || 5000;
const passportConfig = require("./lib/passportConfig");
const cors = require('cors');
const app = express()
const uploadController = require('./controllers/uploadController')
const multer = require('multer')

// Enable CORS for all origins

app.use(express.json());
app.use(cors())

app.listen(port, () => console.log(`Server started on port ${port}`))

app.use(passportConfig.initialize());


const upload = multer({ dest: 'files/'})
app.post('/api/upload-files', upload.single('file'), uploadController.uploadResume);

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobSeekersRoutes', require("./routes/jobSeekersRoutes"))
app.use('/api/jobPostingRoutes', require("./routes/jobPostingRoutes"))
app.use('/api/employerRoutes', require("./routes/employerRoutes"))
app.use('/api/assetPostingRoutes', require("./routes/assetPostingRoutes"))
app.use('/api/eventsRoutes', require("./routes/eventsRoutes"))
app.use('/api/subscribe', require("./routes/subscribeRoutes"))

connectDB()