import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        const response = await fetch('https://expressjs-app-sso-kiragu-maina9939-mjoqa3jr.leapcell.dev/google-auth/', {
          method: 'POST',
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
    <div>
      Loading...
      Please wait while we process your login.
    </div>
  );
};

export default Callback;
