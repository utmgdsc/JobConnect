import React, { useState } from 'react';
import EmployerService from '../services/EmployerService';
import '../App.css'; // Import the new CSS styles

function EmployerProfile() {
    const [employer, setEmployer] = useState({
        company: '',
        email: '',
        password: '',
        description: '',
        category: '',
        website: '',
        phone: '',
        reviews: []
    });

    const fetchEmployer = async () => {
        try {
            const data = await EmployerService.getEmployer("65ede412ea8bb21afaffd61a");
            console.log(data);
            setEmployer(data); // Assuming data is the job seeker's information
        } catch (error) {
            console.error('Failed to fetch employer:', error);
            // Handle error (e.g., show an error message)
        }
    };

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setEmployer(prevemployer => {
            return {
                ...prevemployer,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
        // submitToApi(employer)
        console.log(employer)
    }

    // ... inside your component's return statement
    return (

        <div className="dashboard">
            <button onClick={fetchEmployer}>Get Employer</button>
            {employer && (
                <div>
                    <div className="section"></div>
                    <h3>Personal Details</h3>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Company"
                            onChange={handleChange}
                            name="company"
                            value={employer.company}
                        />
                        <input
                            type="text"
                            placeholder="Description"
                            onChange={handleChange}
                            name="description"
                            value={employer.description}
                        />
                        <input
                            type="text"
                            placeholder="Category"
                            onChange={handleChange}
                            name="category"
                            value={employer.category}
                        />
                        <p>Company: {employer.company}</p>
                        <p>Description: {employer.description}</p>
                        <p>Category: {employer.category}</p>


                        <div className="section">
                            <h3>Contact Details</h3>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={handleChange}
                                name="email"
                                value={employer.email}
                            />
                            <input
                                type="text"
                                placeholder="Website"
                                onChange={handleChange}
                                name="website"
                                value={employer.website || 'Not Provided'}
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                onChange={handleChange}
                                name="phone"
                                value={employer.phone || 'Not Provided'}
                            />
                            <p>Email: {employer.email}</p>
                            <p>Website: {employer.website}</p>
                            <p>Phone: {employer.phone || 'Not Provided'}</p>
                        </div>
                        <button>Update</button>
                    </form>

                    <div className="section">
                        <h3>Reviews</h3>
                        <div>
                            {employer.reviews.length > 0
                                ? employer.reviews.map((exp, index) => {
                                    const timestamp = exp.timestamp ? new Date(exp.timestamp).toLocaleDateString() : 'Not Provided';
                                    return (
                                        <div>
                                            <div key={index}>
                                                {exp.review}
                                                <br />
                                                Rating: {exp.rating}
                                                <br />
                                                {timestamp}
                                            </div>
                                            <br />
                                        </div>
                                    );
                                })
                                : "None"
                            }
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default EmployerProfile;
