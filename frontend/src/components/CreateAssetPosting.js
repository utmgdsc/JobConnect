import React, { useState, useEffect } from "react";
import AssetPostingsService from "../services/AssetPostingsService";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css"; // Import the new CSS styles

function CreateAssetPosting() {
    const [assetPosting, setAssetPosting] = useState({
        owner: "",
        title: "",
        assetType: "",
        location: "",
        availability: "Available",
        condition: "",
        details: {
            description: "",
        },
        price: 0,
        benefits: [],
    });
    const [benefits, setBenefits] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAssetPosting = async () => {
            try {
                const data = await AssetPostingsService.getAssetPostingById(id);
                setAssetPosting(data); // Assuming data is the asset seeker's information
                setBenefits(data.benefits.join('\n'));
            } catch (error) {
                console.error("Failed to fetch asset seeker:", error);
                // Handle error (e.g., show an error message)
            }
        };

        if (id) {
            fetchAssetPosting();
        }
    }, [id]);

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === "description") {
            setAssetPosting((prevAssetPosting) => {
                return {
                    ...prevAssetPosting,
                    details: {
                        ...prevAssetPosting.details,
                        description: value,
                    },
                };
            });
        }
        else {
            setAssetPosting((prevAssetPosting) => {
                return {
                    ...prevAssetPosting,
                    [name]: value,
                };
            });
        }
    }

    const handleBenefitsChange = (event) => {
        setBenefits(event.target.value);
    }


    const handleBlur = (event) => {
        setAssetPosting((prevAssetPosting) => {
            const { name, value } = event.target;
            if (name === 'benefits') {
                return {
                    ...prevAssetPosting,
                    benefits: benefits.split('\n').map(benefit => benefit.trim()),
                };
            }
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            let res = {}
            if (id) {
                await AssetPostingsService.updateAssetPosting(assetPosting._id, assetPosting);
            }
            else {
                res = await AssetPostingsService.createAssetPosting(assetPosting);
            }
            navigate(`/asset/${id ? id : res._id}`)
                .then(() => {
                    toast.success(`Asset successfully ${id ? "updated" : "created"}!`);
                })
                .catch(error => {
                    toast.error(`An error occurred while ${id ? "updating" : "creating"} the asset.`);
                });
        } catch (error) {
            console.error("Failed to create asset posting:", error);
        };
    }

    return (
        <section className="container rounded bg-white p-4 mt-5 mb-5 border border-1">
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
            <form onSubmit={handleSubmit} className="form">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="text-right">{id ? "Update Asset" : "Create Asset"}</h4>
                </div>
                <div className="mb-3">
                    <label className="form-label">Owner:</label>
                    <input required type="text" name="owner" value={assetPosting.owner} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Title:</label>
                    <input required type="text" name="title" value={assetPosting.title} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Asset Type:</label>
                    <input required type="text" name="assetType" value={assetPosting.assetType} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price:</label>
                    <input required type="text" name="price" value={assetPosting.price} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Location:</label>
                    <input required type="text" name="location" value={assetPosting.location} onChange={handleChange} className="form-control" />
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Availability:</label>
                        <select name="availability" value={assetPosting.availability} onChange={handleChange} className="form-select">
                            <option value="Available" selected>Available</option>
                            <option value="Unavailable">Unavailable</option>
                            <option value="Pending">Pending</option>
                        </select>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className="form-label">Condition:</label>
                        <select name="condition" value={assetPosting.condition} onChange={handleChange} className="form-select">
                            <option value="">Select</option>
                            <option value="Used">Used</option>
                            <option value="Fair">Fair</option>
                            <option value="Good">Good</option>
                            <option value="Excellent">Excellent</option>
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Description:</label>
                    <textarea name="description" value={assetPosting.details.description} onChange={handleChange} className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Benefits:</label>
                    <div className="form-text text-muted">Each item should go on a separate line.</div>
                    <textarea name="benefits" value={benefits} onChange={handleBenefitsChange} onBlur={handleBlur} className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">{id ? "Update Asset Posting" : "Create Asset Posting"}</button>
            </form>
        </section>
    );
}

export default CreateAssetPosting;
