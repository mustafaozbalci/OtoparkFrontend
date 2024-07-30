import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [otoparks, setOtoparks] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [pastReservations, setPastReservations] = useState([]);
    const [selectedOtoparkId, setSelectedOtoparkId] = useState('');
    const [parkingSpaces, setParkingSpaces] = useState([]);
    const [selectedParkingSpaceId, setSelectedParkingSpaceId] = useState('');
    const [availableSpaces, setAvailableSpaces] = useState(0);

    // Fetch user data on component mount
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId) {
            axios.get(`http://localhost:8080/api/users/${userId}`)
                .then(response => {
                    setUser(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    // Fetch all parking lots
    const fetchOtoparks = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/otoparks');
            setOtoparks(response.data);
        } catch (error) {
            console.error("Error loading parking lots:", error);
        }
    };

    // Fetch user's active reservations
    const fetchReservations = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.get(`http://localhost:8080/api/reservations/user/${userId}`);
            setReservations(response.data);
        } catch (error) {
            console.error("Error loading reservations:", error);
        }
    };

    // Fetch user's past reservations
    const fetchPastReservations = async () => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await axios.get(`http://localhost:8080/api/reservations/user/${userId}/past`);
            setPastReservations(response.data);
        } catch (error) {
            console.error("Error loading past reservations:", error);
        }
    };

    // Fetch available parking spaces for a specific parking lot
    const fetchParkingSpaces = async (otoparkId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/parking-spaces/otopark/${otoparkId}`);
            const availableSpaces = response.data.filter(space => space.available);
            setParkingSpaces(availableSpaces);
            setAvailableSpaces(availableSpaces.length);
        } catch (error) {
            console.error("Error loading parking spaces:", error);
        }
    };

    // Fetch all necessary data
    const fetchData = async () => {
        await fetchOtoparks();
        await fetchReservations();
        await fetchPastReservations();
        if (selectedOtoparkId) {
            await fetchParkingSpaces(selectedOtoparkId);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedOtoparkId, selectedParkingSpaceId]);

    // Handle change of selected parking lot
    const handleOtoparkChange = (e) => {
        const otoparkId = e.target.value;
        setSelectedOtoparkId(otoparkId);
        setSelectedParkingSpaceId('');
        fetchData();
    };

    // Handle change of selected parking space
    const handleParkingSpaceChange = (e) => {
        setSelectedParkingSpaceId(e.target.value);
        fetchData();
    };

    // Get current local ISO string
    const getLocalISOString = () => {
        const tzOffset = (new Date()).getTimezoneOffset() * 60000; // offset in milliseconds
        const localISOTime = (new Date(Date.now() - tzOffset)).toISOString().slice(0, 16); // Remove seconds and milliseconds
        return localISOTime;
    };

    // Handle making a reservation
    const handleReservation = async () => {
        if (selectedOtoparkId && selectedParkingSpaceId) {
            try {
                const userId = localStorage.getItem('userId');
                const entryTime = getLocalISOString();
                const response = await axios.post('http://localhost:8080/api/reservations', {
                    otoparkId: selectedOtoparkId,
                    parkingSpaceId: selectedParkingSpaceId,
                    userId: userId,
                    entryTime: entryTime
                });
                console.log('Reservation made:', response.data);
                fetchData(); // Update data
            } catch (error) {
                console.error('Error making reservation:', error);
            }
        }
    };

    // Handle ending a reservation
    const endReservation = async (reservationId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/reservations/end/${reservationId}`);
            console.log('Reservation ended:', response.data);
            fetchData(); // Update data
        } catch (error) {
            console.error('Error ending reservation:', error);
        }
    };

    return (<div className="container">
        <h2>Dashboard</h2>
        {user && (<div className="user-info">
            <h4>User Information</h4>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Vehicle Plate:</strong> {user.vehiclePlate}</p>
            {user.isOwner && (<div>
                <Link to="/add-otopark" className="btn btn-success">Add Parking Lot</Link>
                <Link to="/my-otoparks" className="btn btn-primary">My Parking Lots</Link>
                <Link to="/otopark-reservations" className="btn btn-primary">Parking Lot Reservations</Link>
            </div>)}
        </div>)}
        <div className="form-group">
            <label>Select Parking Lot:</label>
            <select className="form-control" value={selectedOtoparkId} onChange={handleOtoparkChange}>
                <option value="">Select</option>
                {otoparks.map(otopark => (<option key={otopark.otoparkId} value={otopark.otoparkId}>
                    {otopark.name ? otopark.name : 'No Name'} (Available: {otopark.availableSpaces ? otopark.availableSpaces.length : 0})
                </option>))}
            </select>
        </div>
        <div className="form-group">
            <label>Select Parking Space:</label>
            <select className="form-control" value={selectedParkingSpaceId} onChange={handleParkingSpaceChange}
                    disabled={!selectedOtoparkId}>
                <option value="">Select</option>
                {parkingSpaces.map(parkingSpace => (<option key={parkingSpace.id} value={parkingSpace.id}>Parking
                    Space {parkingSpace.id}</option>))}
            </select>
        </div>
        <button className="btn btn-primary" onClick={handleReservation} disabled={!selectedParkingSpaceId}>Make
            Reservation
        </button>

        <h3>Your Reservations</h3>
        <ul>
            {reservations.map(reservation => (<li key={reservation.reservationId}>
                Parking Lot: {reservation.otoparkName ? reservation.otoparkName : 'Unknown'}, Parking
                Space: {reservation.parkingSpaceId}, Entry Time: {reservation.entryTime}
                <button className="btn btn-danger" onClick={() => endReservation(reservation.reservationId)}>End
                    Reservation
                </button>
            </li>))}
        </ul>

        <h3>Past Reservations</h3>
        <ul>
            {pastReservations.map(reservation => (<li key={reservation.reservationId}>
                Parking Lot: {reservation.otoparkName ? reservation.otoparkName : 'Unknown'}, Parking
                Space: {reservation.parkingSpaceId}, Entry Time: {reservation.entryTime}, Exit
                Time: {reservation.exitTime}, Total Fee: {reservation.totalFee}
            </li>))}
        </ul>
    </div>);
};

export default Dashboard;
