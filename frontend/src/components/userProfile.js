import React, { useState } from 'react';
import jobSeekersService from '../services/jobSeekersService';
import '../App.css'; // Import the new CSS styles

function JobSeekerFetcher() {
    const [jobSeeker, setJobSeeker] = useState(null);

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

    // ... inside your component's return statement
    return (

        <div className="dashboard">
            <button onClick={fetchJobSeeker}>Get Job Seeker</button>
            {jobSeeker && (
                <div>
                    <div className="section"></div>
                    <h3>Personal Details</h3>
                    <p>Name: {jobSeeker.personalInformation.name}</p>
                    <p>Age: {jobSeeker.personalInformation.age}</p>
                    <p>Username: {jobSeeker.personalInformation.username}</p>


                    <div className="section">
                        <h3>Contact Details</h3>
                        <p>Email: {jobSeeker.personalInformation.contactDetails.email}</p>
                        <p>Phone: {jobSeeker.personalInformation.contactDetails.phone || 'Not Provided'}</p>
                    </div>

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
                        <h3>Job Preferences</h3>
                        <p>Desired Industry: {jobSeeker.jobPreferences.desiredIndustry}</p>
                        <p>Location: {jobSeeker.jobPreferences.location}</p>
                        <p>Job Type: {jobSeeker.jobPreferences.jobType}</p>
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
            )}
        </div>
    );
}

export default JobSeekerFetcher;
