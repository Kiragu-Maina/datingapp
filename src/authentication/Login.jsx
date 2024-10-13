import { useState } from 'react';
import './Login.css'; // External CSS file for styling

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission logic here
    console.log('Login Form Submitted', formData);
  };

  const handleGoogleSignIn = () => {
    // Handle Google Sign-In logic here
    console.log('Login with Google');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login</h2>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>

        <div className="separator">or</div>

        <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" />
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
