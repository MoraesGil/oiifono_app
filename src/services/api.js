import axios from "axios";

const accessToken = await AsyncStorage.getItem("token");

const api = axios.create({
  baseUrl: "http://10.9.8.16:3000/api",
  timeout: 1000,
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
