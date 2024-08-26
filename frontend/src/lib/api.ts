import axios from "axios";

// Adjust the base URL to use HTTP for local development unless HTTPS is specifically configured
export const api = axios.create({
  baseURL: "http://localhost:4000/api/", // Adjust base URL to match your backend server
});

// Register a new user
export const registerUser = async (userData: any) => {
  try {
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error: unknown) {
    // Handle error type explicitly
    if (axios.isAxiosError(error)) {
      // Axios error with response
      console.error('Registration Error:', error.response?.data || error.message);
    } else {
      // Other errors
      console.error('Registration Error:', error);
    }
    throw new Error('Registration failed');
  }
};

// Log in a user
export const loginUser = async (loginData: any) => {
  try {
    const response = await api.post('/users/login', loginData);
    return response.data;
  } catch (error: unknown) {
    // Handle error type explicitly
    if (axios.isAxiosError(error)) {
      // Axios error with response
      console.error('Login Error:', error.response?.data || error.message);
    } else {
      // Other errors
      console.error('Login Error:', error);
    }
    throw new Error('Login failed');
  }
};
