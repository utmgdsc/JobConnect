import React, { useState } from 'react';
import jobSeekersService from '../services/jobSeekersService';
import '../App.css'; // Import the new CSS styles

function UserProfile() {
    const [jobSeeker, setJobSeeker] = useState({
        personalInformation: {
            name: '',
            age: '',
            username: '',
            contactDetails: {
                email: '',
                phone: ''
            }
        },
        professionalProfile: {
            skills: [],
            experience: [],
            education: []
        },
        jobPreferences: {
            desiredIndustry: '',
            location: '',
            jobType: ''
        },
        applicationHistory: []
    });

    const [updateStatus, setUpdateStatus] = useState('');

    const fetchJobSeeker = async () => {
        try {
            const data = await jobSeekersService.getJobSeeker("65dc12c24726f1cd09a9dd2a");
            console.log(data);
            setJobSeeker(data); // Assuming data is the job seeker's information
        } catch (error) {
            console.error('Failed to fetch job seeker:', error);
            // Handle error (e.g., show an error message)
        }
    };

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setJobSeeker(prevJobSeeker => {
            if (name in prevJobSeeker.personalInformation) {
                return {
                    ...prevJobSeeker,
                    personalInformation: {
                        ...prevJobSeeker.personalInformation,
                        [name]: value
                    }
                };
            } else if (name in prevJobSeeker.personalInformation.contactDetails) {
                return {
                    ...prevJobSeeker,
                    personalInformation: {
                        ...prevJobSeeker.personalInformation,
                        contactDetails: {
                            ...prevJobSeeker.personalInformation.contactDetails,
                            [name]: value
                        }
                    }
                };
            } else if (name in prevJobSeeker.jobPreferences) {
                return {
                    ...prevJobSeeker,
                    jobPreferences: {
                        ...prevJobSeeker.jobPreferences,
                        [name]: value
                    }
                };
            } else {
                return prevJobSeeker;
            }
        });
    }

    async function handleSubmit(event) {
        event.preventDefault()
        try {
            const data = await jobSeekersService.updateJobSeeker(jobSeeker._id, jobSeeker)
            setUpdateStatus('Successfully updated data');
        }
        catch (error) {
            console.error('Failed to update job seeker:', error);
            setUpdateStatus('Failed to update data');
        }
    }

    return (
        <header className="App-header">
            <div className="dashboard">
                <button onClick={fetchJobSeeker}>Get Job Seeker</button>
                {jobSeeker && (
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="section">
                                <h3>Personal Details</h3>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    onChange={handleChange}
                                    name="name"
                                    value={jobSeeker.personalInformation.name}
                                />
                                <input
                                    type="number"
                                    placeholder="Age"
                                    onChange={handleChange}
                                    name="age"
                                    value={jobSeeker.personalInformation.age}
                                />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    name="username"
                                    value={jobSeeker.personalInformation.username}
                                />
                            </div>

                            <div className="section">
                                <h3>Contact Details</h3>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                    name="email"
                                    value={jobSeeker.personalInformation.contactDetails.email}
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone"
                                    onChange={handleChange}
                                    name="phone"
                                    value={jobSeeker.personalInformation.contactDetails.phone}
                                />
                            </div>

                            <div className="section">
                                <h3>Job Preferences</h3>
                                <input
                                    type="text"
                                    placeholder="Desired Industry"
                                    onChange={handleChange}
                                    name="desiredIndustry"
                                    value={jobSeeker.jobPreferences.desiredIndustry}
                                />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    onChange={handleChange}
                                    name="location"
                                    value={jobSeeker.jobPreferences.location}
                                />
                                <input
                                    type="text"
                                    placeholder="Job Type"
                                    onChange={handleChange}
                                    name="jobType"
                                    value={jobSeeker.jobPreferences.jobType}
                                />
                            </div>
                            <button>Save</button>
                        </form>

                        {updateStatus && (
                            <div style={{ color: updateStatus.startsWith('Successfully') ? 'green' : 'red' }}>
                                {updateStatus}
                            </div>
                        )}

                        <div className="section">
                            <h3>Professional Profile</h3>
                            <p>Skills: {jobSeeker.professionalProfile.skills.join(', ')}</p>
                            <p>Experience: {
                                jobSeeker.professionalProfile.experience.length > 0
                                    ? jobSeeker.professionalProfile.experience
                                        .map(exp => {
                                            const startDate = exp.startDate ? new Date(exp.startDate).toLocaleDateString() : 'Not Provided';
                                            return `${exp.title} at ${exp.company}, from ${startDate}, ${exp.description}`;
                                        }).join('; ')
                                    : "None"
                            }</p>
                            <p>Experience: {
                                jobSeeker.professionalProfile.education.length > 0
                                    ? jobSeeker.professionalProfile.education
                                        .map(edu => {
                                            const startDate = edu.startDate ? new Date(edu.startDate).toLocaleDateString() : 'Not Provided';
                                            return `${edu.fieldOfStudy} at ${edu.institution}, from ${edu.startDate}, ${edu.endDate}`;
                                        }).join('; ')
                                    : "None"
                            }</p>
                        </div>


                        <div className="section">
                            <h3>Application History</h3>
                            <ul className="application-history">
                                {jobSeeker.applicationHistory.length > 0 ? jobSeeker.applicationHistory.map(application => (
                                    <li key={application._id}>
                                        <p>Job Title: {application.jobTitle}</p>
                                        <p>Company: {application.company}</p>
                                        <p>Apply Date: {new Date(application.applyDate).toLocaleDateString()}</p>
                                        <p>Status: {application.status}</p>
                                    </li>
                                )) : "None"}
                            </ul>
                        </div>
                    </div>
                )
                }
            </div >
        </header>
    );
}

export default UserProfile;
