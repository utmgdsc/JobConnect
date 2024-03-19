//const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const JobSeeker = require('../models/jobSeekerModel');

const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../models/User");
const JobSeeker = require("../models/jobSeekerModel");
const employer = require("../models/employerModel");

exports.register = async (req, res) => {
  try {
    const data = req.body;
  let user = new User({
    email: data.email,
    password: data.password,
    type: data.type,
  });

  user
    .save()
    .then(() => {
      const userDetails =
        user.type == "employer"
          ? new employer({
              userId: user._id,
              name: data.name,
              phone: data.phone,
              bio: data.description,
            })
          : new JobSeeker({
              userId: user._id,
              personalInformation: {
                name: data.name,
                contactDetails: {
                    email: data.contact.email,
                    phone: data.contact.phone
                },
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
          user
            .delete()
            .then(() => {
              res.status(400).json(err);
            })
            .catch((err) => {
              res.json({ error: err });
            });
          err;
        });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
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
