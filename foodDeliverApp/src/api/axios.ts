import axios from 'axios';

export const BASE_URL = 'http://192.168.33.1:4578/api';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;