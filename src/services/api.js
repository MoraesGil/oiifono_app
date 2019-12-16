// import {AsyncStorage} from 'react-native'
import axios from "axios";  
const token  = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6MzAwMFwvYXBpXC9sb2dpbiIsImlhdCI6MTU3NjQ2MDA1MywiZXhwIjoxNTc2NTgwMDUzLCJuYmYiOjE1NzY0NjAwNTMsImp0aSI6ImtoZEc4OGJQeTdnQXZodVoiLCJzdWIiOjMsInBydiI6ImY5MzA3ZWI1ZjI5YzcyYTkwZGJhYWVmMGUyNmYwMjYyZWRlODZmNTUifQ.Lc01tAiCUj3avz49y42pY8ss548YGf0YRkBC8uhE5o4";
// const accessToken =  async () => {
//   return await AsyncStorage.getItem("@oiiFono:token");
// };


const api = axios.create({
  baseURL: "http://10.9.8.16:3000/api",
  headers: {
    ...{
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }
});
api.defaults.headers.Authorization = `Bearer ${token}`;

export default api;

