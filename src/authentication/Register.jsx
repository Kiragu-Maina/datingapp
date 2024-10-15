import { useState } from 'react';
import './Register.css'; // External CSS file for styling
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
        setIsLoading(true); // Start loading
        try {
            const response = await fetch('https://expressjs-app-sso-kiragu-maina9939-mjoqa3jr.leapcell.dev/google-auth/url', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const { url } = await response.json(); 
                setAuthUrl(url);
                setModalIsOpen(true); 
            } else {
                console.error('Failed to retrieve Google authorization URL');
            }
        } catch (error) {
            console.error('Error during Google sign-in:', error);
        } finally {
            setIsLoading(false); // Stop loading
        }
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
        window.location.href = authUrl; 
    };

    return (
        <div className="register-container">
            <div className="flex flex-col items-center">
                {/* Google Sign-In Button */}
                <button 
                    type="button" 
                    onClick={handleGoogleSignIn} 
                    className="flex items-center justify-center w-full p-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
                >
                    {isLoading ? (
                        <svg
                            className="w-5 h-5 mr-2 animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12c0 4.42 3.58 8 8 8s8-3.58 8-8H4z"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="w-5 h-5 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                        >
                            <path fill="currentColor" d="M23.7 20.3v-4.1h-4.1v4.1h-4.1v4.1h4.1v4.1h4.1v-4.1h4.1v-4.1H23.7zM24 0C10.74 0 0 10.74 0 24c0 13.26 10.74 24 24 24 13.26 0 24-10.74 24-24S37.26 0 24 0zm0 44c-11.05 0-20-8.95-20-20S12.95 4 24 4s20 8.95 20 20-8.95 20-20 20z" />
                        </svg>
                    )}
                    Sign in with Google
                </button>

                <form className="register-form w-full max-w-md" onSubmit={handleSubmit}>
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
                </form>
            </div>

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
        </div>
    );
};

export default Register;
