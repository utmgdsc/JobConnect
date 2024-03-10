import React, { useState } from 'react';
import EmployerService from '../services/EmployerService';
import '../App.css'; // Import the new CSS styles

function EmployerProfile() {
    const [employer, setEmployer] = useState(null);

    const fetchEmployer = async () => {
        try {
            const data = await EmployerService.getJobSeeker("65dc12c24726f1cd09a9dd2a");
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
            <button onClick={fetchEmployer}>Get Job Seeker</button>
            {jobSeeker && (
                <div>
                    <div className="section"></div>
                    <h3>Personal Details</h3>
                    <p>Company: {employer.company}</p>
                    <p>Description: {employer.email}</p>
                    <p>Category: {employer.category}</p>


                    <div className="section">
                        <h3>Contact Details</h3>
                        <p>Email: {employer.email}</p>
                        <p>Website: {employer.website}</p>
                        <p>Phone: {employer.phone || 'Not Provided'}</p>
                    </div>

                    <div className="section">
                        <h3>Reviews</h3>
                        <p>{
                            employer.reviews.length > 0
                                ? employer.reviews
                                    .map(exp => {
                                        const timestamp = exp.timestamp ? new Date(exp.timestamp).toLocaleDateString() : 'Not Provided';
                                        return `${exp.rating} at ${timestamp} \n ${exp.review}`;
                                    }).join('; ')
                                : "None"
                        }</p>
                    </div>

                </div>
            )}
        </div>
    );
}

export default EmployerProfile;
