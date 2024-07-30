import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Register from './containers/Register/Register';
import Login from './containers/Login/Login';
import Dashboard from './containers/Dashboard/Dashboard';
import Home from './containers/Home/Home';
import AddOtopark from "./containers/AddOtopark/AddOtopark";
import OtoparkReservations from './containers/OtoparkReservations/OtoparkReservations';
import MyOtoparks from "./containers/MyOtoparks/MyOtoparks";

function App() {
    return (<Router>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/add-otopark" element={<AddOtopark/>}/>
            <Route path="/otopark-reservations" element={<OtoparkReservations/>}/>
            <Route path="/my-otoparks" element={<MyOtoparks/>}/>
        </Routes>
    </Router>);
}

export default App;
