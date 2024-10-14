import { useState } from 'react';
import './Login.css'; // External CSS file for custom styles if needed
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Submitted', formData);
        setIsLoading(true);
        try {
            const response = await fetch('https://expressjs-app-sso-kiragu-maina9939-mjoqa3jr.leapcell.dev/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Network response was not ok: ${errorData.message || 'Unknown error'}`);
            }

            const data = await response.json();
            console.log('Response from server:', data);
            // Handle successful login (e.g., save token, redirect user, etc.)
        } catch (error) {
            console.error('Error during login:', error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async (credentialResponse) => {
        setIsLoading(true);
        try {
            const id_token = credentialResponse.credential;
            console.log('ID Token:', id_token);
            const response = await fetch('https://expressjs-app-sso-kiragu-maina9939-mjoqa3jr.leapcell.dev/google-auth/', {
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
            // Handle successful Google login (e.g., save token, redirect user, etc.)
        } catch (error) {
            console.error('Error during Google Sign-In:', error);
            alert(`An error occurred: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

                <div className="mb-4">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
                    Log In
                </button>

                <div className="my-4 text-center text-gray-600">or</div>

                <GoogleLogin
                    onSuccess={handleGoogleSignIn}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                    logo_alignment="left"
                    type="standard"
                />
            </form>

            {isLoading && (
                <div className="loading-spinner">
                    <div className="spinner"></div> {/* CSS spinner, add your spinner styling */}
                </div>
            )}
        </div>
    );
};

export default Login;
