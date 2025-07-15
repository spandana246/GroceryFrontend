import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:5104/Auth/login', {
        username,
        password,
      });
      localStorage.setItem('username', username);
      navigate('/');
    } catch (error) {
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <h2>Login</h2>
        <input
          className="form-input"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
