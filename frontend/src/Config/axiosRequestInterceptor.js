import axios from 'axios';

// Helper function to format dates
const formatDateForJava = (date) => {
    if (!date) return null;
    const [year, month, day] = date.split('-');
    return `${year}-${month}-${day}`;
};

export const api = axios.create({
  baseURL: 'http://localhost:8088/api/v1',
});

// Request interceptor to modify request data
api.interceptors.request.use(
  (config) => {
    if (config.data && config.data.start_date && config.data.end_date) {
      config.data.start_date = formatDateForJava(config.data.start_date);
      config.data.end_date = formatDateForJava(config.data.end_date);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
