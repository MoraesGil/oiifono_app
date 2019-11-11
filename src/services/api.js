import axios from 'axios';
 
console.log('call')
const api = axios.create({
  baseUrl: "http://10.9.8.16:3000/api",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" }
});

export default api;