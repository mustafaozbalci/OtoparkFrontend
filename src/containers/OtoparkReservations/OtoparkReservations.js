import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './OtoparkReservations.css';

const OtoparkReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [ongoingReservations, setOngoingReservations] = useState([]);
    const [completedReservations, setCompletedReservations] = useState([]);
    const [userId, setUserId] = useState(localStorage.getItem('userId'));

    // Fetch reservations on component mount
    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/reservations/owner/${userId}`);
                setReservations(response.data);
                const ongoing = response.data.filter(reservation => !reservation.exitTime);
                const completed = response.data.filter(reservation => reservation.exitTime);
                setOngoingReservations(ongoing);
                setCompletedReservations(completed);
            } catch (error) {
                console.error("Error fetching reservations:", error);
            }
        };

        if (userId) {
            fetchReservations();
        }
    }, [userId]);

    return (<div className="container">
        <h2>Parking Lot Reservations</h2>

        <h3>Ongoing Reservations</h3>
        <table className="table">
            <thead>
            <tr>
                <th>User</th>
                <th>Parking Lot</th>
                <th>Parking Space</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Total Fee</th>
            </tr>
            </thead>
            <tbody>
            {ongoingReservations.map(reservation => (<tr key={reservation.reservationId}>
                <td>{reservation.username}</td>
                <td>{reservation.otoparkName}</td>
                <td>{reservation.parkingSpaceId}</td>
                <td>{reservation.entryTime}</td>
                <td>{reservation.exitTime ? reservation.exitTime : 'Ongoing'}</td>
                <td>{reservation.totalFee ? `${reservation.totalFee} $` : 'Not calculated'}</td>
            </tr>))}
            </tbody>
        </table>

        <h3>Completed Reservations</h3>
        <table className="table">
            <thead>
            <tr>
                <th>User</th>
                <th>Parking Lot</th>
                <th>Parking Space</th>
                <th>Entry Time</th>
                <th>Exit Time</th>
                <th>Total Fee</th>
            </tr>
            </thead>
            <tbody>
            {completedReservations.map(reservation => (<tr key={reservation.reservationId}>
                <td>{reservation.username}</td>
                <td>{reservation.otoparkName}</td>
                <td>{reservation.parkingSpaceId}</td>
                <td>{reservation.entryTime}</td>
                <td>{reservation.exitTime ? reservation.exitTime : 'Ongoing'}</td>
                <td>{reservation.totalFee ? `${reservation.totalFee} $` : 'Not calculated'}</td>
            </tr>))}
            </tbody>
        </table>
    </div>);
};

export default OtoparkReservations;
