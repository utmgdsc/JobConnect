//const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const JobSeeker = require('../models/jobSeekerModel');

const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../models/User");
const JobSeeker = require("../models/jobSeekerModel");
const employer = require("../models/employerModel");


const randString = () => {
  const len = 8;
  let randStr = ''
  for (let i = 0; i < len; i++) {
    const ch = Math.floor((Math.random() * 10) + 1)
    randStr += ch
  }
  return randStr
}

exports.verifyEmail = async (req, res) => {
  try {
    const emailToken = req.body.emailToken;
    if (!emailToken) return res.status(404).json("EmailToken not found...");
    const user = await userModel.findOne({ emailToken });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      const token = createToken(user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        isVerified: user?.isVerified,
      })
    } else res.status(404).json("Email verification failed, invalid token!")
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
  }
}
exports.register = async (req, res) => {
  const data = req.body;
  email = data.email
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ msg: 'User already exists' });
  }
  user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
    emailToken: randString(),
  });


  user
    .save()
    .then(() => {
      const userDetails =
        user.type == "employer"
          ? new employer({
            userId: user._id,
            company: data.name,
            email: data.email,
            phone: data.contactNumber,
            bio: data.bio,
          })
          : new JobSeeker({
            userId: user._id,
            personalInformation: {
              name: data.name || "",
              age: 0,
              username: "",
              contactDetails: {
                email: data.email || "",
                phone: data.phone || "",
              },
              jobPreferences: {
                desiredIndustry: "",
                location: "",
                jobType: "",
              }
              // Add other personal information properties as needed
              // For example, age, username, password, address, etc.
            },
            professionalProfile: {
              skills: data.skills,
              // Add other professional profile properties as needed
              // For example, experience, education, etc.
            },
          });

      userDetails
        .save()
        .then(() => {
          // Token
          const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
          res.json({
            token: token,
            type: user.type,
          });
        })
        .catch((err) => {
          console.log("ERRORRRRRRR")
          console.log(err.message)
          userDetails.deleteOne({ _id: userDetails._id }) // Assuming UserDetails is your Mongoose model
            .then(() => {
              res.status(410).json({ error: err.message }); // Respond with error message
            })
            .catch((deleteErr) => {
              res.status(500).json({ error: deleteErr.message }); // Handle delete error
            });
          err;
        });
    })
};

exports.login = async (req, res, next) => {
  try {
    passport.authenticate(
      "local",
      { session: false },
      function (err, user, info) {
        if (err) {
          return next(err);
        }
        if (!user) {
          res.status(401).json(info);
          return;
        }
        // Token
        const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
        console.log(token);
        res.json({
          token: token,
          type: user.type,
        });
      }
    )(req, res, next);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};