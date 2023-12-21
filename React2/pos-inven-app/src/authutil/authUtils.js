export const verifyToken = async (token) => {
    try {
      // Make a request to your server to verify the token
      const response = await fetch('/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Token is valid
        return true;
      } else {
        // Token is invalid
        return false;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  };