const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const port = process.env.PORT || 5000;
const passportConfig = require("./lib/passportConfig");
const cors = require('cors');
const multer = require('multer');
const resumeController = require('./controllers/resumeController'); // Assuming you will create this
const app = express();

app.use(express.json());
app.use(cors());
app.use(passportConfig.initialize());

// Middleware for parsing multipart/form-data
const upload = multer({ dest: 'uploads/' });

// Add the resume analysis route
app.post('/api/analyze-resume', upload.single('resume'), resumeController.analyzeResume);

// Define other routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobSeekersRoutes', require("./routes/jobSeekersRoutes"));
app.use('/api/jobPostingRoutes', require("./routes/jobPostingRoutes"));
app.use('/api/employerRoutes', require("./routes/employerRoutes"));
app.use('/api/assetPostingRoutes', require("./routes/assetPostingRoutes"));
app.use('/api/eventsRoutes', require("./routes/eventsRoutes"));
app.use('/api/subscribe', require("./routes/subscribeRoutes"));

connectDB();

app.listen(port, () => console.log(`Server started on port ${port}`));
