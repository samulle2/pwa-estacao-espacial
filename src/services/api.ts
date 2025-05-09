import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Altere para URL da API em produção depois
});

export default api;
