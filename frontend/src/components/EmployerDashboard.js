
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import EmployersService from "../services/EmployerService";
import { ToastContainer, toast } from "react-toastify";
import "../edashboard.css";

function EmployerDashboard() {
    const [employer, setEmployer] = useState({
        company: "",
        email: "",
        password: "",
        description: "",
        category: "",
        website: "",
        phone: "",
        location: "",
        reviews: [
            {
                name: "",
                review: "",
                rating: 0,
            },
        ],
        jobs: [],
        assets: [],
        events: [],
    });
    const [reviews, setReviews] = useState({
        name: "",
        review: "",
        rating: 0,
    });
    const { id } = useParams();

    useEffect(() => {
        const fetchEmployer = async () => {
            try {
                const data = await EmployersService.getEmployer(id)
                setEmployer(data);
            } catch (error) {
                console.error("Failed to fetch employer:", error);
            }
        };

        if (id) {
            fetchEmployer();
        }
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setReviews((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    async function handleSubmit(event) {
        event.preventDefault();
        let r = []
        r = [...employer.reviews, reviews]
        try {
            EmployersService.updateEmployer(
                employer._id,
                { reviews: r },
            ).then(() => {
                toast.success("Successfully added data!");
            })
                .catch(error => {
                    toast.error("Failed to update data.");
                });
        } catch (error) {
            console.error("Failed to update job seeker:", error);
        }
    }

    function stars({ rating }) {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<i key={i} className="fas fa-star fa-sm text-warning"></i>);
        }
        return stars;
    }

    function leftOverStars({ rating }) {
        let stars = [];
        for (let i = 0; i < 5 - rating; i++) {
            stars.push(<i key={i} className="far fa-star fa-sm text-warning"></i>);
        }
        return stars;
    }

    console.log(employer);

    // ... inside your component's return statement
    return (
        <div className="dashboard">
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

            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"></link>
            <div className="section">
                <h3>Personal Details</h3>
                <p>Company: <strong>{employer.company}</strong></p>
            </div>

            <div className="section">
                <h3>Contact Details</h3>
                <p>Email: <a href={`mailto:${employer.email}`} style={{ color: '#59a6ff' }}>{employer.email}</a></p>
                <p>Phone: {employer.phone || "Not Provided"}</p>
                <p>Location: {employer.location}</p>
                <p>Category: {employer.category}</p>
                <p>Website: {employer.website}</p>
            </div>

            <section className="section">
                <div className="p-3 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="text-right">Reviews</h4>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit} className="form row">
                            <div className="col-md-9">
                                <textarea required type="text" className="form-control" placeholder="Review" name="review" onChange={handleChange} style={{ minHeight: '88px' }} />
                            </div>
                            <div className="col-md-3">
                                <input required type="number" className="form-control" placeholder="# of Stars" name="rating" onChange={handleChange} />
                                <input type="input" className="form-control" placeholder="Name" name="name" onChange={handleChange} />
                            </div>
                            <button className="btn btn-primary mt-2" type="submit">Add Review</button>
                        </form>
                        <ul>
                            {employer.reviews.length > 0
                                ? employer.reviews.map((r, index) => (
                                    <li key={index} className="row card mb-2 pb-2" >
                                        <div className="col-md-12 d-flex">
                                            <blockquote className="blockquote d-flex flex-col mb-0">
                                                <span className="icon fa fa-quote-left mt-2 me-2"></span>
                                                <p className="pt-2">
                                                    {r.review}
                                                </p>
                                            </blockquote>
                                            {/* <p className="lead">{r.review}</p> */}
                                            <div className="ms-auto pt-2">
                                                {stars(r)}
                                                {leftOverStars(r)}
                                            </div>
                                        </div>
                                        {r.name && <p className="fw-bold text-muted mb-0">- {r.name}</p>}
                                    </li>
                                ))
                                : <h3 className="text-center">None</h3>}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EmployerDashboard;
