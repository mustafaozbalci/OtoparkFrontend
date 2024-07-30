import React, {useState} from 'react';
import axios from 'axios';
import './AddOtopark.css';

const AddOtopark = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [capacity, setCapacity] = useState('');
    const [pricingSchedule, setPricingSchedule] = useState('');

    const handleAddOtopark = async () => {
        const ownerId = localStorage.getItem('userId');
        try {
            const response = await axios.post('http://localhost:8080/api/otoparks/add', {
                name, address, capacity, pricingSchedule, ownerId: ownerId
            });
            console.log('Otopark added:', response.data);
            alert('Otopark successfully added!');
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error adding otopark:', error);
        }
    };

    return (<div className="container">
        <h2>Add Otopark</h2>
        <div className="form-group">
            <label>Name:</label>
            <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Address:</label>
            <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Capacity:</label>
            <input
                type="number"
                className="form-control"
                placeholder="Capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label>Pricing Schedule:</label>
            <select
                className="form-control"
                value={pricingSchedule}
                onChange={(e) => setPricingSchedule(e.target.value)}
            >
                <option value="">Select a schedule</option>
                <option value="Flat Rate">Flat Rate</option>
                <option value="Hourly Rate">Hourly Rate</option>
                <option value="Peak Time Rate">Peak Time Rate</option>
            </select>
        </div>
        <button className="btn btn-primary" onClick={handleAddOtopark}>Add Otopark</button>
    </div>);
};

export default AddOtopark;
