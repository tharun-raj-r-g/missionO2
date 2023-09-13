import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://api.missiono2.com:8080/api/v1",
});

export default axiosInstance;
