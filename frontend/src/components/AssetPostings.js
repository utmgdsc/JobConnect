import React, { useState, useEffect } from "react";
import AssetPostingsService from "../services/AssetPostingsService";
import { useNavigate } from "react-router-dom";

const AssetPostings = () => {
  const [assetPostings, setAssetPostings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedAssetId, setExpandedAssetId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAssetPostings();
  }, []); // Removed dependency on `assetPostings` to prevent infinite loop

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

  const toggleExpandAsset = (id) => {
    setExpandedAssetId(expandedAssetId === id ? null : id);
  };

  const navigateToApplication = (assetId, event) => {
    navigate(`/apply-asset/${assetId}`);
  };

  const filteredAssetPostings = assetPostings.filter((posting) => {
    return posting.assetType.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="assets-page container p-5">
      <h1>Asset Postings</h1>
      <input
        type="text"
        placeholder="Search assets..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="asset-listings">
        {filteredAssetPostings.map((posting) => (
          <div
            key={posting._id}
            className="asset-posting"
            onClick={() => toggleExpandAsset(posting._id)}
          >
            <div className="asset-title-container">
              <h3>{posting.title}</h3>
              <span
                className={`arrow-icon ${expandedAssetId === posting._id ? "expanded" : ""}`}
              >
                &#9660;
              </span>
            </div>
            <p>Location: {posting.location}</p>
            <p>Type: {posting.assetType}</p>
            {posting.condition && <p>Condition: {posting.condition}</p>}
            {expandedAssetId === posting._id && (
              <div className="asset-details">
                <p>Description: {posting.details.description}</p>
                {/* Add more details as needed */}
              </div>
            )}
           <button className="apply-button" onClick={() => navigateToApplication(posting._id)}>
  Details
</button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetPostings;
