import axios from 'axios';

class APIService {
  constructor(baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Initialize with token if available
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      this.setAuthToken(token);
    }
  }

  setAuthToken(token) {
    if (token) {
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.axiosInstance.defaults.headers.common['Authorization'];
    }
  }

  async fetch(url, method = 'GET', data = null) {
    try {
      const response = await this.axiosInstance({
        url,
        method,
        data,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  get(url) {
    return this.fetch(url);
  }

  post(url, data) {
    return this.fetch(url, 'POST', data);
  }

  put(url, data) {
    return this.fetch(url, 'PUT', data);
  }

  delete(url) {
    return this.fetch(url, 'DELETE');
  }
}

// Replace with your actual base URL
const apiService = new APIService('http://localhost:8000/api/v1');

export default apiService;
