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

  const handleGoogleSignIn = async () => {
    try {
      // Load the Google auth library
      const { gapi } = window;
      await gapi.load('client:auth2', async () => {
        await gapi.auth2.init({
          client_id: '52680060286-i1gvc5dp0uinja76r0a8orvl1qq7e0qn.apps.googleusercontent.com', // Replace with your Google client ID
        });

        // Sign in with Google
        const googleUser = await gapi.auth2.getAuthInstance().signIn();
        const id_token = googleUser.getAuthResponse().id_token;

        // Send the ID token to your backend for verification
        const response = await fetch('https://dating-app-kiragu-maina9939-0skprw3t.leapcell.dev/apis/dj-rest-auth/google/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: id_token }), // Send the token
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Response from server:', data);
        // Handle successful login, e.g., redirect to homepage or store user data
      });
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
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
