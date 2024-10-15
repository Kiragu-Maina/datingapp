    import { useState } from 'react';
    import './Register.css'; // External CSS file for styling
    // import { GoogleLogin } from '@react-oauth/google';
    import Modal from 'react-modal';

    const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [authUrl, setAuthUrl] = useState('');

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
        try {
          // Call your backend to get the authorization URL
          const response = await fetch('https://expressjs-app-sso-kiragu-maina9939-mjoqa3jr.leapcell.dev/google-auth/url', {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.ok) {
            const { url } = await response.json(); // Assuming your backend returns the URL in a JSON object
            setAuthUrl(url); // Set the authorization URL in state
            setModalIsOpen(true); // Open the modal
          } else {
            console.error('Failed to retrieve Google authorization URL');
          }
        } catch (error) {
          console.error('Error during Google sign-in:', error);
        }
      };
    
      const handleModalClose = () => {
        setModalIsOpen(false);
        window.location.href = authUrl; // Redirect the user to the Google consent page when closing the modal
      };
    // https://expressjs-app-sso-kiragu-maina9939-mjoqa3jr.leapcell.dev/google-auth/
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

            <button onClick={handleGoogleSignIn}>Sign in with Google</button>

      {/* Modal for displaying the authorization URL */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Google Sign-In"
      >
        <h2>Google Sign-In</h2>
        <p>Please click the button below to continue with Google sign-in.</p>
        <button onClick={handleModalClose}>Proceed to Google Sign-In</button>
        <button onClick={() => setModalIsOpen(false)}>Cancel</button>
      </Modal>
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
