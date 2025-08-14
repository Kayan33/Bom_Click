import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://bom-click.onrender.com",
});

api.interceptors.request.use(
    async (config) => {
        
        const tokenString = await AsyncStorage.getItem('@token');
      
        if (tokenString) {
            const token = JSON.parse(tokenString);
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;