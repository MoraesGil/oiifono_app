import axios from "axios";  
 
const api = axios.create({
  baseURL: "http://10.9.8.16:3000/api",
  headers: {
    ...{
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }
}); 

export default api;

