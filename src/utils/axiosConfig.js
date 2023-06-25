import axios from 'axios';
const BASE_URL= process.env.REACT_APP_DEFAULT_API_URL || 'https://myclassr00m.herokuapp.com'
// Create an instance of Axios
const instance = axios.create({
    baseURL: BASE_URL, // Replace with your API's base URL
    headers: { 'content-type': 'application/json' }
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        // Modify the request config if needed (e.g., add headers, authentication tokens)
        console.log('Request Interceptor');
        return config;
    },
    (error) => {
        // Handle request errors
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        // Modify the response data if needed
        console.log('Response Interceptor');
        return response;
    },
    (error) => {
        // Handle response errors
        console.error('Response Error:', error);
        return Promise.reject(error);
    }
);

export default instance;
