import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-estacao-espacial-production.up.railway.app', 
});

export default api;
