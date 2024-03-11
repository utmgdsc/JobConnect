import React, { useState, useEffect } from 'react';
import AssetPostingsService from '../services/AssetPostingsService';

const AssetPostings = () => {
    const [assetPostings, setAssetPostings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAssetPostings();
    }, []);

    const fetchAssetPostings = async () => {
        try {
            const data = await AssetPostingsService.getAssets();
            setAssetPostings(data);
        } catch (error) {
            console.error('Error fetching asset postings:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAssetPostings = assetPostings.filter(posting => {
        return posting.assetType.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="assets-page">
            <h1>Asset Postings</h1>
            <input type="text" placeholder="Search assets..." value={searchTerm} onChange={handleSearchChange} />
            <div className="asset-listings">
                {filteredAssetPostings.map(posting => (
                    <div key={posting._id} className="asset-posting">
                        <h3>{posting.assetName}</h3>
                        <p>Location: {posting.location}</p>
                        <p>Type: {posting.assetType}</p>
                        {/* Render more details about the asset here */}
                        <div className="asset-details">
                            <p>Description: {posting.details.description}</p>
                            {/* Add more details as needed */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AssetPostings;
