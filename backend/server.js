const dodtenv = require('dotenv').config()
const connectDB = require('./config/db')
const express = require('express')
const port = process.env.PORT || 5000;
const passportConfig = require("./lib/passportConfig");
const cors = require('cors');
const app = express()
const uploadController = require('./controllers/uploadController')
const multer = require('multer')
const path = require('path')
console.log(path.join(__dirname, 'files'))
app.use('/files', express.static(path.join(__dirname, 'files')))

// console.log("test")
// console.log(path.join(__dirname, 'files'), "path")
// Enable CORS for all origins

app.use(express.json());
app.use(cors())

app.listen(port, () => console.log(`Server started on port ${port}`))

app.use(passportConfig.initialize());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + ".pdf");
  },
});

require("./models/pdfDetails");
const upload = multer({ storage: storage });

app.post('/api/upload-files', upload.single('file'), uploadController.uploadResume);
app.get('/api/get-files', uploadController.getFiles);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/jobSeekersRoutes', require("./routes/jobSeekersRoutes"))
app.use('/api/jobPostingRoutes', require("./routes/jobPostingRoutes"))
app.use('/api/employerRoutes', require("./routes/employerRoutes"))
app.use('/api/assetPostingRoutes', require("./routes/assetPostingRoutes"))
app.use('/api/eventsRoutes', require("./routes/eventsRoutes"))
app.use('/api/subscribe', require("./routes/subscribeRoutes"))
app.use('/api/applicationRoutes', require('./routes/applicationRoutes'))

connectDB()