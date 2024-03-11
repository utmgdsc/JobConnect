import React from 'react';
import '../job-connect.css'; // Make sure the path matches the location of your CSS file
// import images
import jobFairs from '../images/job-fairs.jpg';
import assetPostings from '../images/asset-postings.jpg';
import jobPostings from '../images/job-postings.jpg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const navigateToJobs = () => {
        navigate('/jobs');
    }

    return (
        <div className="job-connect">
            <header className="header">
                <h1>Welcome to Job Connect</h1>
                <p>Find your dream job or your next great hire</p>
            </header>
            <div className="content">
                <div className="card">
                    <img src={jobFairs} alt="Job Fairs" className="card-image"/>
                    <button className="card-button" onClick={() => {/* navigate to job fairs page */}}>Job Fairs</button>
                </div>
                <div className="card">
                    <img src={assetPostings} alt="Asset Postings" className="card-image"/>
                    <button className="card-button" onClick={() => {/* navigate to asset postings page */}}>Asset Postings</button>
                </div>
                <div className="card">
                    <img src={jobPostings} alt="Job Postings" className="card-image"/>
                    <button className="card-button" onClick={navigateToJobs}>Job Postings</button>
                </div>
            </div>
            <footer className="footer">
                <p>© 2024 Job Connect. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Home;
