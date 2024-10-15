import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        const response = await fetch('https://expressjs-app-sso-kiragu-maina9939-mjoqa3jr.leapcell.dev/google-auth/', {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }), // Send the authorization code to your backend
        });

        if (response.ok) {
          const data = await response.json();
          // Handle successful response (e.g., store tokens, redirect user)
          console.log('Access Token:', data.accessToken);
          navigate('/'); // Redirect user to a desired route after successful login
        } else {
          console.error('Failed to fetch access token');
        }
      } catch (error) {
        console.error('Error fetching access token:', error);
      }
    };

    // Get the 'code' parameter from the URL
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      fetchAccessToken(code); // Call the function to fetch the access token
    } else {
      console.error('No authorization code found in the URL');
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm   
 p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Processing Login</h1>
        <p className="text-gray-600 mt-2">
          Please wait a moment while we finalize your Google Sign-in.
        </p>
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-10 w-10 bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Callback;
