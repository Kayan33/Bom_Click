import axios from "axios";

const api = axios.create({
  baseURL: "https://kayanpereira.com.br:21025",
});


export default api;