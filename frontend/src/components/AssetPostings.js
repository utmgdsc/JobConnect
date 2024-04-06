import React, { useState, useEffect } from "react";
import AssetPostingsService from "../services/AssetPostingsService";
import "../jobs.css"; // Assuming you want to use the same CSS file
import { useNavigate, Link } from "react-router-dom";

const AssetPostings = () => {
  const [assetPostings, setAssetPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchAssetPostings();
  }, []);

  const fetchAssetPostings = async () => {
    try {
      const data = await AssetPostingsService.getAllAssetPostings();
      setAssetPostings(data);
    } catch (error) {
      console.error("Error fetching asset postings:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const navigateToApplication = (assetId, event) => {
    event.stopPropagation(); // Stop the event from bubbling up to the div
    navigate(`/apply-asset/${assetId}`);
  };

  const filteredAssetPostings = assetPostings.filter((posting) => {
    return posting.assetType.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="assets-container container">
      <div className="search-and-filter mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary btn-variant-1" type="button">
              Search
            </button>
          </div>
        </div>
      </div>
      {localStorage.getItem("type") === "employer" &&
        <div className="row">
          <div className="col">
            <Link to="/create/asset" className="btn btn-primary mb-3 w-100">
              Add asset
            </Link>
          </div>
        </div>
      }
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {filteredAssetPostings.map((posting) => (
          <div
            key={posting._id}
            className="col"
          >
            <div className="card h-100 mb-3">
              <div className="card-header">
                <h3>{posting.title}</h3>
              </div>
              <div className="card-body">
                <p>Location: {posting.location}</p>
                <p>Type: {posting.assetType}</p>
                {posting.condition && <p>Condition: {posting.condition}</p>}
                <p>Description: {posting.details.description}</p>
                {/* Add more details as needed */}
              </div>
              <div className="card-footer">
                <button className="btn btn-primary" onClick={(e) => navigateToApplication(posting._id, e)}>
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetPostings;