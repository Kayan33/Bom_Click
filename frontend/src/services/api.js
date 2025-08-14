import axios from "axios";

const api = axios.create({
  baseURL: "https://bom-click.onrender.com",
});


export default api;