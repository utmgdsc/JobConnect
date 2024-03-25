import React, { useState, useEffect } from "react";
import AssetPostingService from "../services/AssetPostingsService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css"; // Import the new CSS styles

function AssetDetails() {
    const [asset, setAsset] = useState({
        owner: "",
        title: "",
        assetType: "",
        location: "",
        availability: "Available",
        details: {
            description: "",
        },
        price: 0,
        benefits: [],
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAsset = async () => {
            try {
                const data = await AssetPostingService.getAssetPostingById(id);
                setAsset(data); // Assuming data is the asset seeker's information
            } catch (error) {
                console.error("Failed to fetch asset details:", error);
                // Handle error (e.g., show an error message)
            }
        };

        if (id) {
            fetchAsset();
        }
    }, [id]);

    return (
        <div className="container rounded bg-white px-4 mt-5 mb-5 border border-1">
            <div className="row col-md-12">
                <div className="mb-3 px-4 pt-4">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                        <h1 className="text-right">{asset.title}</h1>
                    </div>
                    <div className="d-flex">
                        {asset.owner &&
                            <h3>{asset.owner}</h3>
                        }
                        {asset.location &&
                            <h5 className="ms-auto">{asset.location}</h5>
                        }
                    </div>
                    <div className="d-flex">
                        <h5>{asset.assetType}</h5>
                        {asset.condition && <h5 className="ms-auto">{asset.condition}</h5>}
                    </div>
                    {asset.price && asset.price > 0 &&
                        <h5>${asset.price}</h5>
                    }
                </div>
                <div className="mb-1 px-4">
                    <h4>Description</h4>
                    <p>{asset.details.description}</p>
                </div>
                {asset.benefits.length > 0 && (
                    <div className="mb-1 px-4">
                        <h4>Benefits:</h4>
                        <ul className="mb-3">
                            {asset.benefits.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="px-4">
                    <button
                        className="btn btn-primary btn-md"
                        onClick={() => navigate(`/application/`)}
                    >
                        Contact
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AssetDetails;
