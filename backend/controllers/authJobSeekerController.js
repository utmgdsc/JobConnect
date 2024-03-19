const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JobSeeker = require('../models/jobSeekerModel');

exports.register = async (req, res) => {
  try {
    const { name, email, password, username, address} = req.body;
    // Check if user already exists
    let jobSeeker = await JobSeeker.findOne({ 'personalInformation.contactDetails.email': email });
    if (jobSeeker) {
      return res.status(400).json({ msg: 'Job Seeker already exists' });
    }

    // Create new user
    jobSeeker = new JobSeeker({
      personalInformation: {
        name,
        contactDetails: { email },
        username,
        password,
        address
      }
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    jobSeeker.personalInformation.password = await bcrypt.hash(password, salt);

    await jobSeeker.save();

    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(1);
    // Check if user exists
    let jobSeeker = await JobSeeker.findOne({ 'personalInformation.contactDetails.email': email });
    if (!jobSeeker) {
      return res.status(400).json({ msg: 'invalid email' });
    }
    console.log(2);
    // Validate password
    console.log(jobSeeker.personalInformation.password);
    console.log(password);
    const isMatch = await bcrypt.compare(password, jobSeeker.personalInformation.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid password' });
    }
    console.log(3);
    await jobSeeker.save();
    const mysecretkey = process.env.JWT_SECRET
    // Create JWT token
    const payload = {
      jobSeeker: {
        id: jobSeeker.id
      }
    };
    console.log(4);

    const token = jwt.sign(
        payload,
        mysecretkey,
        { expiresIn: 3600 }); // 1 hour expiration
    res.status(200).json({
        msg: "User is logged in",
        token: token
        });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
