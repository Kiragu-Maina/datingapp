import { useState } from 'react';
import './Register.css'; // External CSS file for styling
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted', formData);
  };

  const handleGoogleSignIn = async (credentialResponse) => {
    setIsLoading(true);
    try {
      const id_token = credentialResponse.credential;
      const response = await fetch('https://dating-app-kiragu-maina9939-0skprw3t.leapcell.dev/apis/dj-rest-auth/google/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: id_token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Network response was not ok: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Register</h2>

        <div className="form-group">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>

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

        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Sign Up</button>

        <div className="separator">or</div>

        <GoogleLogin
          onSuccess={handleGoogleSignIn}
          onError={() => {
            console.log('Login Failed');
          }}
          logo_alignment="left" // Add other props as needed
          type="standard" // Choose 'standard' or 'icon'
        />
      </form>

      {isLoading && (
        <div className="loading-spinner">
          <div className="spinner"></div> {/* CSS spinner */}
        </div>
      )}
    </div>
  );
};

export default Register;
