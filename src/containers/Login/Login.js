import React, {useState} from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Handle the login process
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/login', {username, password})
            .then(response => {
                localStorage.setItem('userId', response.data);
                window.location.href = '/dashboard';
            })
            .catch(error => {
                alert('Login failed.');
                console.error(error);
            });
    };

    return (<div className="container login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
                <label>Username:</label>
                <input type="text" className="form-control" value={username}
                       onChange={(e) => setUsername(e.target.value)} required/>
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input type="password" className="form-control" value={password}
                       onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    </div>);
};

export default Login;
