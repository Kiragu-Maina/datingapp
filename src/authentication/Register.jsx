import { useState } from 'react';
import './Register.css'; // External CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false); // New state to handle loading

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

  const handleGoogleSignIn = async () => {
    setIsLoading(true); // Show spinner when sign-in starts
    try {
      const { gapi } = window;
      await gapi.load('client:auth2', async () => {
        const clientId =  '52680060286-i1gvc5dp0uinja76r0a8orvl1qq7e0qn.apps.googleusercontent.com'; // Replace with your Google client ID

        await gapi.auth2.init({ client_id: clientId });

        const googleUser = await gapi.auth2.getAuthInstance().signIn();
        const id_token = googleUser.getAuthResponse().id_token;

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
      });
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      alert(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false); // Hide spinner after sign-in completes
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

        <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
          <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Logo" />
          Register with Google
        </button>
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


