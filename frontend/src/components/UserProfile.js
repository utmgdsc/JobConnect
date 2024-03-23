import React, { useState, useEffect } from "react";
import jobSeekersService from "../services/jobSeekersService";
import { useParams } from "react-router-dom"; // Import useParams
import { toast } from "react-toastify";
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

  const fetchJobSeeker = async () => {
    try {
      const data = await jobSeekersService.getJobSeeker(id);
      console.log(data);
      setJobSeeker(data); // Assuming data is the job seeker's information
    } catch (error) {
      console.error("Failed to fetch job seeker:", error);
      // Handle error (e.g., show an error message)
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobSeeker();
    }
  }, [id, fetchJobSeeker]);

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
        return {
          ...prevJobSeeker,
          personalInformation: {
            ...prevJobSeeker.personalInformation,
            [name]: value,
          },
        };
      } else if (name in prevJobSeeker.personalInformation.contactDetails) {
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
      } else if (name in prevJobSeeker.jobPreferences) {
        return {
          ...prevJobSeeker,
          jobPreferences: {
            ...prevJobSeeker.jobPreferences,
            [name]: value,
          },
        };
      } else {
        return prevJobSeeker;
      }
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
    <div class="container rounded bg-white py-4 mt-5 mb-5 border border-1">
      <form onSubmit={handleSubmit} className="row">
        <div class="col-md-2 border-right">
          <div class="d-flex flex-column align-items-center text-center p-3 py-3">
            <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" />
            <span class="font-weight-bold">{jobSeeker.personalInformation.name}</span>
            <span class="text-black-50">{jobSeeker.personalInformation.email}</span>
            <span> </span>
          </div>
        </div>
        <div class="col-md-5 border-right">
          <div class="p-3 py-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Profile Settings</h4>
            </div>
            <div class="row mt-2">
              <div class="col-md-6">
                <label class="labels">Name</label>
                <input type="text" className="form-control" placeholder="Name" onChange={handleChange} name="name" value={jobSeeker.personalInformation.name} />
              </div>
              <div class="col-md-6">
                <label class="labels">Age</label>
                <input type="number" className="form-control" placeholder="Age" onChange={handleChange} name="age" value={jobSeeker.personalInformation.age} />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Username</label>
                <input type="text" className="form-control" placeholder="Username" onChange={handleChange} name="username" value={jobSeeker.personalInformation.username} />
              </div>
              <div class="col-md-12">
                <label class="labels">Email</label>
                <input type="email" className="form-control" placeholder="Email" onChange={handleChange} name="email" value={jobSeeker.personalInformation.contactDetails.email} />
              </div>
              <div class="col-md-12">
                <label class="labels">Phone Number</label>
                <input type="tel" placeholder="Phone" onChange={handleChange} name="phone" value={jobSeeker.personalInformation.contactDetails.phone} className="form-control" />
              </div>
            </div>
          </div>
          <div class="p-3 py-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Job Preferences</h4>
            </div>
            <div class="row mt-3">
              <div class="col-md-12">
                <label class="labels">Industry</label>
                <input type="text" className="form-control" placeholder="Industry" onChange={handleChange} name="industry" value={jobSeeker.personalInformation.industry} />
              </div>
              <div class="col-md-12">
                <label class="labels">Location</label>
                <input type="text" className="form-control" placeholder="Location" onChange={handleChange} name="location" value={jobSeeker.personalInformation.location} />
              </div>
              <div class="col-md-12">
                <label class="labels">Job Type</label>
                <select name="jobType" value={jobSeeker.personalInformation.jobType} onChange={handleChange} className="form-select">
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
        </div>
        <div class="col-md-5">
          <div class="p-3 py-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Skills</h4>
            </div>
            {/* <div class="d-flex justify-content-between align-items-center experience">
              <span>Experience</span>
              <span class="border px-3 p-1 add-experience">
                <i class="fa fa-plus">
                </i>&nbsp;Experience</span>
            </div> */}
            <label class="labels">Skills</label>
            <input type="text" class="form-control" placeholder="Enter skills" value={jobSeeker.professionalProfile.skills.join(", ")} onChange={handleChange} />
          </div>
          <div class="p-3 py-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Education</h4>
            </div>
            <div class="col-md-12">
              <label class="labels">Education</label>
              <input type="text" class="form-control" placeholder="experience" value="" />
              <p>
                {jobSeeker.professionalProfile.education.length > 0
                  ? jobSeeker.professionalProfile.education
                    .map((edu) => {
                      const startDate = edu.startDate
                        ? new Date(edu.startDate).toLocaleDateString()
                        : "Not Provided";
                      return `${edu.fieldOfStudy} at ${edu.institution}, from ${edu.startDate}, ${edu.endDate}`;
                    })
                    .join("; ")
                  : "None"}
              </p>
            </div>
          </div>
          <div class="p-3 py-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="text-right">Education</h4>
            </div>
            <div class="col-md-12">
              <label class="labels">Additional Experience</label>
              <input type="text" class="form-control" placeholder="additional details" value="" />
              <ul>
                {jobSeeker.professionalProfile.experience.length > 0
                  ? jobSeeker.professionalProfile.experience.map((exp, index) => (
                    <li key={index} class="card" >
                      <div class="card-body">
                        <div className="row">
                          <h5 class="card-title mr-auto">{exp.title}</h5>
                          <p className="text-right">
                            {exp.startDate ? new Date(exp.startDate).toLocaleDateString() : "Not Provided"}
                          </p>
                        </div>
                        <h6 class="card-subtitle mb-2 text-muted">{exp.company}</h6>
                        <p class="card-text">{exp.description}</p>
                      </div>
                    </li>
                  ))
                  : "None"}
              </ul>
            </div>
          </div>
        </div>

        <div class="offset-md-2 col-md-8 p-3 py-3">
          <div class="d-flex justify-content-center align-items-center mb-3">
            <h4 class="text-center">Application History</h4>
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
                : "None"}
            </ul>
          </div>
        </div>
        <div class="mt-5 text-center">
          <button class="btn btn-primary profile-button" type="button">Update Profile</button>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
