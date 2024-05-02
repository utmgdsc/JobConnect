const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const JobSeeker = require('../models/jobSeekerModel');
const validator = require("validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");

const User = require("../models/User");
const JobSeeker = require("../models/jobSeekerModel");
const employer = require("../models/employerModel");
const { sendVerificationMail } = require("../lib/sendVerificationMail");

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
    data = req.body
    if (!emailToken) return res.status(404).json("EmailToken not found...");
    const user = await User.findOne({ emailToken });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        token,
        isVerified: user?.isVerified,
      })
    } else res.status(404).json("Email verification failed, invalid token!")
  } catch (error) {
    res.status(500).json(error.message)
  }
}

exports.register = async (req, res) => {
  const { name, email, password, type } = req.body;
  const data = req.body
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json("User already exists...");

    user = new User({
      name,
      email,
      type,
      password,
      emailToken: randString(),
    });

    if (!name || !email || !password)
      return res.status(400).json("All fields are required...");

    if (!validator.isEmail(email))
      return res.status(400).json("Email must be a valid email...");

    // if (!validator.isStrongPassword(password))
    //   return res.status(400).json("Password must be a strong password..");
    // console.log("password before encryption", user.password)
    // const salt = await bcrypt.genSalt(10);
    // user.password = await bcrypt.hash(user.password, salt);
    // console.log("password after encryption", user.password)
    await user.save();
    const userDetails =
      user.type == "employer"
        ? new employer({
          userId: user._id,
          company: data.name,
          phone: data.phone,
          company: data.company,
          location: data.address,
          description: data.description,
          email: data.email,
        })
        : new JobSeeker({
          userId: user._id,
          personalInformation: {
            name: data.name,
            contactDetails: {
              email: data.email,
              phone: data.phone
            },
            jobPreferences: {
              desiredIndustry: "",
              location: "",
              jobType: "",
            }
            // Add other personal information properties as needed
            // For example, age, username, password, address, etc.
          },
          resume: data.resume,
          professionalProfile: {
            skills: data.skills,
            experience: data.experience,
            education: data.education
            // Add other professional profile properties as needed
            // For example, experience, education, etc.
          },
        });
      userDetails.save()
    sendVerificationMail(user);

    const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
    res
      .status(200)
      .json({ _id: user._id, name, email, type, token, isVerified: user.isVerified });
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.register = async (req, res) => {
//   const data = req.body;
//   email = data.email
//   let user = await User.findOne({ email });
//   if (user) {
//     return res.status(400).json({ msg: 'User already exists' });
//   }
//   user = new User({
//     email: data.email,
//     password: data.password,
//     type: data.type,
//     emailToken: randString(),
//   });


//   user
//     .save()
//     .then(() => {
//       const userDetails =
//         user.type == "employer"
//           ? new employer({
//             userId: user._id,
//             company: data.name,
//             phone: data.contactNumber,
//             bio: data.bio,
//             email: data.email,
//           })
//           : new JobSeeker({
//             userId: user._id,
//             personalInformation: {
//               name: data.name,
//               contactDetails: {
//                 email: data.email,
//                 phone: data.phone
//               },
//               jobPreferences: {
//                 desiredIndustry: "",
//                 location: "",
//                 jobType: "",
//               }
//               // Add other personal information properties as needed
//               // For example, age, username, password, address, etc.
//             },
//             professionalProfile: {
//               skills: data.skills,
//               // Add other professional profile properties as needed
//               // For example, experience, education, etc.
//             },
//           });

//       userDetails
//         .save()
//         .then(() => {
//           // Token
//           const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//           res.json({
//             token: token,
//             name: user.name,
//             email: user.email,
//             type: user.type,
//           });
//         })
//         .catch((err) => {
//           console.log("ERRORRRRRRR")
//           console.log(err.message)
//           userDetails.deleteOne({ _id: userDetails._id }) // Assuming UserDetails is your Mongoose model
//             .then(() => {
//               res.status(410).json({ error: err.message }); // Respond with error message
//             })
//             .catch((deleteErr) => {
//               res.status(500).json({ error: deleteErr.message }); // Handle delete error
//             });
//           err;
//         });
//     })
// };

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(401).json("Invalid email");
    user.login(password)
    .then(() => {
      const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        type: user.type,
        token: token,
        isVerified: user?.isVerified,
    });
      // Successful login
      // Proceed with further actions
    })
    .catch(() => {
      // Invalid password
      return res.status(400).json("Invalid password");
    });
    // if (!(user.login(password)))
    //   return res.status(400).json("Invalid password");
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.login = async (req, res, next) => {
//   try {
//     passport.authenticate(
//       "local",
//       { session: false },
//       function (err, user, info) {
//         if (err) {
//           return next(err);
//         }
//         if (!user) {
//           res.status(401).json(info);
//           return;
//         }
//         // Token
//         const token = jwt.sign({ _id: user._id }, authKeys.jwtSecretKey);
//         console.log(token);
//         res.json({
//           token: token,
//           type: user.type,
//         });
//       }
//     )(req, res, next);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// };

