import React, { useState, useEffect } from "react";
import jobSeekersService from "../services/jobSeekersService";
import { useParams } from "react-router-dom"; // Import useParams
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../UserProfile.css";

function UserProfile() {
  const [jobSeeker, setJobSeeker] = useState({
    personalInformation: {
      name: "",
      age: "",
      username: "",
      contactDetails: {
        email: "",
        phone: "",
      },
    },
    professionalProfile: {
      skills: [],
      experience: [],
      education: [],
    },
    jobPreferences: {
      desiredIndustry: "",
      location: "",
      jobType: "",
    },
    applicationHistory: [],
  });


  const { id } = useParams();

  useEffect(() => {
    const fetchJobSeeker = async () => {
      try {
        const data = await jobSeekersService.getJobSeeker(id);
        setJobSeeker(data); // Assuming data is the job seeker's information
      } catch (error) {
        console.error("Failed to fetch job seeker:", error);
        // Handle error (e.g., show an error message)
      }
    };

    if (id) {
      fetchJobSeeker();
    }
  }, [id]);

  function handlePersonalInformationChange(name, value, prevJobSeeker) {
    return {
      ...prevJobSeeker,
      personalInformation: {
        ...prevJobSeeker.personalInformation,
        [name]: value,
      },
    };
  }

  function handleContactDetailsChange(name, value, prevJobSeeker) {
    return {
      ...prevJobSeeker,
      personalInformation: {
        ...prevJobSeeker.personalInformation,
        contactDetails: {
          ...prevJobSeeker.personalInformation.contactDetails,
          [name]: value,
        },
      },
    };
  }

  function handleJobPreferencesChange(name, value, prevJobSeeker) {
    return {
      ...prevJobSeeker,
      jobPreferences: {
        ...prevJobSeeker.jobPreferences,
        [name]: value,
      },
    };
  }

  function handleChange(event) {
    const { name, value, } = event.target;
    setJobSeeker((prevJobSeeker) => {
      if (name === 'skills') {
        return {
          ...prevJobSeeker,
          professionalProfile: {
            ...prevJobSeeker.professionalProfile,
            skills: value.split(',').map(skill => skill.trim()),
          },
        };
      }
      else if (name in prevJobSeeker.personalInformation) {
        return handlePersonalInformationChange(name, value, prevJobSeeker);
      } else if (name in prevJobSeeker.personalInformation.contactDetails) {
        return handleContactDetailsChange(name, value, prevJobSeeker);
      } else if (name in prevJobSeeker.jobPreferences) {
        return handleJobPreferencesChange(name, value, prevJobSeeker);
      } else {
        return prevJobSeeker;
      }
    });
  }

  function addExperience(e) {
    e.preventDefault();

    const newExperience = {
      title: e.target.title.value,
      company: e.target.company.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
      description: e.target.description.value,
    }

    setJobSeeker((prevJobSeeker) => {
      return {
        ...prevJobSeeker,
        professionalProfile: {
          ...prevJobSeeker.professionalProfile,
          experience: [...prevJobSeeker.professionalProfile.experience, newExperience],
        },
      };
    });
  }

  function deleteExperience(index) {
    setJobSeeker(prevJobSeeker => {
      const newExperience = [...prevJobSeeker.professionalProfile.experience];
      newExperience.splice(index, 1);
      return { ...prevJobSeeker, professionalProfile: { ...prevJobSeeker.professionalProfile, experience: newExperience } };
    });
  }

  function addEducation(e) {
    e.preventDefault();

    const newEducation = {
      institution: e.target.institution.value,
      degree: e.target.degree.value,
      fieldOfStudy: e.target.fieldOfStudy.value,
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
    }

    setJobSeeker((prevJobSeeker) => {
      return {
        ...prevJobSeeker,
        professionalProfile: {
          ...prevJobSeeker.professionalProfile,
          education: [...prevJobSeeker.professionalProfile.education, newEducation],
        },
      };
    });
  }

  function deleteEducation(index) {
    setJobSeeker(prevJobSeeker => {
      const newEducation = [...prevJobSeeker.professionalProfile.education];
      newEducation.splice(index, 1);
      return { ...prevJobSeeker, professionalProfile: { ...prevJobSeeker.professionalProfile, education: newEducation } };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      jobSeekersService.updateJobSeeker(
        jobSeeker._id,
        jobSeeker,
      ).then(() => {
        toast.success("Successfully updated data!");
      })
        .catch(error => {
          toast.error("Failed to update data.");
        });
    } catch (error) {
      console.error("Failed to update job seeker:", error);
    }
  }

  return (
    <div className="container rounded bg-white py-4 mt-5 mb-5 border border-1">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="row">
        <div className="col-md-2 border-right">
          <div className="d-flex flex-column align-items-center text-center p-3 py-3">
            <img className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" alt="profile pic" />
            <span className="font-weight-bold">{jobSeeker.personalInformation.name}</span>
            <span className="text-black-50">{jobSeeker.personalInformation.username}</span>
            <span> </span>
            <div className="text-center">
              <button className="btn btn-primary profile-button mt-4" form="save" type="submit">Save Profile</button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} id="save" className="row col-md-10 border-right">
          <div className="col-md-6">
            <div className="p-3 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input type="text" className="form-control" placeholder="Name" onChange={handleChange} name="name" value={jobSeeker.personalInformation.name} />
                </div>
                <div className="col-md-6">
                  <label className="labels">Age</label>
                  <input type="number" className="form-control" placeholder="Age" onChange={handleChange} name="age" value={jobSeeker.personalInformation.age} />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Username</label>
                  <input type="text" className="form-control" placeholder="Username" onChange={handleChange} name="username" value={jobSeeker.personalInformation.username} />
                </div>
                <div className="col-md-12">
                  <label className="labels">Email</label>
                  <input type="email" className="form-control" placeholder="Email" onChange={handleChange} name="email" value={jobSeeker.personalInformation.contactDetails.email} />
                </div>
                <div className="col-md-12">
                  <label className="labels">Phone Number</label>
                  <input type="tel" placeholder="Phone" onChange={handleChange} name="phone" value={jobSeeker.personalInformation.contactDetails.phone} className="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Job Preferences</h4>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Industry</label>
                  <input type="text" className="form-control" placeholder="Industry" onChange={handleChange} name="desiredIndustry" value={jobSeeker.jobPreferences.desiredIndustry} />
                </div>
                <div className="col-md-12">
                  <label className="labels">Location</label>
                  <input type="text" className="form-control" placeholder="Location" onChange={handleChange} name="location" value={jobSeeker.jobPreferences.location} />
                </div>
                <div className="col-md-12">
                  <label className="labels">Job Type</label>
                  <select name="jobType" value={jobSeeker.jobPreferences.jobType} onChange={handleChange} className="form-select">
                    <option value="">Select</option>
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Temporary">Temporary</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-3 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Skills</h4>
              </div>
              {/* <div className="d-flex justify-content-between align-items-center experience">
              <span>Experience</span>
              <span className="border px-3 p-1 add-experience">
              <i className="fa fa-plus">
              </i>&nbsp;Experience</span>
            </div> */}
              <input type="text" className="form-control" placeholder="Skill 1, Skill 2, etc." name="skills" value={jobSeeker.professionalProfile.skills.join(", ")} onChange={handleChange} />
            </div>
          </div>
        </form>

        <div className="row col-md-10 offset-md-2">
          <div className="col-md-6">
            <div className="p-3 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Education</h4>
              </div>
              <div className="col-md-12">
                <form onSubmit={addEducation} className="form" >
                  <label className="labels">Add Education</label>
                  <input type="text" className="form-control" placeholder="Institution" name="institution" />
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Degree" name="degree" />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Field of Study" name="fieldOfStudy" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Start Date" name="startDate" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="End Date" name="endDate" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                    </div>
                  </div>
                  <button className="btn btn-primary" type="submit">Add</button>
                </form>
                <ul>
                  {jobSeeker.professionalProfile.education.length > 0
                    ? jobSeeker.professionalProfile.education.map((edu, index) => (
                      <li key={index} className="card mb-2" >
                        <div className="card-body">
                          <div className="d-flex">
                            <h5 className="card-title">{edu.institution}</h5>
                            <i className="bi bi-x-lg close-icon ms-auto" onClick={() => deleteEducation(index)}></i>
                          </div>
                          <p>
                            {edu.endDate ? new Date(edu.endDate).toLocaleDateString() : new Date(edu.startDate).toLocaleDateString() + " - Present"}
                          </p>
                          <h6 className="card-subtitle mb-2 text-muted">{edu.degree}</h6>
                          <p className="card-text">{edu.fieldOfStudy}</p>
                        </div>
                      </li>
                    ))
                    : "None"}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="p-3 py-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Experience</h4>
              </div>
              <div className="col-md-12">
                <form onSubmit={addExperience} className="form" >
                  <label className="labels">Add Experience</label>
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Title" name="title" />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Company" name="company" />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Start Date" name="startDate" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                    </div>
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="End Date" name="endDate" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} />
                    </div>
                  </div>
                  <textarea type="text" className="form-control" placeholder="Description" name="description" />
                  <button className="btn btn-primary" type="submit">Add</button>
                </form>
                <ul>
                  {jobSeeker.professionalProfile.experience.length > 0
                    ? jobSeeker.professionalProfile.experience.map((exp, index) => (
                      <li key={index} className="card mb-2" >
                        <div className="card-body">
                          <div className="d-flex">
                            <h5 className="card-title">{exp.title}</h5>
                            <i className="bi bi-x-lg close-icon ms-auto" onClick={() => deleteExperience(index)}></i>
                          </div>
                          <p>
                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : new Date(exp.startDate).toLocaleDateString() + " - Present"}
                          </p>
                          <h6 className="card-subtitle mb-2 text-muted">{exp.company}</h6>
                          <p className="card-text">{exp.description}</p>
                        </div>
                      </li>
                    ))
                    : "None"}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="offset-md-4 col-md-6 p-3 py-3">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <h4 className="text-center">Application History</h4>
          </div>
          <div className="col-md-12">
            <ul className="application-history">
              {jobSeeker.applicationHistory.length > 0
                ? jobSeeker.applicationHistory.map((application) => (
                  <li key={application._id}>
                    <p>Job Title: {application.jobTitle}</p>
                    <p>Company: {application.company}</p>
                    <p>
                      Apply Date:{" "}
                      {new Date(application.applyDate).toLocaleDateString()}
                    </p>
                    <p>Status: {application.status}</p>
                  </li>
                ))
                : <p className="text-center">None</p>}
            </ul>
          </div>
        </div>

      </div>
    </div >
  );
}

export default UserProfile;
