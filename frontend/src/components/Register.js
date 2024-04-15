import { useContext } from "react";
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
        className="centered-form"
        style={{
          minHeight: "100vh", // Ensures the Row takes at least the height of the viewport
        }}
      >
          <Col xs={12} md={6} lg={4}>
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