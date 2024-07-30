import React, {useState} from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [vehiclePlate, setVehiclePlate] = useState('');
    const [isOwner, setIsOwner] = useState(false);
    const [errors, setErrors] = useState({});

    const handleRegister = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const user = {
            username, password, email, firstName, lastName, vehiclePlate, isOwner
        };

        axios.post('http://localhost:8080/api/users/register', user)
            .then(response => {
                alert('Kayıt başarılı!');
                window.location.href = '/login';
            })
            .catch(error => {
                if (error.response) {
                    alert('Kayıt işlemi başarısız: ' + error.response.data);
                    console.error(error.response.data);
                } else if (error.request) {
                    alert('Sunucuya ulaşılamadı, lütfen bağlantınızı kontrol edin.');
                    console.error(error.request);
                } else {
                    alert('Bir hata oluştu: ' + error.message);
                    console.error('Error', error.message);
                }
            });
    };

    const validateForm = () => {
        const errors = {};
        const plateRegex = /^\d{2}\s[A-Z]{1,3}\s\d{2,3}$/;

        if (!plateRegex.test(vehiclePlate)) {
            errors.vehiclePlate = 'Geçerli bir plaka formatı giriniz: 42 AAA 422';
        }

        return errors;
    };

    return (<div className="container">
        <h2>Kayıt Ol</h2>
        <form onSubmit={handleRegister}>
            <div className="form-group">
                <label>Kullanıcı Adı:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Kullanıcı Adı"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Şifre:</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Ad:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Ad"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Soyad:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Soyad"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Araç Plakası:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="42 AAA 422"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    required
                />
                {errors.vehiclePlate && <div className="error">{errors.vehiclePlate}</div>}
            </div>
            <div className="form-group">
                <label>Otopark Sahibi misiniz?</label>
                <input
                    type="checkbox"
                    checked={isOwner}
                    onChange={(e) => setIsOwner(e.target.checked)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Kayıt Ol</button>
        </form>
    </div>);
};

export default Register;
