import {AsyncStorage} from 'react-native'
import axios from "axios";  
 
const accessToken =  async () => {
  return await AsyncStorage.getItem("@oiiFono:token");
};


const api = axios.create({
  baseURL: "http://10.9.8.16:3000/api",
  headers: {
    ...{
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    ...(accessToken
      ? {
          Authorization: `Bearer ${accessToken}`
        }
      : {})
  }
});

export default api;

