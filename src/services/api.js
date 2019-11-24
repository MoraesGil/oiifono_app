import axios from 'axios';
 
const api = axios.create({
  baseUrl: "http://10.9.8.16:3000/api",
  timeout: 1000,
  headers: {
    Accept: "application/json",
   "Content-Type": "application/json"
  }
});

export default api;