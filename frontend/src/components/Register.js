import { useContext, useState } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import {TextField, MenuItem, Grid} from "@mui/material"
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { MuiChipsInput } from "mui-chips-input";
import DescriptionIcon from "@mui/icons-material/Description";
import FaceIcon from "@mui/icons-material/Face";
import FileUploadInput from "./FileUploadInput";

const EducationInput = (props) => {
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid
          item
          container
          key={key}
          style={{ paddingLeft: 0, paddingRight: 0 }}
          alignItems="center" // Align items vertically
        >
          <Grid item xs={3}> {/* Adjusted grid size for institution */}
            <TextField
              label={`Institution Name #${key + 1}`}
              value={education[key].institution}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institution = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}> {/* Added grid for degree */}
            <TextField
              label="Degree"
              value={obj.degree}
              variant="outlined"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].degree = event.target.value;
                setEducation(newEdu);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}> {/* Added grid for field of study */}
            <TextField
              label="Field of Study"
              value={obj.fieldOfStudy}
              variant="outlined"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].fieldOfStudy = event.target.value;
                setEducation(newEdu);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}> {/* Adjusted grid size for start year */}
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={2}> {/* Adjusted grid size for end year */}
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="primary"
          // color=""
          onClick={() =>
            setEducation([
              ...education,
              {
                institution: "",
                degree: "", // Added default value for degree
                fieldOfStudy: "", // Added default value for field of study
                startYear: "",
                endYear: "",
              },
            ])
          }
        >
          Add another institution details
        </Button>
      </Grid>
    </>
  );
  
};
const ExperienceInput = (props) => {
  const { experience, setExperience } = props;

  return (
    <>
      {experience.map((obj, key) => (
        <Grid
          item
          container
          key={key}
          style={{ paddingLeft: 0, paddingRight: 0 }}
          alignItems="center" // Align items vertically
        >
          <Grid item xs={2}> {/* Adjusted grid size for institution */}
            <TextField
              label={`Job #${key + 1}`}
              value={experience[key].title}
              onChange={(event) => {
                const newEdu = [...experience];
                newEdu[key].title = event.target.value;
                setExperience(newEdu);
              }}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}> {/* Added grid for degree */}
            <TextField
              label="Company"
              value={obj.company}
              variant="outlined"
              onChange={(event) => {
                const newEdu = [...experience];
                newEdu[key].company = event.target.value;
                setExperience(newEdu);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}> {/* Added grid for field of study */}
            <TextField
              label="Description"
              value={obj.description}
              variant="outlined"
              onChange={(event) => {
                const newEdu = [...experience];
                newEdu[key].description = event.target.value;
                setExperience(newEdu);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}> {/* Adjusted grid size for start year */}
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...experience];
                newEdu[key].startYear = event.target.value;
                setExperience(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={2}> {/* Adjusted grid size for end year */}
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...experience];
                newEdu[key].endYear = event.target.value;
                setExperience(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="primary"
          // color=""
          onClick={() =>
            setExperience([
              ...experience,
              {
                title: "",
                company: "", // Added default value for degree
                description: "", // Added default value for field of study
                startYear: "",
                endYear: "",
              },
            ])
          }
        >
          Add another experience
        </Button>
      </Grid>
    </>
  );
  
};

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
    education,
    setEducation,
    experience,
    setExperience
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "20%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>
              <TextField
                select
                label="Category"
                variant="outlined"
                value={registerInfo.type}
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, type: e.target.value })
                }
              >
                <MenuItem value="applicant">Applicant</MenuItem>
                <MenuItem value="employer">Employer</MenuItem>
              </TextField>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, name: e.target.value })
                }
                value={registerInfo.name}
              />
              {registerInfo.type === "employer" && (
                <>
                <Form.Control
                  type="text"
                  placeholder="Company"
                  onChange={(e) =>
                    updateRegisterInfo({ ...registerInfo, company: e.target.value })
                  }
                  value={registerInfo.company}
                />
                <TextField
                  label="Description (up to 250 words)"
                  multiline
                  rows={8}
                  style={{ width: "100%" }}
                  variant="outlined"
                  value={registerInfo.description}
                  onChange={(e) =>
                    updateRegisterInfo({
                      ...registerInfo,
                      description: e.target.value,
                    })
                  }
                />
               </>
                
              )}

              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, email: e.target.value })
                }
                value={registerInfo.email}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    password: e.target.value,
                  })
                }
                value={registerInfo.password}
              />
              <Form.Control
                type="address"
                placeholder="Address"
                onChange={(e) =>
                  updateRegisterInfo({ ...registerInfo, address: e.target.value })
                }
                value={registerInfo.address}
              />
              <PhoneInput
                // type="phone"
                // placeholder="phone"
                country={"ca"}
                value={registerInfo.phone}
                onChange={(phone) =>
                  updateRegisterInfo({
                    ...registerInfo,
                    phone: phone,
                  })
                }
              />
              {registerInfo.type === "applicant" && (
                <>
                  <Form.Control
                    type="age"
                    placeholder="Age"
                    onChange={(e) =>
                      updateRegisterInfo({ ...registerInfo, age: e.target.value })
                    }
                    value={registerInfo.age}
                  />
                  <MuiChipsInput
                    label="Skills"
                    variant="outlined"
                    helperText="Please add any relevant skills"
                    value={registerInfo.skills}
                    onChange={(chips) =>
                      updateRegisterInfo({ ...registerInfo, skills: chips })
                    }
                  />
                  <h3>Experience</h3>
                  <ExperienceInput
                    experience={experience}
                    setExperience={setExperience}
                  />
                  <h3>Education</h3>
                  <EducationInput
                    education={education}
                    setEducation={setEducation}
                  />
                  <h3>Resume</h3>
                  <FileUploadInput
                  updateRegisterInfo={updateRegisterInfo}
                  registerInfo={registerInfo}/>
                </>
              )
              }
             
              <Button
                variant="primary"
                type="submit"
                disabled={isRegisterLoading}
              >
                {isRegisterLoading ? "Creating your account..." : "Register"}
              </Button>

              {registerError?.error && (
                <Alert variant="danger">
                  <b>{`Error status code: ${registerError?.status}`}</b>
                  <p>{registerError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;




// import { useState, useContext } from "react";
// import {
//   Grid,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   MenuItem,
//   Input,
// } from "@mui/material";
// // import { makeStyles} from "@mui/styles"
// import axios from "axios";
// import { Navigate } from "react-router-dom";
// import { MuiChipsInput } from "mui-chips-input";
// import DescriptionIcon from "@mui/icons-material/Description";
// import FaceIcon from "@mui/icons-material/Face";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/material.css";
// import { styled } from "@mui/system"
// import PasswordInput from "../lib/PasswordInput";
// import EmailInput from "../lib/EmailInput";
// import FileUploadInput from "../lib/FileUploadInput";
// import { SetPopupContext } from "../App";
// import apiList from "../lib/apiList";
// import isAuth from "../lib/isAuth";

// const MultifieldInput = (props) => {
//   const { education, setEducation } = props;

//   return (
//     <>
//       {education.map((obj, key) => (
//         <Grid
//           item
//           container
//           key={key}
//           style={{ paddingLeft: 0, paddingRight: 0 }}
//         >
//           <Grid item xs={6}>
//             <TextField
//               label={`Institution Name #${key + 1}`}
//               value={education[key].institution}
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].institution = event.target.value;
//                 setEducation(newEdu);
//               }}
//               variant="outlined"
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="Start Year"
//               value={obj.startYear}
//               variant="outlined"
//               type="number"
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].startYear = event.target.value;
//                 setEducation(newEdu);
//               }}
//             />
//           </Grid>
//           <Grid item xs={3}>
//             <TextField
//               label="End Year"
//               value={obj.endYear}
//               variant="outlined"
//               type="number"
//               onChange={(event) => {
//                 const newEdu = [...education];
//                 newEdu[key].endYear = event.target.value;
//                 setEducation(newEdu);
//               }}
//             />
//           </Grid>
//         </Grid>
//       ))}
//       <Grid item>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={() =>
//             setEducation([
//               ...education,
//               {
//                 institution: "",
//                 startYear: "",
//                 endYear: "",
//               },
//             ])
//           }
//         >
//           Add another institution details
//         </Button>
//       </Grid>
//     </>
//   );
// };

// const Register = (props) => {
//   const setPopup = useContext(SetPopupContext);

//   const [loggedin, setLoggedin] = useState(isAuth());

//   const [registerDetails, setregisterDetails] = useState({
//     type: "applicant",
//     email: "",
//     password: "",
//     name: "",
//     education: [],
//     skills: [],
//     resume: "",
//     profile: "",
//     bio: "",
//     contactNumber: "",
//   });

//   const [phone, setPhone] = useState("");

//   const [education, setEducation] = useState([
//     {
//       institution: "",
//       startYear: "",
//       endYear: "",
//     },
//   ]);

//   const [inputErrorHandler, setInputErrorHandler] = useState({
//     email: {
//       untouched: true,
//       required: true,
//       error: false,
//       message: "",
//     },
//     password: {
//       untouched: true,
//       required: true,
//       error: false,
//       message: "",
//     },
//     name: {
//       untouched: true,
//       required: true,
//       error: false,
//       message: "",
//     },
//   });

//   const handleInput = (key, value) => {
//     setregisterDetails({
//       ...registerDetails,
//       [key]: value,
//     });
//   };

//   const handleInputError = (key, status, message) => {
//     setInputErrorHandler({
//       ...inputErrorHandler,
//       [key]: {
//         required: true,
//         untouched: false,
//         error: status,
//         message: message,
//       },
//     });
//   };

//   const handleLogin = () => {
//     const tmpErrorHandler = {};
//     Object.keys(inputErrorHandler).forEach((obj) => {
//       if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
//         tmpErrorHandler[obj] = {
//           required: true,
//           untouched: false,
//           error: true,
//           message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
//         };
//       } else {
//         tmpErrorHandler[obj] = inputErrorHandler[obj];
//       }
//     });

//     console.log(education);

//     let updatedDetails = {
//       ...registerDetails,
//       education: education
//         .filter((obj) => obj.institution.trim() !== "")
//         .map((obj) => {
//           if (obj["endYear"] === "") {
//             delete obj["endYear"];
//           }
//           return obj;
//         }),
//     };

//     setregisterDetails(updatedDetails);

//     const verified = !Object.keys(tmpErrorHandler).some((obj) => {
//       return tmpErrorHandler[obj].error;
//     });

//     if (verified) {
//       axios
//         .post(apiList.register, updatedDetails)
//         .then((response) => {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("type", response.data.type);
//           setLoggedin(isAuth());
//           setPopup({
//             open: true,
//             severity: "success",
//             message: "Registered successfully",
//           });
//           console.log(response);
//         })
//         .catch((err) => {
//           setPopup({
//             open: true,
//             severity: "error",
//             message: err.response.data.message,
//           });
//           console.log(err.response);
//         });
//     } else {
//       setInputErrorHandler(tmpErrorHandler);
//       setPopup({
//         open: true,
//         severity: "error",
//         message: "Incorrect Input",
//       });
//     }
//   };

//   const handleLoginEmployer = () => {
//     const tmpErrorHandler = {};
//     Object.keys(inputErrorHandler).forEach((obj) => {
//       if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
//         tmpErrorHandler[obj] = {
//           required: true,
//           untouched: false,
//           error: true,
//           message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
//         };
//       } else {
//         tmpErrorHandler[obj] = inputErrorHandler[obj];
//       }
//     });

//     let updatedDetails = {
//       ...registerDetails,
//     };
//     if (phone !== "") {
//       updatedDetails = {
//         ...registerDetails,
//         contactNumber: `+${phone}`,
//       };
//     } else {
//       updatedDetails = {
//         ...registerDetails,
//         contactNumber: "",
//       };
//     }

//     setregisterDetails(updatedDetails);

//     const verified = !Object.keys(tmpErrorHandler).some((obj) => {
//       return tmpErrorHandler[obj].error;
//     });

//     console.log(updatedDetails);

//     if (verified) {
//       axios
//         .post(apiList.register, updatedDetails)
//         .then((response) => {
//           localStorage.setItem("token", response.data.token);
//           localStorage.setItem("type", response.data.type);
//           setLoggedin(isAuth());
//           setPopup({
//             open: true,
//             severity: "success",
//             message: "Logged in successfully",
//           });
//           console.log(response);
//         })
//         .catch((err) => {
//           setPopup({
//             open: true,
//             severity: "error",
//             message: err.response.data.message,
//           });
//           console.log(err.response);
//         });
//     } else {
//       setInputErrorHandler(tmpErrorHandler);
//       setPopup({
//         open: true,
//         severity: "error",
//         message: "Incorrect Input",
//       });
//     }
//   };

//   return loggedin ? (
//     <Navigate to="/" />
//   ) : (
//     <Paper elevation={3} >
//       <Grid container direction="column" spacing={4} alignItems="center" className="p-5">
//         <Grid item>
//           <Typography variant="h3" component="h2">
//             Signup
//           </Typography>
//         </Grid>
//         <Grid item>
//           <TextField
//             select
//             label="Category"
//             variant="outlined"
//             value={registerDetails.type}
//             onChange={(event) => {
//               handleInput("type", event.target.value);
//             }}
//           >
//             <MenuItem value="applicant">Applicant</MenuItem>
//             <MenuItem value="employer">Employer</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item>
//           <TextField
//             label="Name"
//             value={registerDetails.name}
//             onChange={(event) => handleInput("name", event.target.value)}
//             error={inputErrorHandler.name.error}
//             helperText={inputErrorHandler.name.message}
//             onBlur={(event) => {
//               if (event.target.value === "") {
//                 handleInputError("name", true, "Name is required");
//               } else {
//                 handleInputError("name", false, "");
//               }
//             }}
//             variant="outlined"
//           />
//         </Grid>
//         <Grid item>
//           <EmailInput
//             label="Email"
//             value={registerDetails.email}
//             onChange={(event) => handleInput("email", event.target.value)}
//             inputErrorHandler={inputErrorHandler}
//             handleInputError={handleInputError}
//             required={true}
//           />
//         </Grid>
//         <Grid item>
//           <PasswordInput
//             label="Password"
//             value={registerDetails.password}
//             onChange={(event) => handleInput("password", event.target.value)}
//             error={inputErrorHandler.password.error}
//             helperText={inputErrorHandler.password.message}
//             onBlur={(event) => {
//               if (event.target.value === "") {
//                 handleInputError("password", true, "Password is required");
//               } else {
//                 handleInputError("password", false, "");
//               }
//             }}
//           />
//         </Grid>
//         {registerDetails.type === "applicant" ? (
//           <>
//             <MultifieldInput
//               education={education}
//               setEducation={setEducation}
//             />
//             <Grid item>
//               <MuiChipsInput
//                 label="Skills"
//                 variant="outlined"
//                 helperText="Press enter to add skills"
//                 onChange={(chips) =>
//                   setregisterDetails({ ...registerDetails, skills: chips })
//                 }
//               />
//             </Grid>
//             {/* <Grid item>
//               <FileUploadInput
//                 className={classes.inputBox}
//                 label="Resume (.pdf)"
//                 icon={<DescriptionIcon />}
//                 value={files.resume}
//                 onChange={(event) =>
//                   setFiles({
//                     ...files,
//                     resume: event.target.files[0],
//                   })
//                 }
//                 uploadTo={apiList.uploadResume}
//                 handleInput={handleInput}
//                 identifier={"resume"}
//               />
//             </Grid> */}
//             {/* <Grid item>
//               <FileUploadInput
//                 className={classes.inputBox}
//                 label="Profile Photo (.jpg/.png)"
//                 icon={<FaceIcon />}
//                 value={files.profileImage}
//                 onChange={(event) =>
//                   setFiles({
//                     ...files,
//                     profileImage: event.target.files[0],
//                   })
//                 }
//                 uploadTo={apiList.uploadProfileImage}
//                 handleInput={handleInput}
//                 identifier={"profile"}
//               />
//             </Grid> */}
//           </>
//         ) : (
//           <>
//             <Grid item style={{ width: "100%" }}>
//               <TextField
//                 label="Bio (upto 250 words)"
//                 multiline
//                 rows={8}
//                 style={{ width: "100%" }}
//                 variant="outlined"
//                 value={registerDetails.bio}
//                 onChange={(event) => {
//                   if (
//                     event.target.value.split(" ").filter(function (n) {
//                       return n != "";
//                     }).length <= 250
//                   ) {
//                     handleInput("bio", event.target.value);
//                   }
//                 }}
//               />
//             </Grid>
//             <Grid item>
//               <PhoneInput
//                 country={"in"}
//                 value={phone}
//                 onChange={(phone) => setPhone(phone)}
//               />
//             </Grid>
//           </>
//         )}

//         <Grid item>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={() => {
//               registerDetails.type === "applicant"
//                 ? handleLogin()
//                 : handleLoginEmployer();
//             }}
//           >
//             register
//           </Button>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default Register;