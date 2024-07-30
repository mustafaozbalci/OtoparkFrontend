import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getOtoparks = () => apiClient.get('/otoparks');
export const getParkingSpaces = (otoparkId) => apiClient.get(`/parking-spaces/otopark/${otoparkId}`);
export const getReservations = (userId) => apiClient.get(`/reservations/user/${userId}`);
export const getPastReservations = (userId) => apiClient.get(`/reservations/user/${userId}/past`);
export const getUserById = (id) => apiClient.get(`/users/${id}`);
