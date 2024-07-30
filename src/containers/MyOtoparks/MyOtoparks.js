import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './MyOtoparks.css';

const MyOtoparks = () => {
    const [otoparks, setOtoparks] = useState([]);
    const [selectedOtopark, setSelectedOtopark] = useState(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedAddress, setUpdatedAddress] = useState('');
    const [updatedCapacity, setUpdatedCapacity] = useState('');
    const [updatedPricingSchedule, setUpdatedPricingSchedule] = useState('');

    useEffect(() => {
        const fetchOtoparks = async () => {
            const ownerId = localStorage.getItem('userId');
            try {
                const response = await axios.get(`http://localhost:8080/api/otoparks/owner/${ownerId}`);
                setOtoparks(response.data);
            } catch (error) {
                console.error('Error fetching otoparks:', error);
            }
        };

        fetchOtoparks();
    }, []);

    const handleUpdateOtopark = async (otoparkId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/otoparks/update/${otoparkId}`, {
                name: updatedName,
                address: updatedAddress,
                capacity: updatedCapacity,
                pricingSchedule: updatedPricingSchedule,
            });
            console.log('Otopark updated:', response.data);
            alert('Otopark successfully updated!');
            window.location.reload();
        } catch (error) {
            console.error('Error updating otopark:', error);
        }
    };

    const selectOtopark = (otopark) => {
        setSelectedOtopark(otopark);
        setUpdatedName(otopark.name);
        setUpdatedAddress(otopark.address);
        setUpdatedCapacity(otopark.capacity);
        setUpdatedPricingSchedule(otopark.pricingSchedule);
    };

    return (<div className="container">
        <h2>My Otoparks</h2>
        <ul className="otopark-list">
            {otoparks.map(otopark => (<li key={otopark.otoparkId} onClick={() => selectOtopark(otopark)}>
                {otopark.name}
            </li>))}
        </ul>
        {selectedOtopark && (<div className="update-form">
            <h3>Update Otopark</h3>
            <div className="form-group">
                <label>Name:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Address:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={updatedAddress}
                    onChange={(e) => setUpdatedAddress(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Capacity:</label>
                <input
                    type="number"
                    className="form-control"
                    placeholder="Capacity"
                    value={updatedCapacity}
                    onChange={(e) => setUpdatedCapacity(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Pricing Schedule:</label>
                <select
                    className="form-control"
                    value={updatedPricingSchedule}
                    onChange={(e) => setUpdatedPricingSchedule(e.target.value)}
                >
                    <option value="">Select a schedule</option>
                    <option value="Flat Rate">Flat Rate</option>
                    <option value="Hourly Rate">Hourly Rate</option>
                    <option value="Peak Time Rate">Peak Time Rate</option>
                </select>
            </div>
            <button className="btn btn-primary"
                    onClick={() => handleUpdateOtopark(selectedOtopark.otoparkId)}>Update
            </button>
        </div>)}
    </div>);
};

export default MyOtoparks;
