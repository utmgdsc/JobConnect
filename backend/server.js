const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const port = process.env.PORT || 5000;
const passportConfig = require("./lib/passportConfig");
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require("fs");
const uploadController = require('./controllers/uploadController');
const path = require('path');
const resumeController = require('./controllers/resumeController');
const app = express();

app.use(express.json());
app.use(cors());
app.use(passportConfig.initialize());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middleware for parsing multipart/form-data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + ".pdf");
  },
});

const upload = multer({ storage: storage });

// Add the resume analysis route
app.post('/api/analyze-resume', upload.single('resume'), resumeController.analyzeResume);

// Route for uploading files
app.post('/api/upload-files', upload.single('file'), uploadController.uploadResume);

// Route for getting uploaded files
app.get('/api/get-files', uploadController.getFiles);

// Serving static files
app.use('/files', express.static(path.join(__dirname, 'files')));

// Define other routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobSeekersRoutes', require("./routes/jobSeekersRoutes"));
app.use('/api/jobPostingRoutes', require("./routes/jobPostingRoutes"));
app.use('/api/employerRoutes', require("./routes/employerRoutes"));
app.use('/api/assetPostingRoutes', require("./routes/assetPostingRoutes"));
app.use('/api/eventsRoutes', require("./routes/eventsRoutes"));
app.use('/api/subscribe', require("./routes/subscribeRoutes"));
app.use('/api/applicationRoutes', require('./routes/applicationRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));

connectDB();
