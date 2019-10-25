import axios from 'axios';

const api = axios.create({
baseUrl : 'http://10.9.8.16:3333',
})

export default api;